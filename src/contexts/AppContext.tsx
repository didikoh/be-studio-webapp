import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Course } from "../mocks/courses";
import axios from "axios";

const AppContext = createContext<any>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedPage, setSelectedPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}auth-check.php`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.profile);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const logout = async () => {
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}auth-logout.php`, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        user,
        setUser,
        selectedPage,
        setSelectedPage,
        selectedEvent,
        setSelectedEvent,
        logout,
        loading,
        setLoading,
        setRefreshKey
      }}
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
