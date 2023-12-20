// styles.js

import styled from "styled-components";
import { Box, Button, TextField } from "@mui/material";

const BodyBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListPeopleContainer = styled(Box)`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: lightgray;
  padding: 10px;
`;

const MessagesContainer = styled(Box)`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
`;

const TypeBox = styled(Box)`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const MessageInputField = styled(TextField)`
  && {
    background-color: white;
    border-radius: 15px;
    height: auto;
    width: 70%;
  }
`;

export {
  BodyBox,
  TypeBox,
  MessagesContainer,
  ListPeopleContainer,
  MessageInputField,
};
