import colors from "../../../utils/colors";

const styles = {
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  modal: { width: "70rem", backgroundColor: colors.primaryLight },
  addBtn: {
    fontSize: 27,
    color: colors.white,
    width: 235,
    height: 49,
    borderColor: colors.darkBlue,
    borderRadius: 35,
    textDecoration: "none",
    backgroundColor: colors.darkBlue,
  },

  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0px 50px 0px",
  },
};

export default styles;
