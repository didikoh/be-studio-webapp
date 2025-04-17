
// BottomNavBar.tsx
import { FaHome, FaClock, FaShoppingBag, FaUser } from "react-icons/fa";
import "./BottomNavBar.css";

const BottomNavBar = () => {
  return (
    <div className="bottom-nav">
      <div className="nav-item active">
        <FaHome />
        <div>首页</div>
      </div>
      <div className="nav-item">
        <FaClock />
        <div>预约</div>
      </div>
      <div className="nav-item">
        <FaShoppingBag />
        <div>活动</div>
      </div>
      <div className="nav-item">
        <FaUser />
        <div>我的</div>
      </div>
    </div>
  );
  };
  
  export default BottomNavBar;
  