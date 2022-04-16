import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, PrismaService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all tasks', () => {
    it('should return all tasks', async () => {
      prisma.task.findMany = jest
        .fn()
        .mockReturnValueOnce([{ id: 1, name: 'task1', completed: false }]);
      const tasks = await controller.findAll();
      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toMatchObject({ id: 1, name: 'task1' });
    });
  });
});
