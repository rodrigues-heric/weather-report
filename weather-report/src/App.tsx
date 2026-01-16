import { ThemeProvider } from './components/theme-provider';
import { Login } from './pages/login';
import { Register } from './pages/register';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Home } from './pages/home';
import { WeatherDataProvider } from './contexts/weather-data-context';
import { AuthProvider } from './contexts/auth-context';
import { ProtectedRoute } from './components/protected-route';
import { AppHeader } from './components/app-header';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </>
  )
);

export default function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <WeatherDataProvider>
        <AuthProvider>
          <div className='flex flex-col p-4'>
            <AppHeader />

            <main className='flex'>
              <RouterProvider router={router} />
            </main>
          </div>
        </AuthProvider>
      </WeatherDataProvider>
    </ThemeProvider>
  );
}
