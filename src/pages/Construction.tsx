import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Construction = () => {
  const navigate = useNavigate();
  const { user,setSelectedPage } = useAppContext();

  const handleBack = () => {
    switch (user) {
      case "user":
        navigate("/Home");
        setSelectedPage("home");
        break;
      case "coach":
        navigate("/coach_course");
        setSelectedPage("coach_course");
        break;
      default:
        navigate("/Home");
        setSelectedPage("home");
        break;
    }
  };
  return (
    <div className="construction">
      ⚡页面还在开发中⚡
      <br />
      <button onClick={() => handleBack()} className="back-link">
        返回
      </button>
    </div>
  );
};

export default Construction;
