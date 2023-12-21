import React, { useState, useEffect } from "react";
import { BodyBox, ListPeopleContainer, TypeBox, MessagesContainer, MessageInputField } from "./styles";
import { Typography } from "@mui/material";
import { IconComponent } from "../../Components/Icon";
import { PeopleChart } from "../../Components/PeopleChart";
import { ChatService } from "../../Services/wiredtalksService";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const roomCode = localStorage.getItem('room');
  const user = localStorage.getItem('user');

  console.log("mamamia: " + user)

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      // Lógica para enviar mensagem (pode ser implementada conforme necessário)
      console.log("Enviando mensagem:", message);
  
      await ChatService.sendMessage(roomCode, user, message);
  
      setMessage("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      // Adicione lógica para lidar com erros de envio de mensagem (por exemplo, exibir uma mensagem de erro para o usuário)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await ChatService.joinRoom(roomCode, user);
      console.log("user:" + user + "entro na sala:" + roomCode)
    };
  
    fetchData();
  }, [roomCode, user]);
  
  useEffect(() => {
    const handleReceivedMessage = (messageData) => {
      console.log('Mensagem recebida:', messageData);
      // Atualizar o estado ou fazer qualquer coisa com a mensagem recebida
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };
  
    ChatService.setupSocketListeners(handleReceivedMessage, user);
  
    return () => {
      // Lógica de limpeza, se necessário, ao desmontar o componente ou quando roomCode ou user mudam
      // Por exemplo, remover ouvintes ou realizar outras ações de limpeza
    };
  }, [roomCode, user]);
  

  return (
    <BodyBox>
      <div
        style={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <MessagesContainer>
          <Typography>
            Room - Code: {roomCode}
          </Typography>
          {messages.map((message, index) => (
            <div key={index}>
              <p>{message.user}: {message.message}</p>
            </div>
          ))}
        </MessagesContainer>
        <ListPeopleContainer>
          <p
            style={{
              margin: "10px"
            }}
          >
            Online:
          </p>
          <PeopleChart>

          </PeopleChart>
        </ListPeopleContainer>
      </div>
      <TypeBox>
        <MessageInputField
          variant="outlined"
          multiline
          rows={1}
          onChange={handleInputChange}
          value={message}
        />
        <IconComponent
          name="send"
          style={{
            color: "#6495ED",
            margin: "5px",
            cursor: "pointer"
          }}
          onClick={handleSendMessage}
        />
      </TypeBox>
    </BodyBox>
  );
};

export { ChatPage };
