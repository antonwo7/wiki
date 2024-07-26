export default {
    wikiApi: `https://en.wikipedia.org/w/api.php`,
    getViews: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/all-agents/{slug}/daily/{from}/{to}',
    getRevisions: 'https://api.wikimedia.org/core/v1/wikipedia/en/page/{slug}/history',
    getRevision: 'http://localhost:9000/parse/wiki/{id}',
    checkRedirect: 'https://en.wikipedia.org/w/api.php?action=query&redirects&format=json&titles={title}'
}

