import colors from "../../utils/colors";

const styles = {
  outerCircle: {
    width: 24,
    height: 24,
    border: "1px solid",
    borderRadius: '50%',
    position: 'relative',
    marginRight: 6,
  },
  innerCircle: {
    width: 14,
    height: 14,
    // border: "1px solid",
    // borderColor: colors.blackClaire,
    borderRadius: '50%',
    // backgroundColor: colors.blackClaire,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)"
  },
  flexCenter: { display: "flex", alignItems: 'center' }
};

export default styles;