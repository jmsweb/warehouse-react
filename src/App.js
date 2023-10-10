import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import UserContext from './context/user-context';
import './App.scss';
import AddCustomer from './view/customer/add-customer';
import ProtectedRoute from './component/protected-route';
import SignOut from './view/sign-out';

const Home = lazy(() => import('./view/home'));
const About = lazy(() => import('./view/about'));
const Contact = lazy(() => import('./view/contact'));
const Register = lazy(() => import('./view/register'));
const TermOfUse = lazy(() => import('./view/term-of-use'));
const PrivacyPolicy = lazy(() => import('./view/privacy-policy'));
const SignIn = lazy(() => import('./view/sign-in'));
const ForgotPassword = lazy(() => import('./view/forgot-password'));
const CartReview = lazy(() => import('./view/cart-review'));
const Deal = lazy(() => import('./view/deal'));
const Menu = lazy(() => import('./component/menu'));
const Footer = lazy(() => import('./component/footer'));
const ShowProducts = lazy(() => import('./view/catalog/show-products'));
const AddProduct = lazy(() => import('./view/catalog/add-product'));

const App = () => {
  const [user, setUser] = useState(null);
  document.title = `Warehouse - React (${process.env.SITE_BUILD})`;

  useEffect(() => {
    (async () => {
      console.log('verify called in app.js');
      await fetch(process.env.WAREHOUSE_API + '/api/v1/auth/verify', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          setUser({
            email: response.payload.email,
            id: response.payload.id,
            name: response.payload.name,
            admin: response.payload.admin
          })
        }
      })
      .catch((error) => console.log(error) )
    })();

  }, []);

  // PROTECTED ROUTE USE AuthProvider
  // https://blog.devgenius.io/how-to-add-authentication-to-a-react-app-26865ecaca4b
  // https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
  return (
    <Suspense fallback={<h1>Hold on, it's loading...</h1>}>
      <UserContext.Provider value={{user, setUser}}>
        <Menu />
        <Routes>
          <Route index={true} element={<Home />}></Route>
          <Route path='/about-us' element={<About />}></Route>
          <Route path='/cart-review' element={<CartReview />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/catalog/add' element={<AddProduct />} />
            <Route path='/customer/add' element={<AddCustomer />} />
          </Route>
          <Route path='/catalog/:category' element={<ShowProducts />}></Route>
          <Route path='/contact-warehouse' element={<Contact />}></Route>
          <Route path='/deal' element={<Deal />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/privacy-policy' element={<PrivacyPolicy />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/sign-out' element={<SignOut />}></Route>
          <Route path='/term-of-use' element={<TermOfUse />}></Route>
          <Route path='*' element={<Navigate replace to='/' />}></Route>
        </Routes>
        <Footer />
      </UserContext.Provider>
    </Suspense>
  );
}



export default App;