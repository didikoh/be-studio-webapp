import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

i18n
  .use(LanguageDetector)  // 👈 自动检测用户语言
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: "en", // 检测不到时默认英语
    interpolation: { escapeValue: false },
    detection: {
      // 可选配置：可自动从浏览器/HTML/localStorage等多方式检测
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"], // 用户手动切换后会自动记住
    }
  });

export default i18n;
