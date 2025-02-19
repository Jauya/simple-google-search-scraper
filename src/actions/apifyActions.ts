"use server"

import { executeApifyActor, getApifyClient, getApifyInput, getDatasetItems, mapToItemsData } from "@/lib/apifyClient"

export async function getSuggestions(keywords: string, apikey: string) {
    try {
        const client = getApifyClient(apikey)
        const input = getApifyInput(keywords)

        const run = await executeApifyActor(client, input)
        const rawItems = await getDatasetItems(client, run.defaultDatasetId)
        const items = mapToItemsData(rawItems)

        return items
    } catch (error) {
        // Return error message for API key issues or query limits
        if (error) {
            return {
                error: "La clave API no es válida o se ha excedido el límite de consultas"
            }
        }
        return {
            error: "Ha ocurrido un error inesperado"
        }
    }
}