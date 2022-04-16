import { Box, BoxProps } from '@chakra-ui/react';

interface CardProps extends BoxProps {}

export function Card({ children, ...rest }: CardProps): JSX.Element {
  return (
    <Box
      w="full"
      display="flex"
      flexDirection="column"
      background="white"
      alignItems="center"
      padding={6}
      borderRadius="md"
      boxShadow="lg"
      {...rest}
    >
      {children}
    </Box>
  );
}
