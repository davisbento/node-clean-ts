import { v4 as uuidv4 } from 'uuid';

export const generateHashId = () => {
  return Math.random().toString(36).replace('0.', '').toUpperCase();
};

export const generateUuidV4 = () => {
  return uuidv4();
};
