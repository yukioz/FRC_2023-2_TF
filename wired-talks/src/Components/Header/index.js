import React from "react";
import { Header } from "./styles";
import {Typography} from '@mui/material';

const HeaderComponent = () => {
  return (
    <Header>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
        Wired Talk's
      </Typography>
    </Header>
  );
};

export { HeaderComponent };
