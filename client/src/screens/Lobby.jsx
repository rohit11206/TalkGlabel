import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      {/* Header */}
      <h1 style={styles.header}>GlobelTaker</h1>

      {/* Lobby Form */}
      <div style={styles.lobbyContainer}>
        <h2 style={styles.lobbyTitle}>Lobby</h2>
        <form onSubmit={handleSubmitForm} style={styles.form}>
          <label htmlFor="email" style={styles.label}>
            Email ID
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <br />
          <label htmlFor="room" style={styles.label}>
            Room Number
          </label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={styles.input}
          />
          <br />
          <button style={styles.button}>Join</button>
        </form>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  header: {
    backgroundColor: "#333",
    color: "white",
    padding: "10px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  lobbyContainer: {
    margin: "20px auto",
    padding: "20px",
    maxWidth: "400px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  lobbyTitle: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    marginBottom: "8px",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    padding: "8px",
    width: "100%",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default LobbyScreen;
