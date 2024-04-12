import "./CreateForm.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../sectionTable/alert.scss";

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

  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (month.trim() === "") {
      isValid = false;
      newErrors.month = "Month is required";
    }

    if (
      month.trim() !== "January" &&
      month.trim() !== "February" &&
      month.trim() !== "March" &&
      month.trim() !== "April" &&
      month.trim() !== "June" &&
      month.trim() !== "July" &&
      month.trim() !== "August" &&
      month.trim() !== "September" &&
      month.trim() !== "October" &&
      month.trim() !== "November" &&
      month.trim() !== "December"
    ) {
      isValid = false;
      newErrors.month = "Month must be valid";
    }

    if (
      isNaN(parseFloat(income)) ||
      !isFinite(income) ||
      parseFloat(income) <= 0
    ) {
      isValid = false;
      newErrors.income = "Income must be a number greater than 0";
    }
    if (
      isNaN(parseFloat(expense)) ||
      !isFinite(expense) ||
      parseFloat(expense) <= 0
    ) {
      isValid = false;
      newErrors.expense = "Expense must be a number greater than 0";
    }

    if (isNaN(parseInt(year)) || !isFinite(year) || parseInt(year) <= 0) {
      isValid = false;
      newErrors.year = "Year must be a number greater than 0";
    }

    if (isValid) {
      handleCreate(month, income, expense, profit, year);
    } else {
      setErrors(newErrors);
    }
  };

  /**
   * Async function to handle creation of benefit data.
   *
   */
  const handleCreate = async (month, income, expense, profit, year) => {
    setAlert(false);
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
          setAlert(false);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        setAlert(false);
      })
      .finally(function () {
        setAlert(true);
        setMonth("");
        setIncome("");
        setExpense("");
        setProfit("");
        setYear("");
      });
  };

  return (
    <div class="bg-gray-100 flex items-center justify-left">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full">
        <div class="flex items-center space-x-2 mb-6">
          <h1 class="text-xl font-semibold">Create form for Profit</h1>
        </div>
        <p class="text-sm text-gray-600 mb-6">Insert the following data:</p>
        <form id="changePasswordForm" class="space-y-6">
          <div class="date-selector">
            <div class="month-selector">
              <label for="countries" class="text-sm font-medium text-gray-900">
                Month
              </label>
              <select
                id="countries"
                class="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>Select a month</option>
                <option value="JA">January</option>
                <option value="FE">February</option>
                <option value="MA">March</option>
                <option value="AP">April</option>
                <option value="JU">June</option>
                <option value="JU">July</option>
                <option value="AU">August</option>
                <option value="SE">September</option>
                <option value="OC">October</option>
                <option value="NO">November</option>
                <option value="DE">December</option>
              </select>
            </div>
            <div class="year-selector">
              <label for="year" class="text-sm font-medium text-gray-900">
                Year
              </label>
              <input
                type="text"
                id="year"
                class="year-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <div class="date-selector">
            <div className="month-selector">
              <label
                for="income"
                class="text-sm font-medium text-gray-700 block mb-2"
              >
                Income
              </label>
              <input
                type="text"
                id="income"
                class="income-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="year-selector">
              <label
                for="expenses"
                class="text-sm font-medium text-gray-700 flex mb-2"
              >
                Expenses
              </label>
              <input
                type="text"
                id="expenses"
                class="income-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <div id="passwordCriteria" class="text-sm space-y-2">
            <p class="text-red-500">Weak password. Must contain:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>At least 1 uppercase</li>
              <li>At least 1 number</li>
              <li>At least 8 characters</li>
            </ul>
          </div>
          <div class="flex justify-between">
            <button
              type="button"
              onclick="discardChanges()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              Discard
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
