import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";

// Define the structure of a toast message
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// Define the structure of the AppContext
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLogged: Boolean;
};

// Create a context for AppContext with an initial value of 'undefined'
const AppContext = React.createContext<AppContext | undefined>(undefined);

// Create a provider component for the AppContext
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  return (
    // Provide the context value with a function to log toast messages
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLogged: !isError,
      }}
    >
      {/* Render the children with the toast message state */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the AppContext
export const useAppContext = () => {
  // Use the useContext hook to retrieve the AppContext value
  const context = useContext(AppContext);
  // Return the context as AppContext
  return context as AppContext;
};
