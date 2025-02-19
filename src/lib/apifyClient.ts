import { ApifyClient, } from 'apify-client';
import { ApifyInput, ItemsData, OrganicResult, RelatedQuery, SearchQuery } from "@/types"
type ApifyClientInstance = InstanceType<typeof ApifyClient>;

export function getApifyClient(apiKey: string) {
    return new ApifyClient({
        token: apiKey,
    });
}
export function getApifyInput(keywords: string) {
    return {
        "countryCode": "pe",
        "forceExactMatch": false,
        "includeIcons": false,
        "includeUnfilteredResults": false,
        "languageCode": "es",
        "locationUule": "0002020",
        "maxPagesPerQuery": 1,
        "mobileResults": false,
        "queries": keywords,
        "resultsPerPage": 1,
        "saveHtml": false,
        "saveHtmlToKeyValueStore": true
    }
}

export async function executeApifyActor(client: ApifyClientInstance, input: ApifyInput) {
    return await client.actor("nFJndFXA5zjCTuudP").call(input)
}
export async function getDatasetItems(client: ApifyClientInstance, datasetId: string) {
    const { items } = await client.dataset(datasetId).listItems()
    return items
}
export function mapToItemsData(rawItems: Record<string | number, unknown>[]): ItemsData[] {
    return rawItems.map((item) => ({
        searchQuery: item["searchQuery"] as SearchQuery,
        htmlSnapshotUrl: item["htmlSnapshotUrl"] as string,
        organicResults: item["organicResults"] as OrganicResult[],
        relatedQueries: item["relatedQueries"] as RelatedQuery[],
        resultsTotal: item["resultsTotal"] as number,
        url: item["url"] as string,
        "#error": item["#error"] as boolean,
    }))
}