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
      <div className='min-h-screen flex flex-col p-4'>
        <header className='flex justify-between items-center mb-4'>
          <LanguageSelector />
          <ModeToggle />
        </header>

        <main className='flex-1 flex'>
          <RouterProvider router={router} />
        </main>
      </div>
    </ThemeProvider>
  );
}
