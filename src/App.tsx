import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./config/theme";
import AppRouter from "../src/routes/appRouter";

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
