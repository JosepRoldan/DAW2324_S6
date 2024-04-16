import "./EditForm.css";
import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import "../sectionTable/alert.scss";

const EditForm = () => {
  const [alertSucces, setAlertSucces] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [idBenefit, setId] = useState("");
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [year, setYear] = useState("");
  var [profit, setProfit] = useState("");
  const [loading, setLoading] = useState(false); 
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
  const [errors, setErrors] = useState({});

  profit = income - expense;
  let { id } = useParams();

  useEffect(() => {
    getFields(id);
  }, []);

  /**
   * A function to retrieve fields based on the given ID.
   *
   * @param {number} id - the ID used to retrieve the fields
   * @return {Promise<void>} a Promise that resolves when the fields are retrieved
   */
  const getFields = async (id) => {
    setLoading(true); 
    try {
      const url =`${import.meta.env.VITE_API_URL}/getOneBenefit/${id}`;
      const response = await axios.get(url);
      console.log(response.data);
      setId(response.data.id);
      setMonth(response.data.month);
      setIncome(response.data.income);
      setExpense(response.data.expense);
      setProfit(response.data.profit);
      setYear(response.data.year);

    } catch (error) {
      console.error('Error deleting resource:', error);
    } finally {
      setLoading(false); 
    }
  };

  /**
   * Function to validate input data for month, income, expense, and year.
   *
   * @return {void} 
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

      if (isValid) {
        handleUpdate(idBenefit, month, income, expense,profit, year);
    }else{
      setErrors(newErrors);
    }
};

  /**
   * An asynchronous function to handle the update of a benefit with the given parameters.
   *
   * @param {string} idBenefit - The ID of the benefit to be updated
   * @param {string} month - The month for the update
   * @param {number} income - The income for the update
   * @param {number} expense - The expense for the update
   * @param {number} year - The year for the update
   * @param {number} profit - The profit for the update
   */
  const handleUpdate = async (idBenefit, month, income, expense,profit, year) => {
    setAlertSucces(false);
    const url =`${import.meta.env.VITE_API_URL}/UpdateBenefit`;
    try {
      const response = await axios.post(url, {
        idBenefit: idBenefit,
        month: month,
        income: income,
        expense: expense,
        profit: profit,
        year: year
      });
  
      if (response.status === 200) {
      }
    } catch (error) {
      setAlertError(true);
      console.error("Error:", error);
    } finally {
      setAlertSucces(true);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-left">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <div className="flex items-center space-x-2 mb-6">
        <h1 className="text-xl font-semibold">Update form for Profit</h1>
      </div>
      <p className="text-sm text-gray-600 mb-6">Modify the following data:</p>
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
              <option defaultValue>{month}</option>
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
              value={year}
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
              value={income}
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
              value={expense}
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
          <Link to={"/benefits"} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300">
          Discard
          </Link>
          <button
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            onClick={() => validate()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EditForm;
