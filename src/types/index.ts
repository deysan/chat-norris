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
};

export type Message = {
  text: string;
  sender: string;
  created: {
    seconds: number;
    nanoseconds: number;
  };
};
