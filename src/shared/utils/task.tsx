export type PriorityType = 'Low' | 'Medium' | 'High';
export const priorities: PriorityType[] = ['Low', 'Medium', 'High'];
export type StatusType = 'Todo' | 'Done' ;

export interface TaskItem {
  id: string;
  title: string;
  content: string;
  project: string;
  priority: PriorityType;
  dueDate: string;
  status: StatusType;
}