export interface IStorage<T> {
  read(): Promise<T[]>;
  write(data: T[]): Promise<void>;
}
