import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Discover from "./components/Discover";
import { Spinner, Flex, Box } from "@chakra-ui/react";
import SingleMovie from "./components/SingleMovie";
import SearchResults from "./components/SearchResults";
const API_KEY = import.meta.env.VITE_API_KEY;
const discoverUrl =
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
const trendingUrl =
  `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

  
function App() {
  const [LOADER, SET_LOADER] = useState(false);
  const [discoverData, setDiscoverData] = useState([])
  const [searchData, setSearchData] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [showResults, setShowResults] = useState(false)

  const searchUrl =  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`


  const getSearchValue = useCallback((e) => {
    setShowResults(false)
    setSearchValue(e.target.value)
  },[setSearchValue])

  const handleSearch = useCallback(() => {
    setShowResults(false)
    if(searchData.length > 0){
      setShowResults(prev => true)
    }
    console.clear()
  },[searchData])
  console.log(searchData);


  // useEffect(() => {
  //   setTimeout(() => {
  //     SET_LOADER(!LOADER);
  //   }, 3000);
  // }, []);

  useEffect(() => {
   
    axios.get(discoverUrl)
      .then(res => {
        setDiscoverData(res.data.results)
      })
  },[LOADER])

  useEffect(() => {
    if(searchValue.length > 1 && !showResults){
      axios.get(searchUrl)
        .then(res => {
          setSearchData(res.data.results)
        })
    }
  }, [searchValue.length, searchUrl])
  // console.log(searchData)

  return (
    <Box w={[480, 600, 1400]} maxW="100%" minH={"100vh"} position="relative">
      <NavBar />
      <SearchBar getSearchValue={getSearchValue} handleSearch={handleSearch} />
      {LOADER && (
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
      {showResults && <SearchResults searchData ={searchData}/>}
     {!showResults && <Discover discover={discoverData} />}
      <SingleMovie />
    </Box>
  );
}

export default App;
