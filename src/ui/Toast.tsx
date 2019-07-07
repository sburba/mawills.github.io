import React, { useEffect, useState } from "react";
import "./Toast.css";

interface ToastProps {
  msg?: string;
}

export const SHOW_MS = 3000;

const Toast: React.FC<ToastProps> = props => {
  const [visible, setVisible] = useState(props.msg !== undefined);

  useEffect(() => {
    setVisible(props.msg !== undefined);
    const timeoutId = setTimeout(() => setVisible(false), SHOW_MS);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.msg]);

  const className = visible ? "Toast show" : "Toast";
  return (
    <div data-testid="toast" className={className}>
      {props.msg}
    </div>
  );
};

export default Toast;
