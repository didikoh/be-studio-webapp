import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";

const GlobalWrapper = () => {
  const { i18n } = useTranslation();
  const { loading, user, setSelectedPage } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      console.log(user.role);
      switch (user.role) {
        case "admin":
          setSelectedPage("admin_home");
          navigate("/admin_home");
          console.log("admin_home");
          break;
        case "coach":
          setSelectedPage("coach_schedule");
          navigate("/coach_schedule");
          break;
        case "student":
          setSelectedPage("account");
          navigate("/account");
          break;
      }
    } else {
      setSelectedPage("account");
      navigate("/account");
    }
  }, [user]);

  const changeLanguage = () => {
    if (i18n.language === "zh") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("zh");
    }
  };

  return (
    <>
      <button style={{ position: "fixed" ,zIndex:100}} onClick={() => changeLanguage()}>
        Language
      </button>
      {loading && <Loading />}
      <Outlet />
    </>
  );
};

export default GlobalWrapper;
