import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { CgClose } from "react-icons/cg";
import { useRef, useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber } from "react-phone-number-input/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  // 定义表单状态
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const Icon = show ? FaEye : FaEyeSlash;
  const Icon2 = show2 ? FaEye : FaEyeSlash;
  const [responseMsg, setResponseMsg] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phone)) {
      alert("请输入正确的电话号码！");
      return;
    }

    if (password.length < 8) {
      alert("密码至少8位，请重新输入");
      return;
    }

    if (password !== password2) {
      alert("两次密码不一致，请重新输入");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("birthday", birthday);
    formData.append("password", password);
    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }

    try {
      const res = await axios.post(`${baseUrl}/auth-register.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // ✅ 必须加这个，才能存 session
      });

      setResponseMsg(res.data.message);
      setUser(res.data.profile);
    } catch (err: any) {
      console.error(err);
      setResponseMsg(err.response?.data?.message || "网络错误");
    }

    // 提交后跳转或发请求
    // alert("注册成功（模拟）！");
    // navigate("/login");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>账号注册</h3>
          <div
            className={styles.close}
            onClick={() => {
              navigate("/login");
            }}
          >
            <CgClose />
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="名字"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles["form-input"]}
            required
          />

          <PhoneInput
            placeholder="电话号码"
            defaultCountry="MY"
            value={phone}
            onChange={(value) => setPhone(value || "")}
            className={styles["form-input"]}
            required
          />

          <input
            type="text"
            placeholder="生日"
            value={birthday}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            onChange={(e) => setBirthday(e.target.value)}
            className={styles["form-input"]}
            required
          />

          <div className={styles["form-row"]}>
            <input
              type={show ? "text" : "password"}
              placeholder="密码(最少8位)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles["form-input"]}
              required
            />
            <Icon
              className={styles["show-icon"]}
              onClick={() => setShow(!show)}
            />
          </div>

          <div className={styles["form-row"]}>
            <input
              type={show2 ? "text" : "password"}
              placeholder="确认密码"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className={styles["form-input"]}
              required
            />
            <Icon2
              className={styles["show-icon"]}
              onClick={() => setShow2(!show2)}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setProfilePic(file);
            }}
            className={styles["hidden-file-input"]}
          />

          <input
            type="text"
            placeholder="上传头像（可选）"
            defaultValue={profilePic ? profilePic.name : ""}
            onClick={() => fileInputRef.current?.click()}
            className={styles["form-input"]}
          />
          <button type="submit">提交</button>
          {responseMsg && <p>{responseMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
