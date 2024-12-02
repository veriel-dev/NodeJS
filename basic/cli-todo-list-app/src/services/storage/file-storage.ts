import { promises as fs } from 'fs';
import path from 'path';
import { IStorage } from './storage.interface';

export class FileStorage<T> implements IStorage<T> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(__dirname, '..', '..', 'data', fileName);
  }

  async read(): Promise<T[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await this.write([]);
        return [];
      }
      throw error;
    }
  }

  async write(data: T[]): Promise<void> {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }
}
