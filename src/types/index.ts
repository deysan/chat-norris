import { Timestamp } from 'firebase/firestore';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type Profile = {
  id: number;
  email: string;
  username: string;
  photo: string;
};

export type Chat = {
  id?: string;
  users: string[];
  profile: Profile;
  time?: number;
};

export type Message = {
  text: string;
  sender: string;
  created: Timestamp;
};

export type ChuckNorris = {
  icon_url: string;
  id: string;
  url: string;
  value: string;
};

export type FormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  checkbox: boolean;
};
