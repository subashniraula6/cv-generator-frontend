// CheckAuth.js
import { useState, useEffect } from 'react';


export default function CheckAuth() {
  const [tokenExist, setTokenExist] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const authToken = await localStorage.getItem('authToken');
        setTokenExist(!!authToken);
      } catch (error) {
        console.error('Error reading authToken from local storage:', error);
      }
    };

    checkToken();
  }, []);

  return tokenExist;
}
