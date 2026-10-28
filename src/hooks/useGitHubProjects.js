import { useState, useEffect, useCallback, useRef } from 'react';
import { syncGitHubPortfolioRepos, FALLBACK_PROJECTS } from '../utils/githubSync';

/**
 * Custom React Hook: useGitHubProjects
 * Consumes the sync utility and handles loading states, cache indicators,
 * error state, and rate-limit fallbacks.
 */
export function useGitHubProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState(null);
  const isFetchingRef = useRef(false);
  const isMountedRef = useRef(true);

  const fetchProjects = useCallback(async (forceRefresh = false) => {
    // Prevent overlapping concurrent requests
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (isMountedRef.current) {
      setIsLoading(true);
      setError(null);
    }

    try {
      const result = await syncGitHubPortfolioRepos({ forceRefresh });

      if (!isMountedRef.current) return;

      if (result.projects && result.projects.length > 0) {
        setProjects(result.projects);
        setIsFallback(Boolean(result.isRateLimited || result.isFallback));
        setFromCache(Boolean(result.fromCache));
        setError(result.error || null);
      } else {
        // If empty response, retain existing projects if present, otherwise fallback
        setProjects((prev) => (prev && prev.length > 0 ? prev : FALLBACK_PROJECTS));
        setIsFallback(true);
        setFromCache(false);
        setError(result.error || 'No portfolio repositories found.');
      }
    } catch (err) {
      console.warn('[useGitHubProjects] Fetch error, preserving existing or fallback projects:', err);
      if (!isMountedRef.current) return;
      setProjects((prev) => (prev && prev.length > 0 ? prev : FALLBACK_PROJECTS));
      setIsFallback(true);
      setError(err?.message || 'Unable to sync with GitHub API.');
    } finally {
      setTimeout(() => {
        isFetchingRef.current = false;
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }, 300);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchProjects(true);
  }, [fetchProjects]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchProjects(false);

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    isFallback,
    fromCache,
    error,
    refetch,
    // Aliases for safety / backward compatibility
    loading: isLoading,
    refreshProjects: refetch,
  };
}

export default useGitHubProjects;
