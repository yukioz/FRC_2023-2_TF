import React, { useState } from "react";
import { BodyBox, LoginBox } from "./styles";
import { useNavigate } from "react-router-dom";

import { Typography, Button, TextField } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Aqui você pode lidar com a submissão do formulário usando os valores de email e senha
    console.log("Email:", email);
    console.log("Senha:", password);

    navigate("/chat")
  };

  return (
    <BodyBox>
      <LoginBox>
        <Typography
          variant="h2"
          component="div"
          sx={{ margin: "10px", fontWeight: "bold" }}
        >
          Login
        </Typography>
        <TextField
          label="E-mail"
          variant="outlined"
          type="email"
          required
          fullWidth
          onChange={handleEmailChange}
        />

        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          required
          fullWidth
          onChange={handlePasswordChange}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "black", color: "white" }}
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </LoginBox>
    </BodyBox>
  );
};

export { HomePage };
