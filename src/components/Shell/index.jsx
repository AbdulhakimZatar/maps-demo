import { Box, Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

const Shell = ({ children, goTo }) => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      as="section"
      direction={{
        base: "column",
        lg: "row",
      }}
      height="100vh"
      bg="#2B2D42"
      color="#EDF2F4"
      overflowY="auto"
    >
      {isDesktop ? <Sidebar goTo={goTo} /> : <Navbar goTo={goTo} />}
      <Box
        bg="bg-accent"
        pt={{
          base: "0",
          lg: "3",
        }}
        flex="1"
      >
        <Box
          bg="#8D99AE"
          borderTopLeftRadius={{
            base: "none",
            lg: "2rem",
          }}
          height="full"
        >
          <Container
            className="container"
            pos="relative"
            height="full"
            maxW="none"
            p="0"
          >
            {children}
          </Container>
        </Box>
      </Box>
    </Flex>
  );
};

export default Shell;
