import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const auth = useAuth();

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        backgroundColor: "#004d5661",
        marginY: 2,
        gap: 2,
      }}
    >
      <Avatar sx={{ marginLeft: 0 }}>
        <img src="Logo.webp" alt="Logo" width={"30px"} />
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{ display: "flex", padding: 2, backgroundColor: "#FFB100", gap: 2 }}
    >
      <Avatar sx={{ marginLeft: 0, backgroundColor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
