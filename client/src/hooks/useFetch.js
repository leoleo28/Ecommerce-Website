import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          headers: {
            xauthtoken: token,
          },
        });
        setData(res.data);
        let count = 0;
        for (let item of res.data.products) {
          count += item.productPrice;
        }
        setTotal(count.toFixed(2));
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
        headers: {
          xauthtoken: token,
        },
      });
      setData(res.data);
      let count = 0;
      for (let item of res.data.products) {
        count += item.productPrice;
      }
      setTotal(count.toFixed(2));
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch, total };
};

export default useFetch;
