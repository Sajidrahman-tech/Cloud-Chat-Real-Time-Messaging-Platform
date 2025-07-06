import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  getMessagesQuery,
  onNewMessageSubscription,
  sendMessageMutation,
  listRoomsQuery,
  createRoomMutation
} from "../graphql";
import "../ChatStyles.css";

function HomePage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("messages");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const getUserInitials = (id) => {
    if (!id) return "U";
    const parts = id.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return id[0].toUpperCase();
  };

  const getRoomInitials = (roomName) => {
    if (!roomName) return "R";
    const words = roomName.split(/[-_\s]+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return roomName.slice(0, 2).toUpperCase();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getRoomColor = (roomName) => {
    const colors = [
      'linear-gradient(135deg, #EC4899, #BE185D)',
      'linear-gradient(135deg, #10B981, #059669)',
      'linear-gradient(135deg, #F59E0B, #D97706)',
      'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      'linear-gradient(135deg, #06B6D4, #0891B2)',
      'linear-gradient(135deg, #EF4444, #DC2626)'
    ];
    const index = roomName.length % colors.length;
    return colors[index];
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await API.graphql(graphqlOperation(listRoomsQuery));
        setRooms(res.data.listRooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.graphql(
          graphqlOperation(getMessagesQuery, { room_id: selectedRoom })
        );
        setMessages(res.data.getMessages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (selectedRoom) {
      fetchMessages();
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (!selectedRoom) return;
    const subscription = API.graphql(
      graphqlOperation(onNewMessageSubscription, { room_id: selectedRoom })
    ).subscribe({
      next: (msg) => {
        const newMsg = msg.value.data.onNewMessage;
        setMessages((prev) => [...prev, newMsg]);
      },
      error: (err) => console.error("Subscription error:", err)
    });
    return () => subscription.unsubscribe();
  }, [selectedRoom]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedRoom) return;
    const senderId = user?.attributes?.email || user?.username || "Anonymous";
    try {
      await API.graphql(
        graphqlOperation(sendMessageMutation, {
          room_id: selectedRoom,
          sender: senderId,
          content: newMessage
        })
      );
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;
    try {
      await API.graphql(
        graphqlOperation(createRoomMutation, { room_id: newRoomName })
      );
      const newRoom = { room_id: newRoomName };
      setRooms((prev) => [...prev, newRoom]);
      setSelectedRoom(newRoomName);
      setNewRoomName("");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCreateRoomKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateRoom();
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.room_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="login-container">
        <button
          className="login-button"
          onClick={() => Auth.federatedSignIn()}
        >
          Login to Chat
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="chat-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h3 className="sidebar-title">ChitChat</h3>
            <p className="room-count">{rooms.length} rooms available</p>
          </div>

          {/* <div className="nav-section">
            {["dashboard", "shipment", "tracking", "messages", "revenue", "maps"].map((item) => (
              <div
                key={item}
                className={`nav-item ${activeNavItem === item ? "active" : ""}`}
                onClick={() => setActiveNavItem(item)}
              >
                <div className="nav-icon">•</div>
                <span>{item.toUpperCase()}</span>
                {item === "messages" && (
                  <span className="room-badge">{messages.length}</span>
                )}
              </div>
            ))}
          </div> */}

          <div className="section-title">GROUP</div>
          <input
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search rooms..."
          />

          <div className="room-list">
            {filteredRooms.map((room) => (
              <button
                key={room.room_id}
                className={`room-item ${room.room_id === selectedRoom ? "active" : ""}`}
                onClick={() => setSelectedRoom(room.room_id)}
              >
                <div
                  className="room-avatar"
                  style={{ background: getRoomColor(room.room_id) }}
                >
                  {getRoomInitials(room.room_id)}
                </div>
                <div className="room-details">
                  <div className="room-name">{room.room_id}</div>
                  <div className="room-preview">
                    {messages.length} message{messages.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="new-room-section">
            <div className="new-room" style={{ flexWrap: "nowrap" }}>
              <input
                style={{ minWidth: 0 }}
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                onKeyPress={handleCreateRoomKeyPress}
                placeholder="New room name..."
              />
              <button
                className="create-room-btn"
                onClick={handleCreateRoom}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="chat-area" style={{ margin: 0, borderRadius: 0 }}>
          {selectedRoom ? (
            <>
              <div className="chat-header">
                <div className="chat-room-info">
                  <div className="chat-room-avatar">
                    {getRoomInitials(selectedRoom)}
                  </div>
                  <div className="room-details">
                    <h2>{selectedRoom}</h2>
                    <p className="room-status">{messages.length} message{messages.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                {/* <div className="user-info">
                  <div className="user-avatar">{getUserInitials(user?.username)}</div>
                  <span className="user-email">{user?.username}</span>
                  <button className="logout-button" onClick={() => Auth.signOut()}>Logout</button>
                </div> */}
              </div>
              <div className="message-list">
                {messages.length === 0 ? (
                  <div className="empty-chat">
                    <h3>No messages yet</h3>
                    <p>Start the conversation by sending a message!</p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const senderId = user?.attributes?.email || user?.username || "Anonymous";
                    const isOwn = msg.sender === senderId;
                    return (
                      <div
                        className={`message ${isOwn ? "self" : "other"}`}
                        key={`${msg.timestamp}-${index}`}
                      >
                        {!isOwn && (
                          <span className="message-sender">{msg.sender}</span>
                        )}
                        <div className="message-bubble">
                          <div className="message-content">{msg.content}</div>
                          <div className="message-time">{formatTime(msg.timestamp)}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="message-input-container">
                <div className="message-input">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                  />
                  <button
                    className="send-button"
                    onClick={handleSend}
                  >
                    ➤
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-chat">
              <h3>Welcome</h3>
              <p>Select a room to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
