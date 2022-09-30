import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandle = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onNameHandle = (e) => {
    setName(e.currentTarget.value);
  };

  const onConfirmPasswordHandle = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password
    };

    dispatch(registerUser(body)).then((response) => {
      console.log(response);
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("회원가입 형식에 맞게 입력해주세요.");
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
      <form onSubmit={formSubmitHandler}>
        <fieldset style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "120px", display: "inline-block", fontSize: "16px", color: "#386eac" }}>이메일</label>
          <input style={{ height: "50px", width: "500px", border: "1px solid #bbb", padding: "0 20px", borderRadius: "15px" }} type="email" value={Email} onChange={onEmailHandle} />
        </fieldset>
        <fieldset style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "120px", display: "inline-block", fontSize: "16px", color: "#386eac" }}>이름</label>
          <input style={{ height: "50px", width: "500px", border: "1px solid #bbb", padding: "0 20px", borderRadius: "15px" }} type="text" value={Name} onChange={onNameHandle} />
        </fieldset>

        <fieldset style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "120px", display: "inline-block", fontSize: "16px", color: "#386eac" }}>비밀번호</label>
          <input style={{ height: "50px", width: "500px", border: "1px solid #bbb", padding: "0 20px", borderRadius: "15px" }} type="password" value={Password} onChange={onPassword} />
        </fieldset>

        <fieldset style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "120px", display: "inline-block", fontSize: "16px", color: "#386eac" }}>비밀번호확인</label>
          <input
            style={{ height: "50px", width: "500px", border: "1px solid #bbb", padding: "0 20px", borderRadius: "15px" }}
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandle}
          />
        </fieldset>

        <button
          style={{ marginLeft: "120px", width: "500px", height: "50px", background: "#386eac", color: "#ffffff", border: "1px solid #bbb", padding: "0 10px", borderRadius: "15px", cursor: "pointer" }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
