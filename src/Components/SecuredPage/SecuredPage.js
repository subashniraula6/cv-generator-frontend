import React,{} from 'react';
import CheckAuth from '../Firestore/CheckAuth';
// import { useNavigate } from 'react-router-dom';

export default function SecuredPage() {
  const tokenExist = CheckAuth(); // Use the CheckAuth component

  // const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!tokenExist) {
  //         navigate("/login"); // Redirect to secured page if already authenticated
  //     }
  // }, [tokenExist, navigate]);
  return (
    <div>
      SecuredPage is here
    </div>
  );
}
