import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context's value
interface AuthContextType {
  isGuest: boolean;
  setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserName: string;
  setCurrentUserName: React.Dispatch<React.SetStateAction<string>>;
  currentUserEmail: string;
  setCurrentUserEmail: React.Dispatch<React.SetStateAction<string>>;
  doctor: string;
  setDoctor: React.Dispatch<React.SetStateAction<string>>;
  doctorId: string;
  setDoctorId: React.Dispatch<React.SetStateAction<string>>;

}

// Create the context with an initial value of null (for now)
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
 

  // Create the context value with explicit types
  const contextValue: AuthContextType = {
    isGuest,
    setIsGuest,
    currentUserName,
    setCurrentUserName,
    currentUserEmail,
    setCurrentUserEmail,
    doctor,
    setDoctor,
    doctorId,
    setDoctorId
    
  };

  // Return the provider with the context value
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};