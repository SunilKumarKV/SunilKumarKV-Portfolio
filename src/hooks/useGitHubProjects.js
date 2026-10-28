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
  const isMountedRef = useRef(true);
  const timerRef = useRef(null);

  const fetchProjects = useCallback(async (forceRefresh = false) => {
    if (inFlightRequestRef.current) return;
    inFlightRequestRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const result = await syncGitHubPortfolioRepos({ forceRefresh });
      if (!isMountedRef.current) return;

      if (result.projects && result.projects.length > 0) {
        setProjects(result.projects);
        setIsFallback(Boolean(result.isFallback || result.isRateLimited));
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
      if (!isMountedRef.current) return;
      console.warn('[useGitHubProjects] Using fallback mock projects due to fetch error:', err);
      setProjects(FALLBACK_PROJECTS);
      setIsFallback(true);
      setError(err.message || 'Unable to sync with GitHub API.');
    } finally {
      // Gentle delay for smooth skeleton transition
      timerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setIsLoading(false);
          inFlightRequestRef.current = false;
        }
      }, 300);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchProjects(false);
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
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
