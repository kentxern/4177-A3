//Author: Shiwen(Lareina) Yang
import { createContext, useContext, useState, useMemo, useCallback } from "react";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const defaultUserDetail = {
  _id: '',
  firstName: '',
  lastName: '',
  type: '',
  email: '',
  followedCourses: [],
  savedPosts: [],
  createdAt: '',
  updatedAt: '',
};

export function UserProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(storedUser ?? defaultUserDetail);

  const userDetailRefresh = useCallback ( 
    async (userId) => {
      const res = await fetch(`/api/user/${userId}`);
      if (res.status === 200) {
        const result = await res.json();
        setUser(result.data);
        const currentUserString = JSON.stringify(result.data);
        localStorage.setItem("currentUser", currentUserString);
      } else {
        console.log('At least one of the fields is invalid from front end');
      }
    }, []
  );

  const userContextValue = useMemo(
    () => ({user, setUser, userDetailRefresh}),
    [user, setUser, userDetailRefresh]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
