import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from "../constants/variables";
import {RAPID_API_KEY} from "@env"

/**
 * A custom hook for managing API data, errors, and loading with useState.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Object} queryParams - The query parameters for the API request.
 * @returns {Object} - An object containing the data, error, loading status, and fetchData function.
 */

const useFetch = (endpoint, queryParams) => {
    // Set initial state for data, error, and loading status.
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Memoize fetchData using useCallback to avoid re-renders.
    const fetchData = useCallback(async () => {
        setIsLoading(true)

        try {
            // Make API request and set data.
            const {data: responseData} = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'X-RapidAPI-Key': RAPID_API_KEY,
                    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
                },
                params: {...queryParams},
            })
            setData(responseData?.data)
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false)
        }
    }, [endpoint, queryParams])

    // Call fetchData on mount and when dependencies change.
    useEffect(() => {
        fetchData()
    }, [fetchData, queryParams])

    return {data, error, isLoading, fetchData}
};

export default useFetch;
