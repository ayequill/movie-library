import { Box, Text, Button, chakra } from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons'

export default function NavBar() {
  return (
    <>
    <chakra.header w='100%'>
      <chakra.nav p={4} display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
          <Text fontWeight='bold'>
            Find your film
          </Text>
        </Box>
        <Box>
         <Button backgroundColor='green.400' color='white' rightIcon={<StarIcon />} > Collection </Button>
        </Box>
      </chakra.nav>
    </chakra.header>
    </>
  );
}