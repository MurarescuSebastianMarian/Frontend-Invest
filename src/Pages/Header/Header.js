import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <div className="Header_LOGO">
        <Link to="/">FINANCIAL Invest</Link>
      </div>
      <div className="Header_GroupLink">
        <div className="Header_GroupLink_Home">
          <Link to="/">Home</Link>
        </div>
        <div className="Header_GroupLink_Strategy">
          <Link to="/strategy">Strategy</Link>
        </div>
      </div>
      <div className="Header_Login">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Header;
