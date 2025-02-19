import { useEffect, useState } from "react";

export const useLoadingTimer = (loading: boolean) => {
    const [loadingTime, setLoadingTime] = useState<number>(0)

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (loading) {
            setLoadingTime(0)
            interval = setInterval(() => {
                setLoadingTime(prev => prev + 1)
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [loading])

    return loadingTime
}