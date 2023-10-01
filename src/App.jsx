import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './App.scss';

const Home = lazy(() => import('./view/home.jsx'));
const About = lazy(() => import('./view/about.jsx'));
const Contact = lazy(() => import('./view/contact.jsx'));
const Register = lazy(() => import('./view/register.jsx'));
const TermOfUse = lazy(() => import('./view/term-of-use.jsx'));
const PrivacyPolicy = lazy(() => import('./view/privacy-policy.jsx'));
const SignIn = lazy(() => import('./view/sign-in.jsx'));
const ForgotPassword = lazy(() => import('./view/forgot-password.jsx'));
const CartReview = lazy(() => import('./view/cart-review.jsx'));
const Deal = lazy(() => import('./view/deal.jsx'));
const Menu = lazy(() => import('./component/menu/index.jsx'));
const Footer = lazy(() => import('./component/footer/index.jsx'));


class App extends React.Component {

    componentDidMount() {
        document.title = `Warehouse - React (${process.env.SITE_BUILD})`;
    }

    render() {
        return (
            <Suspense fallback={<h1>Hold on, it's loading...</h1>}>
                <BrowserRouter>
                    <Menu />
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/about-us' element={<About />} />
                        <Route path='/contact-warehouse' element={<Contact />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/term-of-use' element={<TermOfUse />} />
                        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                        <Route path='/sign-in' element={<SignIn />} />
                        <Route path='/deal' element={<Deal />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/cart-review' element={<CartReview />} />
                        <Route path='*' element={<Navigate replace to='/' />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </Suspense>
          );
    }
}
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<React.StrictMode><App /></React.StrictMode>);