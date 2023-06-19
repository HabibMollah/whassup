import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  currentUser: null | User;
  setCurrentUser: any;
  isLoading: boolean;
  setIsLoading: any;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      console.log(user);
      if (!user) {
        setIsLoading(false);
        setCurrentUser(null);
        return;
      } else {
        setIsLoading(false);
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => useContext(UserContext);
