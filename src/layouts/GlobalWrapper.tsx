import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Loading from "../components/Loading";

const GlobalWrapper = () => {
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
          setSelectedPage("coach_course");
          navigate("/coach_course");
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

  return (
    <>
      {loading && <Loading />}
      <Outlet />
    </>
  );
};

export default GlobalWrapper;
