import "./CreateForm.css";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
        navigate('/profit');
      });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-left">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="flex items-center space-x-2 mb-6">
          <h1 className="text-xl font-semibold">Create form for Profit</h1>
        </div>
        <p className="text-sm text-gray-600 mb-6">Insert the following data:</p>
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
                <option defaultValue>Select a month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="year-selector">
              <label htmlFor="year" className="text-sm font-medium text-gray-900">
                Year
              </label>
              <input
                type="text"
                id="year"
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
                Income
              </label>
              <input
                type="text"
                id="income"
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
                Expenses
              </label>
              <input
                type="text"
                id="expenses"
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
               <li>{errors.month}</li>
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
            <Link to={"/profit"} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300">
            Discard
            </Link>
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              onClick={() => validate()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
