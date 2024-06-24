import { Link, useNavigate } from "react-router-dom";
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('quizCompleted');
    navigate('/login');
  }
  return (
    <div className="Header">
      <div className="Header_LOGO">
        <Link to="/">Investment Advisor</Link>
      </div>
      <div className="Header_GroupLink">
        <div className="Header_GroupLink_Home">
          <Link to="/">Home</Link>
        </div>
        <div className="Header_GroupLink_Strategy">
          <Link to="/strategy">Strategy</Link>
        </div>
      </div>
      <div className="Header_Login" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}

export default Header;
