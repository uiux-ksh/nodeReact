import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
import {useNavigate} from "react-router-dom";

function LoginPage(props)   {
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandle = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password
    };

    dispatch(loginUser(body)).then((response) => {
      console.log(response);
      if (response.payload.loginSuccess) {
        navigate('/')
      } else {
        alert("비밀번호가 틀렸어요");
      }
    });
  };

  const RegisterPush = () => {

    navigate('/register')
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
      <form onSubmit={formSubmitHandler}>
        <fieldset style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "100px", display: "inline-block", fontSize: "16px", color: "#386eac" }}>Email</label>
          <input style={{ height: "50px", width: "500px", border: "1px solid #bbb", padding: "0 20px", borderRadius: "15px" }} type="email" value={Email} onChange={onEmailHandle} />
        </fieldset>
        <fieldset style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "100px", display: "inline-block", fontSize: "16px", color: "#386eac" }}>Password</label>
          <input style={{ height: "50px", width: "500px", border: "1px solid #bbb", padding: "0 20px", borderRadius: "15px" }} type="password" value={Password} onChange={onPassword} />
        </fieldset>
        <button
          style={{ marginLeft: "100px", width: "500px", height: "50px", background: "#386eac", color: "#ffffff", border: "1px solid #bbb", padding: "0 10px", borderRadius: "15px", cursor: "pointer" }}
        >
          Login
        </button>

        <div className="Register" style={{ display: "flex", marginLeft: "100px", justifyContent: "space-between", marginTop: "10px", letterSpacing: "-0.5px" }}>
          <span style={{ color: "#386eac" }}>회원이 아니시라고요 ??</span>{" "}
          <span style={{ color: "#386eac", cursor: "pointer" }} onClick={RegisterPush}>
            회원가입
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
