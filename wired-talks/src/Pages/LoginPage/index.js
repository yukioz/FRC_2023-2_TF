import React, { useState } from "react";
import { BodyBox, LoginBox } from "./styles";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";
import { ChatService } from "../../Services/wiredtalksService";

const HomePage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("yukio@gmail.com");
  const [password, setPassword] = useState("senha123");
  const [room, setRoom] = useState("1234");

  // OnChanges
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleSubmit = async () => {
    // Aqui você pode lidar com a submissão do formulário usando os valores de email e senha
    console.log("Email:", email);
    console.log("Senha:", password);

    if (email && room) {
      const user = await ChatService.login(email, password, room);
      console.log("user:" + user);

      if (user) {
        localStorage.setItem('room', room)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/chat'); // Navegar para a página de chat
      } else {
        alert('Usuário não encontrado.');
      }
    } else {
      // Lógica para lidar com campos em branco ou outras validações
      alert('Nome e sala são obrigatórios.');
    }
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
          label="Sala"
          variant="outlined"
          type="text"
          required
          fullWidth
          value={room}
          onChange={handleRoomChange}
        />

        <TextField
          label="E-mail"
          variant="outlined"
          type="text"
          required
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />

        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          required
          fullWidth
          value={password}
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
