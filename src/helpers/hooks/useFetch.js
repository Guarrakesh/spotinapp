import React from 'react';

const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useEffect(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false, loading);
            }
        };
        fetchData();
    }, []);

    return { response, error }
}