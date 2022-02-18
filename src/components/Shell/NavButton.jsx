import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NavButton = (props) => {
  const { icon, label, link, goTo, ...buttonProps } = props;
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        if (link) navigate(link);
        if (goTo) goTo();
      }}
      variant="ghost-on-accent"
      justifyContent="start"
      {...buttonProps}
    >
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="on-accent-subtle" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  );
};
