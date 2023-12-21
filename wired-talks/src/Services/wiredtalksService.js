import io from 'socket.io-client';


const baseUrl = 'http://localhost:5000';  // Substitua pela URL do seu servidor Flask

const socket = io(baseUrl);

const ChatService = {
  login: async (email, password, code) => {
    try {
      const response = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, code }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.status === "success") {
        socket.emit('connect_to_room', { room: code, email });
        return responseData.user
      } else {
        return null
      }
    } catch (error) {
      console.error('Login error:', error);
    }

    return 0
  },

  joinRoom: async (roomCode, user) => {
    socket.emit('join_room', {roomCode: roomCode, user: user});
  },

  getRoomInfo: async (roomCode) => {
    try {
      const response = await fetch(`${baseUrl}/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomCode }),
      });

      if (response.ok) {
        const responseData = await response.json();

        console.log("muahahah")
        console.log(responseData)

        if (responseData.status === "success") {
          const roomInfo = responseData.room_info;
          console.log("Room Info:", roomInfo);
          // Faça o que for necessário com as informações da sala
          return roomInfo;
        } else {
          console.error('Error:', responseData.message);
        }
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Get room info error:', error);
    }
  },


  setupSocketListeners: (handleMessageCallback, currentUser) => {
    socket.on('message', (messageData) => {
      // Verifica se o remetente não é o usuário atual
      if (messageData.user !== currentUser) {
        handleMessageCallback(messageData);
      }
    });

    // Adicione outros ouvintes de eventos, se necessário
  },

  
  sendMessage: (roomCode, user, message) => {
    // Envia a mensagem para o servidor via Socket.IO
    socket.emit('message', { roomCode, user, message });
  },

  disconnect: () => {
    // Desconecta do socket quando necessário
    socket.disconnect();
  },
};

export {ChatService};
