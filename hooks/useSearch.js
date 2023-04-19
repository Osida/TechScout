import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../constants/variables";
import {RAPID_API_KEY} from "@env"

/**
 * Custom hook for performing a search using an API endpoint
 * @param {string} endpoint - the API endpoint to search
 * @param {Object} queryParams - the query parameters to include in the search
 * @returns {Object} - an object containing the search result, a loading flag, an error, and a function for performing the search
 */

const useSearch = (endpoint, queryParams) => {
    const [searchResult, setSearchResult] = useState(null)
    const [searchLoader, setSearchLoader] = useState(false)
    const [searchError, setSearchError] = useState(null)

    // Function for performing a search using the specified endpoint and query parameters
    const handleSearch = useCallback(async () => {
        setSearchLoader(true)
        setSearchResult(null)

        try {
            const {data: responseData} = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'X-RapidAPI-Key': RAPID_API_KEY,
                    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
                },
                params: {...queryParams},
            })
            setSearchResult(responseData?.data)
        } catch (error) {
            setSearchError(error)
        } finally {
            setSearchLoader(false)
        }
    }, [endpoint, queryParams])

    useEffect(() => {
        handleSearch()
    }, [handleSearch, queryParams])

    return {searchResult, searchLoader, searchError, handleSearch}
}

export default useSearch