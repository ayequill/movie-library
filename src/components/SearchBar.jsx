import { Box, Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import { useCallback } from "react";
import { Search2Icon } from "@chakra-ui/icons";

export default function SearchBar() {
    
  const handleSearch = useCallback((e) => {
    console.log(e);
  });

  return (
    <Box>
      <InputGroup px={3}>
        <InputRightElement
          color="green.400"
          marginRight={3}
          children={<Search2Icon />}
          pointerEvents="true"
          onClick={(e) => handleSearch (e)}
        />
        <Input focusBorderColor='green.400' borderColor='green.400' placeholder="Search" />
      </InputGroup>
    </Box>
  );
}
