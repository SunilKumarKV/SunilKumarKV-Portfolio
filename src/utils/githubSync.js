/**
 * GitHub Repository Auto-Sync Service
 * Fetches public repositories from GitHub API for user "SunilKumarKV",
 * caches them in localStorage for 1 hour, filters for topic "portfolio",
 * and maps them to clean project objects.
 * Includes curated fallback mock projects if the API rate limit is reached.
 */

const GITHUB_USERNAME = 'SunilKumarKV';
const CACHE_KEY = 'sunilcraft_github_portfolio_cache';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Curated Fallback Projects for Sunil Kumar K V
 * Returned when GitHub API rate limit is reached or when network is unavailable.
 */
export const FALLBACK_PROJECTS = [
  {
    id: 'owlreadme',
    name: 'owlreadme',
    title: 'OwlReadme',
    description: 'Build beautiful GitHub profile READMEs with an intuitive visual editor, live preview, customizable sections, and seamless Markdown export.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI / ML', 'Open Source'],
    liveDemo: 'https://owlreadme.vercel.app',
    github: 'https://github.com/SunilKumarKV/owlreadme',
    thumbnail: 'https://opengraph.githubassets.com/1/SunilKumarKV/owlreadme',
    updated: 'Aug 2026',
    stars: 12,
    forks: 3,
    featured: true,
  },
  {
    id: 'devwithsunil',
    name: 'devwithsunil',
    title: 'DevWithSunil',
    description: 'Developer content platform featuring high-impact technical articles, tutorials, newsletter automation, and bespoke admin analytics.',
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Content Platform'],
    liveDemo: 'https://devwithsunil.vercel.app',
    github: 'https://github.com/SunilKumarKV/devwithsunil',
    thumbnail: 'https://opengraph.githubassets.com/1/SunilKumarKV/devwithsunil',
    updated: 'May 2026',
    stars: 8,
    forks: 1,
    featured: false,
  },
  {
    id: 'sunilcraft',
    name: 'sunilcraft',
    title: 'SunilCraft Portfolio',
    description: 'Production developer portfolio built with React, Vite, Tier 1 frosted glassmorphism, dynamic specular borders, and real-time GitHub sync.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Glassmorphism', 'Design System'],
    liveDemo: 'https://sunilcraft.vercel.app',
    github: 'https://github.com/SunilKumarKV/SunilKumarKV-Portfolio',
    thumbnail: 'https://opengraph.githubassets.com/1/SunilKumarKV/SunilKumarKV-Portfolio',
    updated: 'Oct 2026',
    stars: 5,
    forks: 0,
    featured: false,
  },
  {
    id: 'chessplay',
    name: 'chessPlay',
    title: 'ChessPlay Arena',
    description: 'Real-time multiplayer chess platform featuring Stockfish engine integration, WebSocket matchmaking, move validation, and mobile support.',
    techStack: ['React', 'WebSockets', 'Node.js', 'Expo', 'Game Engine'],
    liveDemo: null,
    github: 'https://github.com/SunilKumarKV/chessPlay',
    thumbnail: 'https://opengraph.githubassets.com/1/SunilKumarKV/chessPlay',
    updated: 'Jul 2026',
    stars: 6,
    forks: 2,
    featured: false,
  },
  {
    id: 'attendance-tracker',
    name: 'AttendanceTracker',
    title: 'AttendanceTracker Enterprise',
    description: 'Enterprise workforce tracking platform with automated shift scheduling, leave approval pipelines, and reporting analytics.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Enterprise', 'Tailwind CSS'],
    liveDemo: null,
    github: 'https://github.com/SunilKumarKV/AttendanceTracker',
    thumbnail: 'https://opengraph.githubassets.com/1/SunilKumarKV/AttendanceTracker',
    updated: 'Jun 2026',
    stars: 4,
    forks: 1,
    featured: false,
  },
];

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
        'nodejs': 'Node.js',
        'nextjs': 'Next.js',
        'react': 'React',
        'tailwindcss': 'Tailwind CSS',
        'tailwind': 'Tailwind CSS',
        'typescript': 'TypeScript',
        'javascript': 'JavaScript',
        'vite': 'Vite',
        'fullstack': 'Full Stack',
        'ai': 'AI / ML',
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
 * Returns fallback mock projects if the API rate limit is reached.
 * @param {Object} options
 * @param {boolean} [options.forceRefresh=false]
 * @returns {Promise<{ projects: Array, fromCache: boolean, isRateLimited: boolean, error?: string }>}
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
          return {
            projects: cached.data,
            fromCache: true,
            isRateLimited: false,
          };
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
      headers: {
        'Accept': 'application/vnd.github+json',
      },
    });

    // Check for API Rate Limiting (403 with x-ratelimit-remaining: 0)
    if (response.status === 403 || response.status === 429) {
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const isRateLimited = rateLimitRemaining === '0' || response.status === 403;
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

    if (!Array.isArray(repos)) {
      throw new Error('Invalid GitHub API response payload');
    }

    // 3. Filter for repos containing the topic "portfolio" (case-insensitive)
    const filteredRepos = repos.filter(repo => {
      if (!repo.topics || !Array.isArray(repo.topics)) return false;
      return repo.topics.some(t => t.toLowerCase() === 'portfolio');
    });

    // 4. Map to clean project objects
    const cleanProjects = filteredRepos.map(mapGitHubRepoToProject);

    // If no repos found with topic "portfolio", use curated fallback projects
    const finalProjects = cleanProjects.length > 0 ? cleanProjects : FALLBACK_PROJECTS;

    // 5. Store in localStorage cache
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

    return {
      projects: finalProjects,
      fromCache: false,
      isRateLimited: false,
    };
  } catch (error) {
    console.error('[GitHubSync] Sync failed, checking stale cache or fallback:', error);
    
    // Check if we have stale cache to salvage
    if (typeof window !== 'undefined') {
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (Array.isArray(cached.data) && cached.data.length > 0) {
            return {
              projects: cached.data,
              fromCache: true,
              isRateLimited: false,
              error: error.message,
            };
          }
        }
      } catch (e) {
        // ignore
      }
    }

    // Return fallback mock projects on network failure
    return {
      projects: FALLBACK_PROJECTS,
      fromCache: false,
      isRateLimited: false,
      error: error.message || 'Unable to sync with GitHub API. Displaying fallback projects.',
    };
  }
}
