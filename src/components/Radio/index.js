import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { setActive } from "../../redux/commons/actions";
import colors from "../../utils/colors";
import styles from "./styles";

/**
 * @todo Refactor Component
 */

const Radio = ({ onChange, active }) => {
  const dispatch = useDispatch();
  const deactivate = {
    outerCircle: {},
    innerCircle: {},
    color: colors.blackClaire,
  };

  const activate = {
    outerCircle: {
      borderColor: colors.primary,
    },
    innerCircle: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    color: colors.primary,
  };

  const [styleTrue, setStyleTrue] = useState(active ? activate : deactivate);

  const [styleFalse, setStyleFalse] = useState(active ? deactivate : activate);

  const handleTrue = () => {
    let isActive = true;
    dispatch(setActive(true));
    setStyleTrue(activate);
    setStyleFalse(deactivate);

    // setActive(!active);
    onChangeModel(isActive);
  };

  const handleFalse = () => {
    const isActive = false;
    dispatch(setActive(false));
    setStyleFalse(activate);
    setStyleTrue(deactivate);

    // setActive(!active);
    onChangeModel(isActive);
  };

  React.useEffect(() => {}, [active]);

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

const mapStateToProps = ({ CommonReducer }) => ({
  active: CommonReducer.active,
});

export default connect(mapStateToProps)(Radio);
