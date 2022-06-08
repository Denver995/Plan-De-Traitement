import React, { useState } from "react";
import styles from "./styles";
import colors from "../../utils/colors";

/**
 * @todo Refactor Component
 */

const Radio = ({ onChange }) => {
  const [active, setActive] = useState(true);
  const [styleTrue, setStyleTrue] = useState({
    outerCircle: {},
    innerCircle: {},
    color: colors.blackClaire
  });

  const [styleFalse, setStyleFalse] = useState({
    outerCircle: {
      borderColor: colors.primary,
    },
    innerCircle: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    color: colors.primary
  });

  const handleTrue = () => {
    if(active) {
      setStyleTrue({
        outerCircle: {
          borderColor: colors.primary,
        },
        innerCircle: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        color: colors.primary
      })
      setStyleFalse({
        outerCircle: {},
        innerCircle: {},
        color: colors.blackClaire
      })
    } else {
      setStyleTrue({
        outerCircle: {},
        innerCircle: {},
        color: colors.blackClaire
      });
      setStyleTrue({
        outerCircle: {
          borderColor: colors.primary,
        },
        innerCircle: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        color: colors.primary
      })
    }
      console.log("active: ", active);

    setActive(!active);
    onChangeModel();
  }

  const handleFalse = () => {
    if(!active) {
      setStyleFalse({
        outerCircle: {
          borderColor: colors.primary,
        },
        innerCircle: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        color: colors.primary
      })
      setStyleTrue({
        outerCircle: {},
        innerCircle: {},
        color: colors.blackClaire
      })
    }else{
      setStyleFalse({
        outerCircle: {},
        innerCircle: {},
        color: colors.blackClaire
      });
      setStyleTrue({
        outerCircle: {
          borderColor: colors.primary,
        },
        innerCircle: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        color: colors.primary
      })
    }
    setActive(!active);
    onChangeModel()
  }

  React.useEffect(() => {

  }, [active]);

  const onChangeModel = () => {
    onChange(active);
  }

  return (
    <div style={{ display: "flex"}}>
      <div style={{...styles.flexCenter, marginRight: 37}} onClick={handleTrue}>
        <div style={{...styles.outerCircle, ...styleTrue.outerCircle}}>
          <div style={{...styles.innerCircle, ...styleTrue.innerCircle}}></div>
        </div>
        <div style={{ color: styleTrue.color}}>Oui</div>
      </div>
      <div style={styles.flexCenter} onClick={handleFalse}>
        <div style={{...styles.outerCircle, ...styleFalse.outerCircle}}>
          <div style={{...styles.innerCircle, ...styleFalse.innerCircle}}></div>
        </div>
        <div style={{ color: styleFalse.color}}>Non</div>
      </div>
    </div>
  );
};

export default Radio;
