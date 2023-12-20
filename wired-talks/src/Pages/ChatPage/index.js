import React, { useState } from "react";
import { BodyBox, ListPeopleContainer, TypeBox, MessagesContainer, MessageInputField } from "./styles";
// import { Typography, TextField, Button } from "@mui/material";
import { IconComponent } from "../../Components/Icon";

import { PeopleChart } from "../../Components/PeopleChart";

const ChatPage = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Lógica para enviar mensagem (pode ser implementada conforme necessário)
    console.log("Enviando mensagem:", message);
    setMessage("");
  };

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
