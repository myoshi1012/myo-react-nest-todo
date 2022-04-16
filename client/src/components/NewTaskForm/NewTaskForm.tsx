import {
  HStack,
  FormControl,
  Input,
  Button,
  Box,
  styled,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  task: string;
};

type NewTaskFormProps = {
  onSubmit: SubmitHandler<Inputs>;
};

export function NewTaskForm({ onSubmit }: NewTaskFormProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  return (
    <Box w="full">
      <form onSubmit={(ev) => handleSubmit(onSubmit)(ev).then(() => reset())}>
        <HStack w="full">
          <FormControl>
            <Input id="task" placeholder="Todo" {...register('task')} />
          </FormControl>
          <Button mt={4} type="submit" colorScheme="teal">
            Add
          </Button>
        </HStack>
      </form>
    </Box>
  );
}
