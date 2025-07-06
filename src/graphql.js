export const getMessagesQuery = `
  query GetMessages($room_id: ID!) {
    getMessages(room_id: $room_id) {
      room_id
      timestamp
      sender
      content
    }
  }
`;

export const onNewMessageSubscription = `
  subscription OnNewMessage($room_id: ID!) {
    onNewMessage(room_id: $room_id) {
      room_id
      timestamp
      sender
      content
    }
  }
`;

export const sendMessageMutation = `
  mutation SendMessage($room_id: ID!, $sender: String!, $content: String!) {
    sendMessage(room_id: $room_id, sender: $sender, content: $content) {
      room_id
      timestamp
      sender
      content
    }
  }
`;
export const listRoomsQuery = `
  query ListRooms {
    listRooms {
      room_id
    }
  }
`;

export const createRoomMutation = `
  mutation CreateRoom($room_id: ID!) {
    createRoom(room_id: $room_id) {
      room_id
    }
  }
`;