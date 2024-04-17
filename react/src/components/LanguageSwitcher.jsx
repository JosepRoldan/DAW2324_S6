import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <select value={i18n.language} onChange={handleLanguageChange}>
      <option value="eng">🇱🇷 English</option>
      <option value="cat">🏴󠁥󠁳󠁣󠁴󠁿 Català</option>
      <option value="esp">🇪🇸 Español</option>
    </select>
  );
};

export default LanguageSwitcher;
