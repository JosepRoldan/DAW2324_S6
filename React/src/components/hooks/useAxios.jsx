import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url,method,data) => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const obtainData = async () => {
      try {
        if(method=="POST"){
        }else if(method=="GET"){
          const res = await axios.get(url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          });
        setResponse(res.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    obtainData();
  });
  return [response];
};

export default useAxios;