import react, { useEffect, useState } from 'react'
import axios from "axios";
import { API_URL } from "./config/contansts";

const Test = () => {
    const [test, setTest] = useState([]);

    useEffect(() => {
        fetchFaqData1();
      }, []);
    
      const fetchFaqData1 = () => {
        axios
          .get(`${API_URL}/api/faq/user`)
          .then((res) => {
            setTest(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      };

    return(
        <>
        {test.map((item, index) => (
            <div key={index}></div>
        ))}
        </>
    )
}

export default Test;