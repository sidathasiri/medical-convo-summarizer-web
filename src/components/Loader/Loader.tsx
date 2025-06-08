import React from "react";
import "./Loader.css";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  message = "Loading...",
}) => {
  const sizes = {
    small: { container: "100px", spinner: "30px" },
    medium: { container: "150px", spinner: "40px" },
    large: { container: "200px", spinner: "50px" },
  };

  return (
    <div className="loader-container" style={{ height: sizes[size].container }}>
      <div
        className="loader-spinner"
        style={{
          width: sizes[size].spinner,
          height: sizes[size].spinner,
        }}
      />
      {message && <p className="loader-text">{message}</p>}
    </div>
  );
};
