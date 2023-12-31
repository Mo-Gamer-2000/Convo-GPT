// Import necessary functions from Mongoose for database connection
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    try {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error) {
      console.error("Error sending chat request:", error);
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats!", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats Deleted Successfully!", { id: "deletechats" });
    } catch (error) {
      console.error("Error deleting chats:", error);
      toast.error("Error Occurred while deleting chats!", {
        id: "deletechats",
      });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats!", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Chats Loaded Successfully!", { id: "loadchats" });
        })
        .catch((err) => {
          console.error("Error loading chats:", err);
          toast.error("Error Occurred while loading chats.", {
            id: "loadchats",
          });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        marginTop: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            backgroundColor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            marginX: 3,
          }}
        >
          <Avatar
            sx={{
              marginX: "auto",
              marginY: 2,
              backgroundColor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography
            sx={{
              marginX: "auto",
              fontFamily: "Work Sans",
              textAlign: "center",
            }}
          >
            <u>Convo-GPT</u>, how may I assist you today?
          </Typography>
          <Typography
            sx={{
              marginX: "auto",
              fontFamily: "Work Sans",
              marginY: 4,
              padding: 3,
            }}
          >
            Feel free to ask any questions related to technology, economics, or
            any general inquiries you might have.
            <br />
            <u>Please refrain from sharing any personal data.</u>
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              marginY: "auto",
              color: "black",
              fontWeight: 700,
              borderRadius: 3,
              marginX: "auto",
              backgroundColor: yellow[600],
              ":hover": {
                backgroundColor: "white",
                transition: "0.5s",
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Convo-GPT - Powered by ChatGPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            // eslint-disable-next-line
            // @ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
          <div
            style={{
              width: "100%",
              borderRadius: 8,
              backgroundColor: "rgb(12,27,39)",
              display: "flex",
              margin: "auto",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "transparent",
                padding: "30px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
            <IconButton onClick={handleSubmit} sx={{ color: "#FFC100", mx: 1 }}>
              <IoMdSend />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
