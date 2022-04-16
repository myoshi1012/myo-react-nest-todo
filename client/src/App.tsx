import { MdCheck, MdDelete } from 'react-icons/md';
import {
  Box,
  Center,
  Container,
  IconButton,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { Card } from './components/Card';
import { useTask } from './hooks/useTask';
import { NewTaskForm } from './components/NewTaskForm';

function App() {
  const { tasks, removeById, create } = useTask();

  return (
    <Container
      bgColor="gray.50"
      h="100vh"
      w="full"
      maxW="full"
      py={6}
      centerContent
      overflowY="scroll"
    >
      <VStack w="full" spacing={8}>
        <Card w="full" maxW="600px" alignItems="start">
          <NewTaskForm onSubmit={({ task }) => create(task)} />
        </Card>

        <Card w="full" maxW="600px">
          <VStack
            w="100%"
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Stack
                  key={task.id}
                  w="100%"
                  direction="row"
                  overflow="hidden"
                  spacing={8}
                >
                  <Box flex={1} minWidth={0}>
                    {task.name}
                  </Box>
                  <Stack direction="row" spacing={4}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Complete task"
                      icon={<MdCheck />}
                    />
                    <IconButton
                      variant="outline"
                      colorScheme="red"
                      aria-label="Delete task"
                      icon={<MdDelete />}
                      onClick={() => {
                        removeById(task.id);
                      }}
                    />
                  </Stack>
                </Stack>
              ))
            ) : (
              <Center>No tasks! 🥳</Center>
            )}
          </VStack>
        </Card>
      </VStack>
    </Container>
  );
}

export default App;
