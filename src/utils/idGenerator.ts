
import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = (): string => {
  return uuidv4();
};

export const generateSequentialId = (prefix: string, index: number): string => {
  return `${prefix}-${String(index).padStart(4, '0')}-${Date.now()}`;
};

export const isValidId = (id: string): boolean => {
  return typeof id === 'string' && id.length > 0;
};
