import colors from "../../utils/colors";

const styles = {
  outerCircle: {
    width: 25,
    height: 25,
    border: "1px solid",
    borderRadius: '50%',
    position: 'relative',
    marginRight: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  innerCircle: {
    width: 15,
    height: 15,
    // border: "1px solid",
    // borderColor: colors.blackClaire,
    borderRadius: '50%',
    // backgroundColor: colors.blackClaire,
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: "translate(-50%, -50%)"
  },
  flexCenter: { display: "flex", alignItems: 'center' }
};

export default styles;