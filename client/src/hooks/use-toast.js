import { toast } from "react-toastify";

const useToast = () => {
  const showToast = (msg, type, timeout) => {
    toast[type](msg, { autoClose: timeout || 2000 });
  };
  return showToast ;
};

export default useToast;
