import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        try {
            const storedFavs = localStorage.getItem("favorites")
            if (storedFavs) {
                const parsedFavs = JSON.parse(storedFavs)
                if (Array.isArray(parsedFavs) && parsedFavs.length > 0) {
                    setFavorites(parsedFavs)
                }
            }
        } catch (error) {
            console.error("Error loading favorites:", error)
            localStorage.removeItem("favorites") 
        }
    }, [])
    
    useEffect(() => {
        try {
            if (favorites.length > 0) {
                localStorage.setItem('favorites', JSON.stringify(favorites))
            }
        } catch (error) {
            console.error("Error saving favorites:", error)
        }
    }, [favorites])
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}