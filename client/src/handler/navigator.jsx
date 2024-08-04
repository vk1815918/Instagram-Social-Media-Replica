import { useNavigate } from "react-router-dom";

export const CustomNavigator = ({ children, to, ...props }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(to || "/");
  };
  return (
    <div {...props} onClick={handleNavigate}>
      {children}
    </div>
  );
};
