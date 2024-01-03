import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p
          style={{
            fontSize: "30px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          All Rights Reserved.
          <span>
            <Link
              style={{ color: "gold" }}
              className="nav-link"
              to={"https://mern-portfolio-app-m8xr.onrender.com/"}
            >
              Moeez Abdul
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
