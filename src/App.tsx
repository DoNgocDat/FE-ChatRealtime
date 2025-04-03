import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./config/theme";
import AppRouter from "../src/routes/appRouter";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
