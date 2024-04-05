import { Timestamp } from 'firebase/firestore';

export type UserType = {
  email: string;
  name: string;
  timestamp: Timestamp;
};
