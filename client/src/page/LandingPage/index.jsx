import axios from "axios";
import { useNavigate } from "react-router-dom";

const LandingPage = (props) => {
  const navigate = useNavigate();
  const LogOutHandle = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("로그아웃 하는데 실패 했습니다.");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <h2>랜딩페이지입니다.</h2>
      <button onClick={LogOutHandle}>로그아웃</button>
    </div>
  );
};

export default LandingPage;
