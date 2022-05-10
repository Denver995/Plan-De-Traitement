import React, { useState, useEffect } from "react";
import { EuiButton } from "@elastic/eui";
import styles from "./style";
import colors from "../../../utils/colors";

const Button = ({ text, style, onClick, disable = false, fill = false }) => {
  const [btnStyles, setBtnStyles] = useState({});

  useEffect(() => {
    if (disable) {
      setBtnStyles({
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
        color: colors.secondary2,
      });
    } else {
      setBtnStyles({
        borderColor: colors.primary,
      });
    }
  }, [disable]);

  // <div>
  //   <button
  //     type="button"
  //     disabled={disable}
  //     className="btnHover"
  //     onClick={onClick}
  //     style={{
  //       ...styles.btn,
  //       ...btnStyles,
  //       ...style,
  //       backgroundColor: disable ?? colors.secondary,
  //     }}
  //   >
  //     <span>{text}</span>
  //   </button>
  //   <style jsx="true">
  //     {`
  //       .btnHover:hover {
  //         background-color: #ddeaf6;
  //       }
  //     `}
  //   </style>
  // </div>
  return (
    <EuiButton onClick={onClick} className="button_finished">
      {text}
    </EuiButton>
  );
};

export default Button;
