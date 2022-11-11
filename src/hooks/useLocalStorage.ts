import { useEffect, useState } from "react"
import { json } from "react-router-dom"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const localValue = localStorage.getItem(key)
        if (localValue) return JSON.parse(localValue)

        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        } else {
            return initialValue
        } 
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])  
    
    return [value, setValue] as [typeof value, typeof setValue]
}

