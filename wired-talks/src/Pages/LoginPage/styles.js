import styled from "styled-components";

const BodyBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 30%;
  height: 40%;
  display: flex;
  background-color: rgb(241, 241, 241);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  box-shadow: 10px 10px 5px 0px rgba(99, 99, 99, 1);
  padding: 2%;
  gap: 10px;
`;

export { BodyBox, LoginBox };
