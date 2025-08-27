import React from "react";

const Logout = () => {
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('X-User-Role');

    console.log('Logged out successfully. localStorage cleared.');

  return (
    alert("You have been logged out.")
  );
};

export default Logout;