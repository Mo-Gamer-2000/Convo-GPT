import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="LoginRobot.webp"
            alt="Robot"
            style={{ width: "200px", margin: "auto" }}
          />
          <img
            className="image-inverted-logo rotate"
            src="OpenAI.webp"
            alt="OpneAI"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", marginX: "auto" }}>
          <img
            src="CODE.webp"
            alt="Robot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMD ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px#64f3d5",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
