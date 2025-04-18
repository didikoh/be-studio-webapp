import { createContext, ReactNode, useContext, useState } from "react";
import { Course } from "../mocks/courses";

const AppContext = createContext<any>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>("coach"); // "coach" or "user"
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <AppContext.Provider
      value={{ selectedCourse, setSelectedCourse, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
