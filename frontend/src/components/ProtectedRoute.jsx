import React from 'react';
import { Routes,Route, Navigate } from 'react-router-dom';

// const ProtectedRoute =({child}) => (
//     // <Route {...rest} render={(props) => (
//     //     sessionStorage.getItem('userLoggedIn')!=null
//     //         ? <Component {...props} />
//     //         : <Navigate to='/login' />
//     // )} />

//     if (!user) {
//         return <Navigate to="/landing" replace />;
//       }
    
//       return children;
//     };
const ProtectedRoute = ({ children }) => {
    if (sessionStorage.getItem('userLoggedIn')==null) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

export default ProtectedRoute;
