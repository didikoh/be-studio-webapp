import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.css";
import { useAppContext } from "../../contexts/AppContext";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";
import axios from "axios";
import { CgClose } from "react-icons/cg";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setSelectedPage } = useAppContext();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phone)) {
      alert("请输入正确的电话号码！");
      return;
    }

    if (password.length < 8) {
      alert("密码至少8位，请重新输入");
      return;
    }

    console.log("登录提交：", { phone, password });

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password);

    try {
      const res = await axios.post(`${baseUrl}auth-login.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // ✅ 必须加这个，才能存 session
      });

      console.log(res.data);

      if (res.data.success) {
        setUser(res.data.profile);
      } else {
        setError(res.data.message);
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-content"]}>
        <h1 className={styles["login-title"]}>登录 be studio</h1>
        <button
          className={styles.closeBtn}
          onClick={() => {
            setSelectedPage("home");
            navigate("/home");
          }}
        >
          <CgClose />
        </button>
        {error && <div className={styles["login-error"]}>{error}</div>}
        <form onSubmit={handleLogin} className={styles["login-form"]}>
          <PhoneInput
            placeholder="电话号码"
            defaultCountry="MY"
            value={phone}
            onChange={(value) => setPhone(value || "")}
            className={styles["login-input"]}
            required
          />
          <div className={styles["form-bottom-row"]}>
            <input
              type="password"
              placeholder="密码 "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles["login-input"]}
              required
            />
          </div>

          <div className={styles["form-bottom-row"]}>
            {/* <label className={styles["remember-me"]}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              记住我
            </label>{" "} */}
            <span
              className={styles["register-text"]}
              onClick={() => navigate("/register")}
              role="button"
              tabIndex={0}
            >
              欢迎加入我们！点此注册
            </span>
          </div>
          <button type="submit" className={styles["login-button"]}>
            登录
          </button>
          <div className={styles["form-bottom-row"]}>
            <span
              className={styles["forget-password-text"]}
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
