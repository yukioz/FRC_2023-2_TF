from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import join_room, leave_room, send, SocketIO, emit
import random
from string import ascii_uppercase
from flask_cors import CORS
from flask import jsonify
import json
from database.data import users, rooms, messages

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # caso precise
app.config["SECRET_KEY"] = "segredo"
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/", methods=["POST"])
def home():
    session.clear()
    data = request.json
    email = data.get("email")
    name = None
    code = data.get("code")
    password = data.get("password")
    create = data.get("create", True)

    if not email:
        return jsonify({"status": "error", "message": "missing fields"})

    if not code:
        return jsonify({"status": "error", "message": "missing fields"})

    # Verifica se existe um usuário com o e-mail e senha fornecidos
    user = next((user for user in users if user["email"] == email and user["senha"] == password), None)

    if user:
        name = user["nome"]
        print(f"Usuário {name} encontrado!")
    else:
        return jsonify({"status": "error", "message": "User not found"})
        # Faça o que precisa ser feito quando o usuário não é encontrado

    room = next((r for r in rooms if r["code"] == code), None)

    if not room:
        new_room = {
            "topic": "Custom Topic",  # Adapte conforme necessário
            "code": code,
            "id": len(rooms) + 1,
            "users": []
        }
        rooms.append(new_room)
        room = new_room
        print("Room criado!")

    return jsonify({"status": "success", "user": user})

@app.route("/room", methods=["POST"])
def room():
    data = request.json
    roomCode = data.get("roomCode")
    room = next((r for r in rooms if r["code"] == roomCode), None)

    if room is None or room not in rooms:
        return jsonify({"status": "error", "message": "Room not found ppp"})

    return jsonify({"status": "success", "message": "User is in the room", "room_info": room})

@socketio.on("message")
def message(data):
    roomCode = data.get("roomCode")
    user = data.get("user")
    msg = data.get("message")

    print(user)
    print(msg)
    print(roomCode)
    print(rooms)

    if user is None:
        print("User data is missing in the message event.")
        # return jsonify({"status": "error", "message": "No User"})

    user_obj = json.loads(user)
    
    content = {
        "user": user_obj.get("nome"),
        "message": msg
    }
    emit('message', content, room=roomCode)
    
    room = next((r for r in rooms if r["code"] == roomCode), None)

    if room:
        print(f"{user_obj.get('nome')} said: {msg}")
    else:
        print(f"Room {roomCode} not found.")

@socketio.on("join_room")
def connect(data):
    roomCode = data.get("roomCode")
    user = data.get("user")

    user_obj = json.loads(user)

    if not roomCode or not user:
        return jsonify({"status": "error", "message": "RoomCode or user missing"})

    room = next((r for r in rooms if r["code"] == roomCode), None)

    if not room:
        return jsonify({"status": "error", "message": "Room not found"})
    
    # Encontre o índice da sala dentro de rooms
    room_index = next((i for i, r in enumerate(rooms) if r["code"] == roomCode), None)

    if room_index is not None:
        user_email = user_obj.get("email")  # Corrigir para pegar o e-mail do usuário
        # Verifique se o usuário já está na lista antes de adicioná-lo
        if not any(user.get("email") == user_email for user in rooms[room_index]["users"]):
            join_room(roomCode)
            send({"user": user_obj.get("nome"), "message": "yukio has entered the room"}, to=roomCode)
            rooms[room_index]["users"].append(user_obj)
            print(f"{user_obj.get('nome')} joined room {roomCode}, users: {rooms[room_index]['users']}")
        else:
            print(f"User {user_obj.get('nome')} is already in the room")
    else:
        print("Room not found in rooms")

@socketio.on("disconnect")
def disconnect():
    room = session.get("room")
    name = session.get("name")
    leave_room(room)

    if room in rooms:
        rooms[room]["members"] -= 1
        if rooms[room]["members"] <= 0:
            del rooms[room]
    
    send({"name": name, "message": "has left the room"}, to=room)
    print(f"{name} has left the room {room}")

if __name__ == "__main__":
    socketio.run(app, debug=True)