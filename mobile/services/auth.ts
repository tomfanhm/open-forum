import { auth } from "~/config/firebase-config";
import { LoginRequest, RegisterRequest } from "~/schemas/request/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

export const login = async (request: LoginRequest): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(
    auth,
    request.email,
    request.password
  );
};

export const register = async (
  request: RegisterRequest
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(
    auth,
    request.email,
    request.password
  );
};

export const logout = async (): Promise<void> => {
  return await signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const isLoggedIn = (): boolean => {
  return auth.currentUser !== null;
};

export const getUserId = (): string | null => {
  const user = getCurrentUser();
  return user ? user.uid : null;
};

export const getIdToken = async (): Promise<string> => {
  const user = getCurrentUser();
  if (!user) throw new Error("Not logged in");
  return await user.getIdToken();
};
