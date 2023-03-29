import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { Spinner, Flex, Box } from "@chakra-ui/react";
const API_KEY = import.meta.env.VITE_API_KEY;
const discoverUrl =
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
const trendingUrl =
  `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
  
function App() {
  const [LOADER, SET_LOADER] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      SET_LOADER(!LOADER);
    }, 3000);
  }, []);

  return (
    <Box w={[480, 600, 1400]} maxW="100%" minH={"100vh"} position="relative">
      <NavBar />
      <SearchBar />
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
    </Box>
  );
}

export default App;
