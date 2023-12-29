import React, { FC } from "react";

interface NotFoundProps {
  message?: string;
  suggestion?: string;
}

const NotFound: FC<NotFoundProps> = ({
  message = "The page you're looking for might be under construction.",
  suggestion = "Please check the URL or try again later.",
}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.message}>{message}</p>
      <p style={styles.suggestion}>{suggestion}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  heading: {
    fontSize: "2em",
    color: "#d9534f", // Bootstrap's danger color
  },
  message: {
    fontSize: "1.2em",
    marginTop: "20px",
  },
  suggestion: {
    fontSize: "1em",
    marginTop: "10px",
    color: "#777",
  },
};

export default NotFound;
