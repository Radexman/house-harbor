import { FieldValue } from 'firebase/firestore';

export interface SignInFormTypes {
  email: string;
  password: string;
}

export interface SignUpFormTypes {
  name: string;
  email: string;
  password?: string | undefined;
  timestamp?: FieldValue;
}
