import {
    Heading,
    Button,
    Stack,
    Image,
    Text,
    Flex,
    SimpleGrid,
    AspectRatio,
    GridItem, Box
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

function SimilarMovies({movies, renderMini }) {
    console.log(movies)
    return (
        <Flex justifyContent="center" alignContent={'center'} mt={5}>
            <SimpleGrid
                minChildWidth={'300px'}
                spacing={3}
                alignContent={'center'}
                px={'1'}
                py={'3'}
            >
                <Movies movies={movies} renderMini={renderMini} />
            </SimpleGrid>
        </Flex>
    );
}

const Movies = ({ movies, renderMini }) => {
    return movies.map((movie) => (
        <SimpleGrid
            spacing={2}
            columns={4}
            key={nanoid()}
            py={2}
            px={{ base: 2 }}
            justifyItems={"center"}
            rowGap={2}
            bg="white"
            boxShadow="md"
            borderRadius="md"
            _hover={{
                boxShadow: "lg",
                cursor: "pointer"
            }}
            transition="all 0.3s"
            position="relative"
        >
            <GridItem colSpan={1} alignSelf={"center"}>
                <AspectRatio width={"80px"} ratio={9 / 16} >
                    <Image
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.original_title}
                        borderRadius="md"
                        maxW="100%"
                        height="auto"
                        data-movie-id={movie["id"]}
                        objectFit="cover"
                        onClick={(e) => renderMini(e)}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3} alignSelf={"center"}>
                <Stack >
                    <Heading size={{ base: "xs" }}>{movie.original_title}</Heading>
                    <Text
                        wordBreak={"keep-all"}
                        overflow={"hidden"}
                        fontSize={{ base: "xs" }}
                        // h={{ base: "2.4em", md: "3.2em" }}
                    >
                        {movie.overview.length > 100
                            ? movie.overview.slice(0, 200)
                            : movie.overview}
                    </Text>
                    <Flex alignItems={"center"} justifyContent={"space-between"} px={1}>
                        <Text
                            borderRadius={3}
                            width={"max-content"}
                            backgroundColor={"gray.200"}
                            p={"0.8em"}
                            fontWeight={"bold"}
                            justifySelf={"start"}
                            color="green.600"
                            fontSize={{ base: "xs" }}
                        >
                            Rating: {movie.vote_average.toFixed(1)}
                        </Text>
                        <Button
                            px={{ base: "0.4em" }}
                            fontSize={{ base: "xs" }}
                            alignSelf="end"
                            variant="outline"
                            colorScheme="green"
                        >
                            Add To Collection
                        </Button>
                    </Flex>
                </Stack>
            </GridItem>
        </SimpleGrid>
    ));
};

export default SimilarMovies;
