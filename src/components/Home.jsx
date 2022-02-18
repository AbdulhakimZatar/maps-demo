import React from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
function Home() {
  return (
    <Center color="whitesmoke" height="full">
      <VStack>
        <Heading size="4xl"> Welcome </Heading>
        <Heading size="md">Choose one of the maps to start</Heading>
      </VStack>
    </Center>
  );
}

export default Home;
