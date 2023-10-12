import React, { lazy, Suspense, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import UserContext from './context/user-context';
import checkCookie from './component/read-cookie-time';
import './App.scss';
import WarnCookieExpire from './component/warn-cookie-expire';

const AddCustomer = lazy(() => import('./view/customer/add-customer'));
const ProtectedRoute = lazy(() => import('./component/protected-route'));
const SignOut = lazy(() => import('./view/sign-out'));
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

const App = (props) => {
  const [user, setUser] = useState(props.user);
  const [warn, setWarn] = useState(false);
  document.title = `Warehouse - React (${process.env.SITE_BUILD})`;
  console.log('app was called');

  const cookieTime = checkCookie('warehouse-react-expiry');
  const warnTime = 3;
  if (cookieTime) {
    const startWarnAt = (((cookieTime.minute - warnTime) * 60) + cookieTime.second) * 1000;
    console.log(startWarnAt / 1000 + ' seconds left to warn.');
    setTimeout(() => {
      setWarn(true);
    }, startWarnAt);
  }

  return (
    <Suspense fallback={<h1>Hold on, it's loading...</h1>}>
      <UserContext.Provider value={{user, setUser}}>
        {warn && <WarnCookieExpire show={true} cookieTime={cookieTime} onExtend={() => {console.log('continue clicked')}} /> }
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