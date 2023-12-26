import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { yellow } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";

const chatMessages = [
  {
    role: "user",
    content:
      "Hello, could you please provide the weather forecast for tomorrow?",
  },
  {
    role: "assistant",
    content: "Certainly! I'll check the weather forecast for you.",
  },
  { role: "assistant", content: "May I know your current location?" },
  { role: "user", content: "I'm in New York." },
  {
    role: "assistant",
    content: "Great! I'll fetch the weather forecast for New York tomorrow.",
  },
];

const Chat = () => {
  const auth = useAuth();

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
            height: "60vh",
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
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
          <div
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: 8,
              backgroundColor: "rgb(12,27,39)",
              display: "flex",
              margin: "auto",
            }}
          >
            <input
              type="text"
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
            <IconButton
              sx={{ ml: "auto", color: "#FFC100", paddingRight: "30px" }}
            >
              <IoMdSend />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
