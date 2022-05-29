import React, {useEffect, useState} from 'react';
import axios from "axios";

const UseAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                })
                if (isMounted) {
                    setData(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        fetchData(dataUrl)
        return () => {
            // it will cancel the Axios request if a component is unloaded during a request.
            console.log('clean up function');
            isMounted = false;
            source.cancel();
        };
    }, [dataUrl])
    return {data, fetchError, isLoading}
};

export default UseAxiosFetch;