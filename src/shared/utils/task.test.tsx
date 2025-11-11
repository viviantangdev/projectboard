import { describe, it, expect } from 'vitest';
import type { TaskItem } from './task';
import { priorities, statuses } from './task';

describe('Task Utilities', () => {
  describe('Priority Constants', () => {
    it('should have correct priority values', () => {
      expect(priorities).toEqual(['Low', 'Medium', 'High']);
    });

    it('should contain valid priority types', () => {
      expect(priorities.length).toBe(3);
      expect(priorities).toContain('Low');
      expect(priorities).toContain('Medium');
      expect(priorities).toContain('High');
    });
  });

  describe('Status Constants', () => {
    it('should have correct status values', () => {
      expect(statuses).toEqual(['NotStarted', 'InProgress', 'Completed']);
    });

    it('should contain valid status types', () => {
      expect(statuses.length).toBe(3);
      expect(statuses).toContain('NotStarted');
      expect(statuses).toContain('InProgress');
      expect(statuses).toContain('Completed');
    });
  });

  describe('TaskItem Interface', () => {
    it('should create a valid task item', () => {
      const task: TaskItem = {
        id: '1',
        title: 'Test Task',
        details: 'Test Details',
        project: { id: 'p1', name: 'Test Project' },
        priority: 'High',
        dueDate: '2025-12-31',
        status: 'NotStarted',
      };

      expect(task.id).toBe('1');
      expect(task.title).toBe('Test Task');
      expect(task.priority).toBe('High');
      expect(task.status).toBe('NotStarted');
    });

    it('should have all required fields', () => {
      const task: TaskItem = {
        id: 'task-id',
        title: 'My Task',
        details: 'Description',
        project: { id: 'proj-1', name: 'My Project' },
        priority: 'Medium',
        dueDate: '2025-11-15',
        status: 'InProgress',
      };

      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('details');
      expect(task).toHaveProperty('project');
      expect(task).toHaveProperty('priority');
      expect(task).toHaveProperty('dueDate');
      expect(task).toHaveProperty('status');
    });
  });
});
