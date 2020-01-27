import { useState, useCallback } from "react";
import { stringify } from "querystring";

export const useHttpp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url: string, method: string = "GET", body: any = null, headers: any = {}) => {
        setLoading(true)
        try {
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])

    const clearError = () => setError(null)

    return { loading, request, error, clearError }
}