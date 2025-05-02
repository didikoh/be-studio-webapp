// src/components/Loading/Loading.tsx
import React from "react";
import styles from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>加载中...</p>
    </div>
  );
};

export default Loading;
