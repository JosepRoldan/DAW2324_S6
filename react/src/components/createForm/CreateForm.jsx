import "./CreateForm.css";
import React, { useState } from "react";
import {Link } from "react-router-dom";
import axios from "axios";
import "../sectionTable/alert.scss";
/**
 * Function for creating a form.
 *
 * @param {Object} section - the section for which the form is created
 * @return {JSX.Element} the form component
 */
const CreateForm = ({ section }) => {
  //Declaramos variables
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

  /**
   * Function to validate the input values for month, income, and expense.
   */
  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (month.trim() === "") {
      isValid = false;
      newErrors.month = "Month is required";
    }
    
   if (month.trim() !== 'January' && month.trim() !== 'February' && month.trim() !== 'March' && month.trim() !== 'April' && month.trim() !== 'June' && month.trim() !== 'July' && month.trim() !== 'August' && month.trim() !== 'September' && month.trim() !== 'October' && month.trim() !== 'November' && month.trim() !== 'December') {
        isValid = false;
        newErrors.month = "Month must be valid";
    }
   
    if (isNaN(parseFloat(income)) || !isFinite(income) || parseFloat(income) <= 0) {
      isValid = false;
      newErrors.income = "Income must be a number greater than 0";
    }
    if (isNaN(parseFloat(expense)) || !isFinite(expense) || parseFloat(expense) <= 0) {
      isValid = false;
      newErrors.expense = "Expense must be a number greater than 0";
    }


    if (isNaN(parseInt(year)) || !isFinite(year) || parseInt(year) <= 0) {
      isValid = false;
      newErrors.year = "Year must be a number greater than 0";
    }

    if(isValid){
      handleCreate(month, income, expense, profit, year);
    }else{
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
    const url =`${import.meta.env.VITE_API_URL}/createBenefit`;
    await axios({
      method: "POST",
      url: url,
      data: { month, income, expense, profit, year},
    })
      .then(function (response) {
        if (response.status === 200) {
          console.log("Data inserted correctly");
        }

        if(response.status === 409) {
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
    <div className="popup">
    <div className="popup-inner">
      {alert && (
        <main>
          <section>
            <div className="alert alert-2-success">
              <h3 className="alert-title">Success</h3>
              <p className="alert-content">Data inserted correctly</p>
            </div>
          </section>
        </main>
      )}
      <div className="flex items-center space-x-5">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          i
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
          <h2 className="leading-relaxed">Form Creation</h2>
          <p className="text-sm text-gray-500 font-normal leading-relaxed">
            Create a form for Benefits
          </p>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <div className="flex flex-col">
            {errors.month && (
              <div id="month-error" className="error" role="alert">
                {errors.month}
              </div>
            )}
            <label htmlFor="month" className="labels">Month</label>
            <input
              type="text"
              id="month"
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            {errors.income && (
              <div id="income-error" className="error" role="alert">
                {errors.income}
              </div>
            )}
            <label htmlFor="income" className="labels">Income</label>
            <input
              type="number"
              id="income"
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="5000.00"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            {errors.expense && (
              <div id="expense-error" className="error" role="alert">
                {errors.expense}
              </div>
            )}
            <label htmlFor="expense" className="labels">Expense</label>
            <input
              type="number"
              id="expense"
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="3000.00"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
            <label htmlFor="year" className="labels">Year</label>
            <input
              type="number"
              id="year"
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="2024"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <label htmlFor="profit" className="labels">Profit</label>
            <input
              type="number"
              id="profit"
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="1500.500"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="pt-4 flex items-center space-x-4">
          <Link
            to="/benefits"
            className="buttonDelete flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
          >
            Cancel
          </Link>
          <button
            className="buttonCreate flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
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
