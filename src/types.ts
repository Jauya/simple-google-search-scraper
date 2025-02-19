// searchStore
export type Search = {
    keywords: string
    suggestions: string[]
    date: number
}

// apifyAction types
export interface ItemsData {
    "#error": boolean
    searchQuery: SearchQuery
    url: string
    resultsTotal: number
    relatedQueries: RelatedQuery[]
    organicResults: OrganicResult[]
    htmlSnapshotUrl: string
}

export interface SearchQuery {
    term: string
    url: string
    device: string
    page: number
    type: string
    domain: string
    countryCode: string
    languageCode: string
    locationUule: string
    resultsPerPage: string
}

export interface RelatedQuery {
    title: string
    url: string
}

export interface OrganicResult {
    title: string
    url: string
    displayedUrl: string
    description: string
    date: string
    emphasizedKeywords: string[]
    type: string
    position: number
}

// apifyInput
export interface ApifyInput {
    countryCode: string
    forceExactMatch: boolean
    includeIcons: boolean
    includeUnfilteredResults: boolean
    languageCode: string
    locationUule: string
    maxPagesPerQuery: number
    mobileResults: boolean
    queries: string
    resultsPerPage: number
    saveHtml: boolean
    saveHtmlToKeyValueStore: boolean
}