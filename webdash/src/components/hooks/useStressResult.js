import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";


const useStressResults = (userId) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  // Function to fetch results
  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
        const response = await fetch("/api/getresult", {
            method: "POST", // Using POST to send userId in the body
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });
      if (!response.ok) {
        throw new Error("Failed to fetch stress results");
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch results when the hook is first used
  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return { results, loading, error, refetch: fetchResults };
};

export default useStressResults;
