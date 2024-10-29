import {Storage} from "@/utils/storage";

export const useAuth = () => {
  const user = Storage.get('accessToken');

  return user && true;
}