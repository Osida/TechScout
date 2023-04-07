import {useState, useEffect} from 'react';
import axios from 'axios';
import {RAPID_API_KEY} from '@l';

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {query: 'Python developer in Texas, USA', page: '1', num_pages: '1'},
    };

    return {data, error, loading};
}