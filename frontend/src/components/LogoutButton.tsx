import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-client";
import { useAppContext } from "../contexts/AppContext";

const LogoutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logged out successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={onClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
