/**
 * GitHub Repository Auto-Sync Service
 * Fetches public repositories from GitHub API for user "SunilKumarKV",
 * caches them in localStorage for 1 hour, filters for topic "portfolio",
 * and maps them to clean project objects.
 * Includes curated fallback mock projects if the API rate limit is reached.
 */

import { FALLBACK_PROJECTS } from './githubFallbackData.js';

export { FALLBACK_PROJECTS };

const GITHUB_USERNAME = 'SunilKumarKV';
const CACHE_KEY = 'sunilcraft_github_portfolio_cache';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Format repo name into clean human-readable title
 * e.g., "devwithsunil" -> "DevWithSunil", "owlreadme" -> "OwlReadme"
 */
function formatProjectTitle(name) {
  if (!name) return 'Untitled Project';
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Clean and format tech stack from GitHub topics
 */
function formatTechStack(topics = [], language = null) {
  const filtered = topics
    .filter(t => t.toLowerCase() !== 'portfolio')
    .map(t => {
      const map = {
        nodejs: 'Node.js',
        nextjs: 'Next.js',
        react: 'React',
        tailwindcss: 'Tailwind CSS',
        tailwind: 'Tailwind CSS',
        typescript: 'TypeScript',
        javascript: 'JavaScript',
        vite: 'Vite',
        fullstack: 'Full Stack',
        ai: 'AI / ML',
        'open-source': 'Open Source',
        'developer-tools': 'DevTools',
      };
      return map[t.toLowerCase()] || t.charAt(0).toUpperCase() + t.slice(1);
    });

  if (language && !filtered.some(t => t.toLowerCase() === language.toLowerCase())) {
    filtered.unshift(language);
  }

  return filtered.length > 0 ? filtered : ['Full Stack', 'React', 'JavaScript'];
}

/**
 * Maps raw GitHub repo item to clean portfolio project schema
 */
export function mapGitHubRepoToProject(repo) {
  const topics = repo.topics || [];
  const techStack = formatTechStack(topics, repo.language);
  const thumbnail = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;

  return {
    id: repo.id || repo.name,
    name: repo.name,
    title: formatProjectTitle(repo.name),
    description: repo.description || 'Modern full-stack web application with high performance architecture and clean UI.',
    techStack,
    liveDemo: repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage : null,
    github: repo.html_url,
    thumbnail,
    updated: repo.updated_at 
      ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : 'Recent',
    updatedDateRaw: repo.updated_at,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    isArchived: repo.archived || false,
  };
}

/**
 * Fetch and sync GitHub repositories with 1-hour localStorage caching
 */
export async function syncGitHubPortfolioRepos(options = {}) {
  const { forceRefresh = false } = options;

  // 1. Check localStorage Cache
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cachedRaw = localStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        const age = Date.now() - (cached.timestamp || 0);
        if (age < CACHE_TTL_MS && Array.isArray(cached.data) && cached.data.length > 0) {
          return { projects: cached.data, fromCache: true, isRateLimited: false };
        }
      }
    } catch (cacheErr) {
      console.warn('[GitHubSync] Failed to read from localStorage cache:', cacheErr);
    }
  }

  // 2. Fetch from GitHub API
  const endpoint = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (response.status === 403 || response.status === 429) {
      return {
        projects: FALLBACK_PROJECTS,
        fromCache: false,
        isRateLimited: true,
        error: 'GitHub API rate limit exceeded. Displaying curated fallback projects.',
      };
    }

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
    }

    const repos = await response.json();
    if (!Array.isArray(repos)) throw new Error('Invalid GitHub API response payload');

    // 3. Filter for repos containing the topic "portfolio" (case-insensitive)
    const filteredRepos = repos.filter(repo => {
      if (!repo.topics || !Array.isArray(repo.topics)) return false;
      return repo.topics.some(t => t.toLowerCase() === 'portfolio');
    });

    const cleanProjects = filteredRepos.map(mapGitHubRepoToProject);
    const finalProjects = cleanProjects.length > 0 ? cleanProjects : FALLBACK_PROJECTS;

    // 4. Store in localStorage cache
    if (typeof window !== 'undefined' && finalProjects.length > 0) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: finalProjects,
        }));
      } catch (saveErr) {
        console.warn('[GitHubSync] Failed to write to localStorage:', saveErr);
      }
    }

    return { projects: finalProjects, fromCache: false, isRateLimited: false };
  } catch (error) {
    console.error('[GitHubSync] Sync failed, checking stale cache or fallback:', error);
    
    if (typeof window !== 'undefined') {
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (Array.isArray(cached.data) && cached.data.length > 0) {
            return { projects: cached.data, fromCache: true, isRateLimited: false, error: error.message };
          }
        }
      } catch (e) {
        // ignore
      }
    }

    return {
      projects: FALLBACK_PROJECTS,
      fromCache: false,
      isRateLimited: false,
      error: error.message || 'Unable to sync with GitHub API. Displaying fallback projects.',
    };
  }
}
