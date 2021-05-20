import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/bookshelf">Bookshelf</Link>
      <Link to="/search">Search</Link>
    </div>
  );
};

export default Navbar;
