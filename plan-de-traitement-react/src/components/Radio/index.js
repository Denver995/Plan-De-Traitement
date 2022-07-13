import React, { useState } from "react";
import colors from "../../utils/colors";
import styles from "./styles";

/**
 * @todo Refactor Component
 */

const Radio = ({ onChange }) => {
  const [active, setActive] = useState(true);
  const [styleTrue, setStyleTrue] = useState({
    outerCircle: {},
    innerCircle: {},
    color: colors.blackClaire,
  });

  const [styleFalse, setStyleFalse] = useState({
    outerCircle: {
      borderColor: colors.primary,
    },
    innerCircle: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    color: colors.primary,
  });

  const handleTrue = () => {
    let isActive = true;
    if (active) {
      setStyleTrue({
        outerCircle: {
          borderColor: colors.primary,
        },
        innerCircle: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        color: colors.primary,
      });
      setStyleFalse({
        outerCircle: {},
        innerCircle: {},
        color: colors.blackClaire,
      });
    } else {
      setStyleTrue({
        outerCircle: {},
        innerCircle: {},
        color: colors.blackClaire,
      });
      setStyleTrue({
        outerCircle: {
          borderColor: colors.primary,
        },
        innerCircle: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        color: colors.primary,
      });
    }

    // setActive(!active);
    onChangeModel(isActive);
  };

  const handleFalse = () => {
    const isActive = false;
    if (!active) {
      setStyleFalse({
        outerCircle: {},
        innerCircle: {},
        color: colors.blackClaire,
      });
      setStyleTrue({
        outerCircle: {
          borderColor: colors.primary,
        },
        innerCircle: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        color: colors.primary,
      });
    } else {
      setStyleFalse({
        outerCircle: {
          borderColor: colors.primary,
        },
        innerCircle: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        color: colors.primary,
      });
      setStyleTrue({
        outerCircle: {},
        innerCircle: {},
        color: colors.blackClaire,
      });
    }
    // setActive(!active);
    onChangeModel(isActive);
  };

  React.useEffect(() => { }, [active]);

  const onChangeModel = (value) => {
    onChange(value);
  };

  return (
    <div
      className="radio-second-container"
      style={{ display: "flex", width: "100%", right: 0 }}
    >
      <div
        style={{ ...styles.flexCenter, marginRight: 37 }}
        onClick={handleTrue}
      >
        <div style={{ ...styles.outerCircle, ...styleTrue.outerCircle }}>
          <div
            style={{ ...styles.innerCircle, ...styleTrue.innerCircle }}
          ></div>
        </div>
        <div style={{ color: styleTrue.color }}>Oui</div>
      </div>
      <div style={styles.flexCenter} onClick={handleFalse}>
        <div style={{ ...styles.outerCircle, ...styleFalse.outerCircle }}>
          <div
            style={{ ...styles.innerCircle, ...styleFalse.innerCircle }}
          ></div>
        </div>
        <div style={{ color: styleFalse.color }}>Non</div>
      </div>
    </div>
  );
};

export default Radio;
