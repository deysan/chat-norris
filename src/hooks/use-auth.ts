import { useAppSelector } from './redux-hooks';

export function useAuth() {
  const { id, email, username, photo, token } = useAppSelector(
    (state) => state.user,
  );

  return {
    isAuth: !!email,
    id,
    email,
    username,
    photo,
    token,
  };
}
