const CACHE_KEY = "talentops_analysis_cache";


// =========================================================
// Get all cached analyses
// =========================================================

function getCache() {

  try {

    const stored =
      localStorage.getItem(CACHE_KEY);

    if (!stored) {
      return {};
    }

    return JSON.parse(stored);

  } catch (error) {

    console.error(
      "Failed to read analysis cache:",
      error
    );

    return {};
  }
}


// =========================================================
// Find cached analysis
// =========================================================

export function findAnalysisByKey(
  analysisKey
) {

  const cache = getCache();

  return cache[analysisKey] || null;
}


// =========================================================
// Save analysis to cache
// =========================================================

export function saveAnalysisToCache(
  analysisKey,
  analysis
) {

  try {

    const cache = getCache();


    cache[analysisKey] = {
      ...analysis,
      analysisKey,
    };


    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify(cache)
    );


    console.log(
      "Analysis saved to cache."
    );

  } catch (error) {

    console.error(
      "Failed to save analysis cache:",
      error
    );
  }
}


// =========================================================
// Clear cache
// =========================================================

export function clearAnalysisCache() {

  localStorage.removeItem(
    CACHE_KEY
  );
}