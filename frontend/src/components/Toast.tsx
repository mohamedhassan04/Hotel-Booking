import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};
const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type == "SUCCESS"
      ? "fixed top-4 right-4 p-2 z-50 bg-green-500 text-white p-2 rounded-md max-w-md"
      : "fixed top-4 right-4 p-2 z-50 bg-red-500 text-white p-2 rounded-md max-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
