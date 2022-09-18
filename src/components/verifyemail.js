import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAPI from "../services/userAPI";

const VerifyEmail = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.userid);
  useEffect(() => {
    UserAPI.verify_email(params.userid);
    // setTimeout(navigate("/login"), 2000);
  }, []);
  return (
    <>
      <h5>Xác nhận thành công</h5>
    </>
  );
};

export default VerifyEmail;
