import { useState, useEffect, useCallback, useRef } from 'react';
import { syncGitHubPortfolioRepos, FALLBACK_PROJECTS } from '../utils/githubSync';

/**
 * Custom React Hook: useGitHubProjects
 * Consumes the sync utility and handles loading states, cache indicators,
 * and rate-limit fallbacks.
 */
export function useGitHubProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState(null);
  const inFlightRequestRef = useRef(false);

  const fetchProjects = useCallback(async (forceRefresh = false) => {
    if (inFlightRequestRef.current) return;
    inFlightRequestRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const result = await syncGitHubPortfolioRepos({ forceRefresh });

      if (result.projects && result.projects.length > 0) {
        setProjects(result.projects);
        setIsFallback(result.isRateLimited || false);
        setFromCache(result.fromCache || false);
        if (result.error) {
          setError(result.error);
        }
      } else {
        setProjects(FALLBACK_PROJECTS);
        setIsFallback(true);
        setFromCache(false);
        if (result.error) {
          setError(result.error);
        }
      }
    } catch (err) {
      console.warn('[useGitHubProjects] Using fallback mock projects due to fetch error:', err);
      setProjects(FALLBACK_PROJECTS);
      setIsFallback(true);
      setError(err.message || 'Unable to sync with GitHub API.');
    } finally {
      // Gentle delay for smooth skeleton transition
      setTimeout(() => {
        setIsLoading(false);
        inFlightRequestRef.current = false;
      }, 300);
    }
  }, []);

  useEffect(() => {
    fetchProjects(false);
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    isFallback,
    fromCache,
    error,
    refetch: () => fetchProjects(true),
  };
}

export default useGitHubProjects;
