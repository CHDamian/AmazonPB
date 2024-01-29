import './App.css'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from './pages';
import RootLayout from './layout/RootLayout';
import { AuthProvider } from './context/AuthContext';
import DetailsPage from './pages/detailsPage/details';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/cartPage/cart';
import { ThemeProvider, createTheme } from '@mui/material';
import { SearchProvider } from './context/SearchContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<RootLayout/>}>
        <Route index element={<Navigate to="/home"/>} />
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/details/:id' element={<DetailsPage/>}></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
      </Route>
      <Route path='/register' element={<RegisterPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
    </Route>
  )
)


function App() {

  return (
    <>
      <ThemeProvider theme={createTheme()}>
      <AuthProvider>
        <SearchProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
        </SearchProvider>
      </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
