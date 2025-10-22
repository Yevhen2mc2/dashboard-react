import { ThemeProvider } from "@/components/layout/theme-provider.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div></div>
    </ThemeProvider>
  );
}

export default App;
