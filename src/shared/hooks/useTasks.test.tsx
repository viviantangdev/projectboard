import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTasks } from './useTasks';

describe('useTasks', () => {
  it('should throw error when used outside TasksProvider', () => {
    expect(() => {
      renderHook(() => useTasks());
    }).toThrow('useTasks must be used within a TasksProvider');
  });

  it('should throw error with correct message', () => {
    expect(() => {
      renderHook(() => useTasks());
    }).toThrowError('useTasks must be used within a TasksProvider');
  });
});
