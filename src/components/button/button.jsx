import React, { memo } from "react";
import "./button.scss";

const Button = memo(({ className = "", children, ...props }) => {
  return (
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  );
});

export default Button;
