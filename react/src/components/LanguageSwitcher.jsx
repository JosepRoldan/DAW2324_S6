import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const [styleClass, setStyleClass ] = useState('');

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);

    let newStyleClass = '';
    if (newLang === 'eng') {
      newStyleClass = 'eng';
    } else if (newLang === 'cat') {
      newStyleClass = 'cat';
    } else if (newLang === 'esp') {
      newStyleClass = 'esp';
    }
    setStyleClass(newStyleClass);

    i18n.changeLanguage(newLang);
  };

  return (
    <select className={`default-style ${styleClass}`} value={i18n.language} onChange={handleLanguageChange}>
      <option value="eng">English</option>
      <option value="cat">Català</option>
      <option value="esp">Español</option>
    </select>
  );
};

export default LanguageSwitcher;
