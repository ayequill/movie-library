import { useState } from "react";
import {
  Box,
  Text,
  Button,
  chakra,
  useColorMode,
  useColorModeValue, Flex, Switch,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function NavBar() {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  return (
      <>
        <chakra.header w="100%">
          <chakra.nav
              p={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg={bgColor}
          >
            <Box>
              <Text fontWeight="bold">Find your film</Text>
            </Box>
            <Box display={{ base: "block", md: "none" }}>
              <Button backgroundColor="transparent" color={textColor} onClick={handleToggle} fontSize="xl">
                ☰
              </Button>
            </Box>
          </chakra.nav>
        </chakra.header>
        <chakra.aside
            pos="fixed"
            top="0"
            right={isOpen ? "0" : "-300px"}
            h="100%"
            w="300px"
            bg={bgColor}
            color={textColor}
            transition="0.5s ease-in-out"
            zIndex="overlay"
            boxShadow={isOpen ? "md" : "none"}
        >
          <Box p="4">
            <Flex justifyContent='space-between' alignItems='center' mb={5}>
            <Button
                backgroundColor="transparent"
                color={textColor}
                onClick={handleToggle}
                size="lg"
                fontSize="xl"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
            >
              X
            </Button>
              <Switch
                  isChecked={useColorModeValue('light', 'dark') === 'dark'}
                  onChange={toggleColorMode}
                  size="lg"
                  colorScheme="gray"
              />
            </Flex>
            <Button
               colorScheme='gray' backgroundColor="green.400" color="white" w={'full'} rightIcon={<StarIcon />}
            >
              To Watch
            </Button>


          </Box>
        </chakra.aside>
      </>
  );
}



