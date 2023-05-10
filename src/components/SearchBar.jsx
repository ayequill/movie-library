import { Box, Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function SearchBar({getSearchValue, handleSearch}) {

  return (
    <Box>
      <InputGroup px={3}>
        <InputRightElement
          color="green.400"
          marginRight={3}
          children={<Search2Icon />}
          pointerEvents="true"
          onClick={handleSearch}
        />
        <Input onChange={(e) => getSearchValue (e)} type='search' focusBorderColor='green.400' borderColor='green.400' placeholder="Search" />
      </InputGroup>
    </Box>
  );
}
