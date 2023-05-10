import PropTypes from 'prop-types';
import {
  SimpleGrid,
  GridItem,
  Box,
  Image,
  Text,
  AspectRatio,
} from '@chakra-ui/react';

const SingleMovie = ({ movie, movieId }) => {
  const {
    backdrop_path,
    poster_path,
    original_title,
    overview,
    release_date,
    vote_average,
  } = movie;

  return (
    <SimpleGrid
      columns={[1, null, null, 2]}
      borderRadius="lg"
      overflow="hidden"
      alignContent="center"
      mt={5}
    >
      <GridItem position="relative" height={0} paddingBottom="56.25%">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={original_title}
            objectFit="cover"
            maxW="100%"
            display="none"
          />
        </AspectRatio>
        <AspectRatio
          p="6"
          position="absolute"
          bottom={5}
          // left={0}
          right={5}
          ratio={9 / 16}
          width={['80px', null, null, '120px']}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={original_title}
            objectFit="cover"
            mb={2}
            borderRadius="lg"
          />
        </AspectRatio>
      </GridItem>

      <GridItem
        p={4}
        bgGradient="linear(to-t, blackAlpha.900, transparent)"
        borderRadius="md"
      >
        <Text color="blackAlpha.700" fontWeight="bold" fontSize="xl" mb={2} textShadow="0px 3px 3px rgba(255,255,255,0.5), 1px 1px 3px rgba(66,59,60,0.24)">
          {original_title}
        </Text>
        <Box bg="whiteAlpha.800" px={2} py={1} borderRadius="md" mb={2}>
          <Text color="gray.800" fontSize="sm">
            {overview}
          </Text>
        </Box>
        <Text color="white" fontSize="sm" fontWeight="semibold">
          Release Date:
          {' '}
          <Box as="span" color="gray.300">
            {release_date}
          </Box>
        </Text>
        <Text color="white" fontSize="sm" fontWeight="semibold">
          Rating:
          {' '}
          <Box as="span" color="gray.300">
            {vote_average.toFixed(2)}
          </Box>
        </Text>
      </GridItem>
    </SimpleGrid>
  );
};

SingleMovie.propTypes = {
  movie: PropTypes.shape({
    backdrop_path: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
};

export default SingleMovie;
