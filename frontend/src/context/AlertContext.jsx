/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import Alert from "../components/Alert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ type: "", message: "", visible: false, icon: null });

  const showAlert = (type, message, icon) => {
    setAlert({ type, message, visible: true, icon });
    setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {alert.visible && (
        <Alert.AlertRoot type={alert.type}>
          <Alert.AlertIcon icon={alert.icon} />
          <Alert.AlertText>{alert.message}</Alert.AlertText>
        </Alert.AlertRoot>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
