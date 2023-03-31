import {
  Heading,
  Button,
  Stack,
  Image,
  Text,
  Box,
  Flex,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
function Discover({ discover }) {
  return (
    <Flex justifyContent='center'>
    <SimpleGrid minChildWidth='150px' spacing='1em'  px='1em' py='1.5em'>
      <DiscoverMovies discover={discover} />
    </SimpleGrid>
    </Flex>
  );
}

const DiscoverMovies = ({ discover }) => {
  console.log(discover);

  return discover.map((movie) => (
    <Grid key={nanoid()} justifyContent='space-between'>
      <Box>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          maxW='100%'
          height='auto'
        />
      </Box>
      <Stack>
          <Heading size='sm'>{movie.original_title}</Heading>
          <Text fontSize={"small"} p='0.4em'>{movie.overview}</Text>
          <Text color="blue.600" fontSize="1rem">
            {movie.vote_average}
          </Text>
        </Stack>
      {/* <Divider /> */}
      <Box>
          <Button alignSelf='end' variant="solid" colorScheme="green">
            Add To Collection
          </Button>
      </Box>
    </Grid>
  ));
};

export default Discover;
