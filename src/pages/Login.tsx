import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/userStore";
import "./Login.css";
import { useAppContext } from "../contexts/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const login = useUserStore((state: any) => state.login);
  const { setUser,setSelectedPage } = useAppContext();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return setError("请输入手机号");

    // 模拟登录成功
    if (phone == "888") {
      login({ name: "测试用户（教练）", phone });
      setSelectedPage("coach_course")
      setUser("coach");
      navigate("/coach_account");
    }else if(phone == "666"){
      login({ name: "测试用户（管理员）", phone });
      setSelectedPage("home")
      setUser("admin")
      navigate("/account");
    }else{
      login({ name: "测试用户", phone });
      setSelectedPage("home")
      setUser("user");
      navigate("/account");
    }
    if (rememberMe) {
      localStorage.setItem("rememberPhone", phone);
    }

  };

  const handleSendCode = () => {
    if (!phone) return alert("请输入手机号再发送验证码");
    alert("验证码已发送 (模拟)");
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
          <input
            type="password"
            placeholder="密码 (测试账号无密码)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <div className="login-code-row">
            <input
              type="text"
              placeholder="验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="login-input code-input"
            />
            <button
              type="button"
              onClick={handleSendCode}
              className="code-button"
            >
              获取验证码
            </button>
          </div>
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            记住我
          </label>
          <button type="submit" className="login-button">
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
