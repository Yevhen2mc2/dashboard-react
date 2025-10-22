import { ThemeProvider } from "@/components/layout/theme-provider.tsx";
import { Header } from "@/components/layout/header.tsx";
import { ControlPanel } from "@/components/layout/control-panel.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <ControlPanel />
        <main className="flex-1">
          {/* Control Panel and Dashboard Content will go here */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
