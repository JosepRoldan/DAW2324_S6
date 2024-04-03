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
    <div className="popup">
      <div className="popup-inner">
        {alertSucces && (
          <main>
            <section>
              <div className="alert alert-2-success">
                <h3 className="alert-title">Succes</h3>
                <p className="alert-content">Data edited correctly</p>
              </div>
            </section>
          </main>
        )}

    {alertError && (
          <main>
            <section>
              <div className="alert alert-1-warning">
                <h3 className="alert-title">Error</h3>
                <p className="alert-content">Something went wrong</p>
              </div>
            </section>
          </main>
        )}

    {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            i
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Form Edition</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              Edit form for Benefits
            </p>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              />
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Year"
                value={year}
                onChange={(e) => setExpense(e.target.value)}
              />
              <label className="labels">Profit</label>
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder={profit}
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
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
