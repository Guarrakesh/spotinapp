import React from 'react';

/**
 * Hook to fetch from remote url
 * Usage:
 *  const { loading, error, data } = useFetch('http://myapi.it/v1/articles', {});
 *  if (loading) return <Loading/>
 *  if (error) return <Error/>
 *
 *  return (
 *      // Show data
 *  )
 * @param url string
 * @param options object
 * @returns {{response: object, error: Error, loading: boolean}}
 */
const useFetch = (url, options) => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useEffect(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setData(json);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false, loading);
            }
        };
        fetchData();
    }, []);

    return { loading, data, error };
};

export default useFetch;

