export interface User {
  name: string;
  email: string;
  password: string;
  confirmed: boolean;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  role_id: number;
}
