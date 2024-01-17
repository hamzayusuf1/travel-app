import { createContext, useState } from "react";

export const AuthContext = createContext({});

const useAuthContext = () => {
  const [user, setUser] = useState(null);
};

// export const useAuthContext = () => {
//   useContext(AuthContext);
// };

// // export const AuthContext = createContext({
// //   isLoggedIn: false,
// //   login: () => {},
// //   logout: () => {},
// // });

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = useCallback(() => {
//     setIsLoggedIn(true);
//   }, []);

//   const logout = useCallback(() => {
//     setIsLoggedIn(false);
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
