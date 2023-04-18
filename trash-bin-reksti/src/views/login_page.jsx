import { useState } from "react";
import FormInput from "./login";
import "./login.css"
import trelinLogo from "../assets/trelin.svg"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Masukkan Username Anda",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Masukkan Password Anda",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <img src={trelinLogo} style={{ height: 68, width: 259 }} alt="Trelin logo"/>
      <form onSubmit={handleSubmit}>
        <h1 margin:auto>Masuk ke Akun Anda</h1>
        <text margin:auto>Pantau dan kelola sampah secara mudah!</text>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button onClick={() => navigate('/map')}>Masuk</button>
      </form>
    </div>
  );
};

export default LoginPage;