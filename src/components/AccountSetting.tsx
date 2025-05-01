import React from "react";
import { CgClose } from "react-icons/cg";
import "./AccountSetting.css";

const AccountSetting = ({setSettingOpen}:any) => {
  return (
    <div className="account-setting-overlay">
      <div className="account-setting-container">
        <div className="account-setting-header">
          <h3>编辑资料</h3>
          <div className="account-setting-close" onClick={() => {setSettingOpen(false)}}>
            <CgClose />
          </div>
        </div>

        <form className="account-setting-form">
          <div className="account-setting-form-item">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="account-setting-form-item">
            <label htmlFor="phone">Phone number</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className="account-setting-form-item">
            <label htmlFor="birthday">Birthday</label>
            <input type="date" id="birthday" name="birthday" />
          </div>
          <div className="account-setting-form-item">
            <label htmlFor="profilePic">Profile Picture</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AccountSetting;
