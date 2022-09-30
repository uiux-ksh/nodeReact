import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <ul className="navBar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/footer">Footer</Link>
        </li>
        <li>
          <Link to="/Landing">LandingPage</Link>
        </li>
        <li>
          <Link to="/Login">LoginPage</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
