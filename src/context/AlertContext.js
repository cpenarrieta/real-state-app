import React, { useContext, useState, useMemo } from "react";

const AlertContext = React.createContext();

const useAlert = () => useContext(AlertContext);

function AlertProvider({ children }) {
  const [showAlert, setShowAlert] = useState(false);
  const value = useMemo(() => ({ showAlert, setShowAlert }), [
    showAlert,
    setShowAlert,
  ]);

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
}

export { useAlert, AlertProvider };
