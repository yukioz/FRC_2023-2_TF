import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom"

// Pages
import { ChatPage } from '../Pages/ChatPage'
import { HomePage } from '../Pages/LoginPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Switch>
    </BrowserRouter>
  )
}

export {
  Routes
}