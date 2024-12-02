export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface TodoCreateDTO {
  title: string;
}
export interface TodoUpdateDTO {
  title?: string;
  completed?: boolean;
}
