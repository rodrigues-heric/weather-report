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
      <div className='min-h-screen flex items-center justify-center relative p-4'>
        <div className='absolute top-4 right-4 z-50'>
          <ModeToggle />
        </div>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}
