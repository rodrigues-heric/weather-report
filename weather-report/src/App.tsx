import { ThemeProvider } from './components/theme-provider';
import { Login } from './pages/login';
import { ModeToggle } from './components/mode-toggle';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Home } from './pages/home';
import { LanguageSelector } from './components/language-selector';
import { WeatherDataProvider } from './contexts/weather-data-context';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </>
  )
);

export default function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <WeatherDataProvider>
        <div className='flex flex-col p-4'>
          <header className='mb-4 flex items-center justify-between'>
            <LanguageSelector />
            <ModeToggle />
          </header>

          <main className='flex'>
            <RouterProvider router={router} />
          </main>
        </div>
      </WeatherDataProvider>
    </ThemeProvider>
  );
}
