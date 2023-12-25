import { Avatar, Box, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { yellow } from "@mui/material/colors";

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
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" } }}>
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
          <Typography sx={{ marginX: "auto", fontFamily: "Work Sans" }}>
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
            <u>Kindly refrain from sharing any personal data.</u>
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
                backgroundColor: yellow.A700,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
