import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link to="/" className="font-bold text-xl">be studio</Link>
        <div className="hidden md:flex gap-6">
          <Link to="/reserve">预约课程</Link>
          <Link to="/courses">课程介绍</Link>
          <Link to="/account">我的账户</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
