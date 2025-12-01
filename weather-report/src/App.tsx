import { ThemeProvider } from './components/theme-provider'
import { CardLogin } from './components/card-login';
import { ModeToggle } from './components/mode-toggle';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center relative p-4">
        <div className="absolute top-4 right-4 z-50">
          <ModeToggle />
        </div>
        <CardLogin />
      </div>
    </ThemeProvider>
  );
}
