import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Discover from "./components/Discover";
import {Spinner, Flex, Box} from "@chakra-ui/react";
import SingleMovie from "./components/SingleMovie";
import SearchResults from "./components/SearchResults";
import SimilarMovies from "./components/SimilarMovies.jsx";

const API_KEY = import.meta.env.VITE_API_KEY;
const discoverUrl =
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
const trendingUrl =
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;


function App() {
    const [discoverData, setDiscoverData] = useState([])
    const [showDiscover, setShowDiscover] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [movieId, setMovieId] = useState(null)
    const [singleMovie, setSingleMovie] = useState(null)
    const [similarMovie, setSimilarMovie] = useState(null)
    const [showMini, setShowMini] = useState(false)

    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
    const singleMovieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    const similarMoviesURL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    //effects and api calls

    useEffect(() => {
        if (searchValue !== '') {
            getSearch();
        }
    }, [searchValue, searchUrl])

    useEffect(() => {
        if(movieId !== null)
            getSingle()
    }, [movieId])



    // useEffect(() => {
    //   setTimeout(() => {
    //     SET_LOADER(!LOADER);
    //   }, 3000);
    // }, []);
    //API Calls
    const fetchTrending = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios(trendingUrl);
            setDiscoverData(res.data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
            setIsLoading(false);
            setShowDiscover(true)
                  }, 1800);
        }
    }, []);

    useEffect(() => {
        fetchTrending()
    }, [fetchTrending])

    const getSearch = useCallback(async () => {
        setIsLoading(true);
        try {
            if (searchValue.length > 1 && !showResults) {
                const res = await axios(searchUrl);
                console.log('req')
                setSearchData(res.data.results);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [searchUrl, searchValue, showResults]);

    async function getSingle() {
        setIsLoading(true);
        try {
            if (movieId) {
                const res = await axios(singleMovieURL);
                const similar = await  axios(similarMoviesURL)
                console.log('req')
                setSingleMovie(res.data);
                setSimilarMovie(similar.data.results)
                setShowMini(true); // move setShowMini here
                setShowResults(false);
                setShowDiscover(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Event Handlers
    const getSearchValue = useCallback((e) => {
        setShowResults(false)
        setSearchValue(e.target.value)
    }, [])

    const handleSearch = useCallback(() => {
        setIsLoading(true);
        if (searchData?.length > 0) {
            setTimeout(() => {
            setShowResults(true);
            setShowDiscover(false);
            setShowMini(false)
                setIsLoading(false);
            }, 1800);
        }
    }, [searchData]);

    const renderMini = useCallback( (e) => {
        try {
            const TARGET = e.target.dataset.movieId;
            if (TARGET) {
                setMovieId(TARGET);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    // console.log(showMini)
    // console.log(singleMovie)
// console.log(movieId)
//     console.log(singleMovie)
    return (
        <Box w="100%" minH="100vh" position="relative">
            <Flex
                direction="column"
                maxW={{ base: "480px", sm: "768px", lg: "1400px" }}
                mx="auto"
                px="4"
                justify="center"
                alignItems="center"
                height="100%"
            >
                <NavBar />
                <SearchBar getSearchValue={getSearchValue} handleSearch={handleSearch} />
                {isLoading && (
                    <Flex
                        justifyContent="center"
                        width="100%"
                        position="absolute"
                        transform="translate(-50%, -50%)"
                        left="50%"
                        top="50%"
                    >
                        <Spinner size="xl" />
                    </Flex>
                )}
                {showResults && <SearchResults renderMini={renderMini} searchData={searchData} />}
                {showDiscover && <Discover renderMini={renderMini} discover={discoverData} />}
                {showMini && <SingleMovie movieId={movieId} movie={singleMovie} />}
                {showMini && <SimilarMovies movies={similarMovie} renderMini={renderMini} />}
            </Flex>
        </Box>

    );
}

export default App;
