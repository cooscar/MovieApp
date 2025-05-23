import MovieCard from "../components/moviecard"
import {useEffect, useState} from 'react'
import '../css/Home.css'
import { searchMovies, getPopularMovies } from "../services/api";


function Home() {
    
    
    
    

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        const loadPopularMovies = async () => { 
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                setError('Failed to get movies...')
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        } 
        loadPopularMovies()
    }, [])



    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) {
            setMovies(popularMovies)
            return
        } 
      

        setLoading(true)

        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            setError('Failed to load movies')
            console.log(err)
        } finally {
            setLoading(false)
        }
        
    }

    return (
    <div className="Home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="Search for movies..." 
                className="search-input" 
                value={searchQuery}
                onChange={((e) => setSearchQuery(e.target.value))}
                />
                    
            <button type="sumbit" className="search-button">Search</button>
        </form>    
        {loading ? <div className="loading">Loading... </div> : <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>}
    </div>
    );      
}


export default Home 