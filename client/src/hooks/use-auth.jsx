import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isFaild, setIsFaild] = useState(false);
  const [data, setData] = useState(null);

  const isLoggedIn = !!token;

  useEffect(() => {
    if (user.status == "loading") {
      setIsLoading(true);
    }
    if (user.status == "faild") {
      setIsFaild(true);
      setIsLoading(false);
    }
    if (user.status == "succeeded") {
      setIsLoading(false);
    }

    if (user.data) {
      setData(user.data);
    }
  }, [user]);

  return {
    isLoading,
    isLoggedIn,
    isFaild,
    user: data,
    token,
  };
};

export default useAuth;
