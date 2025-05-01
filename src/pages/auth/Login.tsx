import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../../mocks/userStore";
import "./Login.css";
import { useAppContext } from "../../contexts/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const login = useUserStore((state: any) => state.login);
  const { setUser, setSelectedPage } = useAppContext();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return setError("请输入手机号");

    // 模拟登录成功
    if (phone == "888") {
      login({ name: "测试用户（教练）", phone });
      setSelectedPage("coach_course");
      setUser("coach");
      navigate("/coach_course");
    } else if (phone == "666") {
      login({ name: "测试用户（管理员）", phone });
      setSelectedPage("admin_home");
      setUser("admin");
      navigate("/admin_home");
    } else {
      login({ name: "测试用户", phone });
      setSelectedPage("account");
      setUser("user");
      navigate("/account");
    }
    if (rememberMe) {
      localStorage.setItem("rememberPhone", phone);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">登录 be studio</h1>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="请输入手机号"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="login-input"
          />
          <div className="form-bottom-row">
            <input
              type="password"
              placeholder="密码 (测试账号无密码)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="form-bottom-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              记住我
            </label>{" "}
            <span
              className="register-text"
              onClick={() => navigate("/register")}
              role="button"
              tabIndex={0}
            >
              欢迎加入我们！点此注册
            </span>
          </div>
          <button type="submit" className="login-button">
            登录
          </button>
          <div className="form-bottom-row">
            <span
              className="forget-password-text"
              onClick={() => navigate("/forget_password")}
              role="button"
              tabIndex={0}
            >
              忘记密码？
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
