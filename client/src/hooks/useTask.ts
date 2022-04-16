import { useEffect, useState } from 'react';
import { Configuration, TaskApi, TaskDto } from '../api/autogen';

interface ReturnValue {
  isLoading: boolean;
  tasks: TaskDto[];
  removeById: (id: number) => Promise<void>;
  create: (task: string) => Promise<void>;
}
const config = new Configuration({
  basePath: import.meta.env.VITE_APP_API_URL,
});
const taskApi = new TaskApi(config);

export const useTask = (): ReturnValue => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskDto[]>([]);

  const findAll = async () => {
    setIsLoading(true);
    const result = await taskApi.findAll();
    setTasks(result.data);
    setIsLoading(false);
  };

  const removeById = async (id: number) => {
    await taskApi.remove(id);
    await findAll();
  };

  const create = async (task: string) => {
    await taskApi.create({ name: task });
    await findAll();
  };

  useEffect(() => {
    findAll();
  }, []);

  return { isLoading, tasks, removeById, create };
};
