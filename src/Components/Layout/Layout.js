import { Outlet, useLocation } from "react-router-dom";
import './Layout.css';
import Header from '../../Pages/Header/Header';
import Footer from '../../Pages/Footer/Footer';

const Layout  = () => {
  const location = useLocation();

  return (
    <>
      {
        (
          location.pathname !== '/quiz' &&
          location.pathname !== '/login' &&
          location.pathname !== '/register'
        ) &&
          <Header />
      }
      
      <Outlet />

      {
        (
          location.pathname !== '/quiz' &&
          location.pathname !== '/login' &&
          location.pathname !== '/register'
        ) &&
          <Footer />
      }
    </>
  );
}

export default Layout ;
