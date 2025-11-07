export type PriorityType = 'Low' | 'Medium' | 'High';
export const priorities: PriorityType[] = ['Low', 'Medium', 'High'];
export type StatusType = 'Todo' | 'Ongoing' | 'Done';
export const statuses: StatusType[] = ['Todo', 'Ongoing', 'Done'];

export interface TaskItem {
  id: string;
  title: string;
  details: string;
  project: ProjectItem;
  priority: PriorityType;
  dueDate: string;
  status: StatusType;
}

export interface ProjectItem {
  id: string;
  name: string;
}
