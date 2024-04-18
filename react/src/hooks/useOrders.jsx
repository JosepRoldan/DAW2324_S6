import { useEffect, useState } from "react";

// Custom hook to fetch orders data
const useOrdersData = (url) => {
  // State to store the fetched data
  const [rowData, setRowData] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to store any potential error during the fetch
  const [error, setError] = useState(null);

  // useEffect to perform the data fetching when the component mounts or when the URL changes
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Send a fetch request to the provided URL
        const response = await fetch(url);

        // Check if the response is successful (status code 2xx)
        if (response.ok) {
          // Parse the response body as JSON
          const data = await response.json();
          // Update the state with the fetched data
          setRowData(data);
        } else {
          // If the response is not successful, set an error state with the error message
          setError(
            new Error(`Failed to fetch data. Status: ${response.status}`)
          );
        }
      } catch (error) {
        // If an error occurs during the fetch, set the error state
        setError(error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [url]); // useEffect dependency array includes the URL, so it will refetch when the URL changes

  // Return an object containing the fetched data, loading status, and error
  return { rowData, loading, error };
};

// Export the custom hook
export default useOrdersData;
