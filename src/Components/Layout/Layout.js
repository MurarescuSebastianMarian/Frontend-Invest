import { Outlet, useLocation } from "react-router-dom";
import './Layout.css';
import Header from '../../Pages/Header/Header';

const Layout  = () => {
  const location = useLocation();

  return (
    <>
      {
        (
          location.pathname !== '/login' &&
          location.pathname !== '/register'
        ) &&
          <Header />
      }
      
      <Outlet />
    </>
  );
}

export default Layout ;
