import { Flex, Stack, Text, Heading } from "@chakra-ui/react";
import * as React from "react";
import { FiMap, FiHome, FiMapPin } from "react-icons/fi";
import { NavButton } from "./NavButton";
import { useLocation } from "react-router-dom";
export const Sidebar = ({ goTo }) => (
  <Flex
    flex="1"
    bg="bg-accent"
    color="on-accent"
    overflowY="auto"
    maxW={{
      base: "full",
      sm: "xs",
    }}
    py={{
      base: "6",
      sm: "8",
    }}
    px={{
      base: "4",
      sm: "6",
    }}
  >
    <Stack justify="space-between" spacing="1" width="full">
      <Stack spacing="8" shouldWrapChildren>
        <Heading fontFamily="mono" textAlign="center" color="#8D99AE">
          Demo
        </Heading>
        <Stack spacing="1">
          <NavButton link="/" label="Home" icon={FiHome} />
          <NavButton
            link="/google"
            label="Google"
            icon={FiMap}
            aria-current="page"
          />
          <NavButton
            link="/leaflet"
            label="Leaflet"
            icon={FiMap}
            aria-current="page"
          />
        </Stack>
        {useLocation().pathname !== "/" && (
          <Stack>
            <Text fontSize="sm" color="on-accent-muted" fontWeight="medium">
              Projects
            </Text>
            <Stack spacing="1">
              <NavButton
                goTo={() => goTo(0)}
                label="Project - 1"
                icon={FiMapPin}
              />
              <NavButton
                goTo={() => goTo(1)}
                label="Project - 2"
                icon={FiMapPin}
              />
              <NavButton
                goTo={() => goTo(2)}
                label="Project - 3"
                icon={FiMapPin}
              />
              <NavButton
                goTo={() => goTo(3)}
                label="Project - 4"
                icon={FiMapPin}
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  </Flex>
);
