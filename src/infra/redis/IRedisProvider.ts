export interface IRedisProvider {
  persist(key: string, value: string, exp: number): Promise<'OK'>;
  delete(key: string): Promise<number>;
  retrieve(key: string): Promise<string>;
}
