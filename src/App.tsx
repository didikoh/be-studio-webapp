import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AppProvider } from "./contexts/AppContext"; // 👈 记得导入

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
