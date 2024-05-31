export interface RemoveUser {
  remove(id: string): Promise<string>;
}
