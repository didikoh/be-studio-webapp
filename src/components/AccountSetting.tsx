import React, { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import styles from "./AccountSetting.module.css";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";

const AccountSetting = ({ setSettingOpen }: any) => {
  const navigate = useNavigate();
  const { user, setRefreshKey, logout } = useAppContext();
  // 定义表单状态
  const [name, setName] = useState(user.name || "");
  const [birthday, setBirthday] = useState(user.birthday || "");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNew2, setPasswordNew2] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const Icon = show ? FaEye : FaEyeSlash;
  const Icon2 = show2 ? FaEye : FaEyeSlash;
  const Icon3 = show3 ? FaEye : FaEyeSlash;
  const [responseMsg, setResponseMsg] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [changePassword, setChangePassword] = useState(false);

  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("birthday", birthday);
    formData.append("phone", user.phone);
    formData.append("action", "edit");

    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }

    try {
      const res = await axios.post(`${baseUrl}edit-profile.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // ✅ 必须加这个，才能存 session
      });

      if (res.data.success) {
        setSettingOpen(false);
        setRefreshKey((prev: any) => prev + 1);
      } else {
        setResponseMsg(res?.data?.message || "网络错误");
      }
    } catch (err: any) {
      console.error(err);
      setResponseMsg(err.response?.data?.message || "网络错误");
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordOld.length < 8 || passwordNew.length < 8) {
      alert("密码至少8位，请重新输入");
      return;
    }

    if (passwordNew !== passwordNew2) {
      alert("两次新密码不一致，请重新输入");
      return;
    }

    const formData = new FormData();
    formData.append("action", "change_password");
    formData.append("phone", user.phone);
    formData.append("password_old", passwordOld);
    formData.append("password_new", passwordNew);

    try {
      const res = await axios.post(`${baseUrl}edit-profile.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // ✅ 必须加这个，才能存 session
      });

      if (res.data.success) {
        alert("密码修改成功");
        logout();
      } else {
        setResponseMsg(res?.data?.message || "网络错误");
      }
    } catch (err: any) {
      console.error(err);
      setResponseMsg(err.response?.data?.message || "网络错误");
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles["header-left"]}>
            <h3>{changePassword ? "更改密码" : "编辑资料"}</h3>
            <div
              className={styles["change-form"]}
              onClick={() => setChangePassword(!changePassword)}
            >
              {changePassword ? "编辑资料" : "更改密码"}
            </div>
          </div>
          <div
            className={styles.close}
            onClick={() => {
              setSettingOpen(false);
            }}
          >
            <CgClose />
          </div>
        </div>

        {!changePassword ? (
          <form className={styles.form} onSubmit={handleSubmitEdit}>
            <input
              type="text"
              placeholder="名字"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSubmitPassword}>
            <div className={styles["form-row"]}>
              <input
                type={show ? "text" : "password"}
                placeholder="旧密码"
                value={passwordOld}
                onChange={(e) => setPasswordOld(e.target.value)}
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
                placeholder="新密码"
                value={passwordNew}
                onChange={(e) => setPasswordNew(e.target.value)}
                className={styles["form-input"]}
                required
              />
              <Icon2
                className={styles["show-icon"]}
                onClick={() => setShow2(!show2)}
              />
            </div>

            <div className={styles["form-row"]}>
              <input
                type={show3 ? "text" : "password"}
                placeholder="确认新密码"
                value={passwordNew2}
                onChange={(e) => setPasswordNew2(e.target.value)}
                className={styles["form-input"]}
                required
              />
              <Icon3
                className={styles["show-icon"]}
                onClick={() => setShow3(!show3)}
              />
            </div>

            <button type="submit">提交</button>
          </form>
        )}
        {responseMsg && <p className={styles["response-msg"]}>{responseMsg}</p>}
      </div>
    </div>
  );
};

export default AccountSetting;
