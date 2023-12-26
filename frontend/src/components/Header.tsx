import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="gold"
                to="/chat"
                text="Chat to Convo"
                textColor="black"
                
              />
              <NavigationLink
                bg="white"
                to="/"
                text="Logout"
                textColor="black"
                onClick={() => auth.logout()}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="white"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="gold"
                to="/signup"
                text="Signup"
                textColor="black"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
