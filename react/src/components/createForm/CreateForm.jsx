import "./CreateForm.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../sectionTable/alert.scss";
import Spinner from "../Spinner";
import { useTranslation } from "react-i18next";


/**
 * Function for creating a form.
 *
 * @param {Object} section - the section for which the form is created
 * @return {JSX.Element} the form component
 */
const CreateForm = ({ section }) => {
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [year, setYear] = useState("");
  var [profit, setProfit] = useState("");
  profit = income - expense;
  const navigate = useNavigate();

  const [loadingForm, setLoadingForm] = useState(false);

  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { t } = useTranslation();
  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (month.trim() === "") {
      isValid = false;
      newErrors.month = t("Month is required");
    }

    if (
      isNaN(parseFloat(income)) ||
      !isFinite(income) ||
      parseFloat(income) <= 0
    ) {
      isValid = false;
      newErrors.income = t("Income must be a number greater than 0");
    }
    if (
      isNaN(parseFloat(expense)) ||
      !isFinite(expense) ||
      parseFloat(expense) <= 0
    ) {
      isValid = false;
      newErrors.expense = t("Expense must be a number greater than 0");
    }

    if (isNaN(parseInt(year)) || !isFinite(year) || parseInt(year) <= 0) {
      isValid = false;
      newErrors.year = t("Year must be a number greater than 0");
    }


    if (isValid) {
      handleCreate(month, income, expense, profit, year);
    } else {
      setErrors(newErrors);
      setLoadingForm(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setLoadingForm(true);
      validate();
    }

    if (event.key === 'Escape') {
      navigate('/profit');
    }
  };

  /**
   * Async function to handle creation of benefit data.
   *
   */
  const handleCreate = async (month, income, expense, profit, year) => {
    console.log(month, income, expense, profit, year);
    const url = `${import.meta.env.VITE_API_URL}/createBenefit`;
    await axios({
      method: "POST",
      url: url,
      data: { month, income, expense, profit, year },
    })
      .then(function (response) {
        if (response.status === 200) {
          console.log("Data inserted correctly");
        }

        if (response.status === 409) {
          console.log("Year already exists");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      })
      .finally(function () {
        setLoadingForm(false);
        navigate('/profit');
      });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-left">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="flex items-center space-x-2 mb-6">
          {loadingForm && (
            <div className="mr-2">
              <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-black border-4"></div>
            </div>
          )}
          <h1 className="text-xl font-semibold">{t("Create form for Profit")}</h1>
        </div>
        <p className="text-sm text-gray-600 mb-6">{t("Insert the following data:")}</p>
        <div className="space-y-6">
          <div className="date-selector">
            <div className="month-selector">
              <label htmlFor="countries" className="text-sm font-medium text-gray-900">
                Month
              </label>
              <select
                id="countries"
                className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setMonth(e.target.value)}
              >
                <option defaultValue>{t("Select a month")}</option>
                <option value="January">{t("January")}</option>
                <option value="February">{t("February")}</option>
                <option value="March">{t("March")}</option>
                <option value="April">{t("April")}</option>
                <option value="June">{t("June")}</option>
                <option value="July">{t("July")}</option>
                <option value="August">{t("August")}</option>
                <option value="September">{t("September")}</option>
                <option value="October">{t("October")}</option>
                <option value="November">{t("November")}</option>
                <option value="December">{t("December")}</option>
              </select>
            </div>
            <div className="year-selector">
              <label htmlFor="year" className="text-sm font-medium text-gray-900">
                Year
              </label>
              <input
                type="text"
                id="year"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => setYear(e.target.value)}
                className="year-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <div className="date-selector">
            <div className="month-selector">
              <label
                htmlFor="income"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                {t("Income")}
              </label>
              <input
                type="text"
                id="income"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => setIncome(e.target.value)}
                className="income-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="year-selector">
              <label
                htmlFor="expenses"
                className="text-sm font-medium text-gray-700 flex mb-2"
              >
                {t("Expenses")}
              </label>
              <input
                type="text"
                id="expenses"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => setExpense(e.target.value)}
                className="income-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <div id="passwordCriteria" className="text-sm space-y-2">
            <ul className="list-disc pl-5 space-y-1 text-red-500">
              {errors.income && (
                <li>{errors.income}</li>
              )}
              {errors.month && (
                <li>{t(errors.month)}</li>
              )}
              {errors.expense && (
                <li>{errors.expense}</li>
              )}
              {errors.year && (
                <li>{errors.year}</li>
              )}
            </ul>

          </div>
          <div className="flex justify-between">
            <Link to={"/profit"}
              class="inline-block bg-gray-700 hover:bg-gray-900 rounded-full text-white border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
            >
              {t("Discard")}
            </Link>
            <button
              class="inline-block bg-blue-900 hover:bg-blue-800 rounded-full text-white border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
              onClick={() => validate()}
            >
              {t("Create")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
