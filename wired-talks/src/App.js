import "./App.css";
import { HeaderComponent } from "./Components/Header";
import { Routes } from "./Routes";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <HeaderComponent />
        <div
          style={{
            height: "95vh",
            weight: "100vw",
          }}
        >
          <Routes />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
