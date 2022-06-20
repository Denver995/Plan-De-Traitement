import colors from "../../../utils/colors";

const styles = {
  modal: {
    width: "70rem",
  },

  examForm: {
    marginLeft: 40,
    marginRight: 40,
  },

  titleContainer: {
    alignItems: "center",
    marginLeft: "10px",
  },

  examTitle: {
    fontSize: "20px",
    letterSpacing: "0px",
    color: colors.blackClaire,
  },

  modelContainer: {
    marginLeft: "25px",
  },

  text: {
    fontSize: "14px",
    marginBottom: "4px",
    letterSpacing: "0px",
    color: colors.blackClaire,
  },

  selectLabel: {
    fontSize: "17px",
    color: colors.blackClaire,
    letterSpacing: 0,
    marginLeft: "5px",
  },

  positionContainer: {
    display: "flex",
    alignItems: "center",
  },

  examPosition: {
    fontSize: "17px",
    color: colors.blackClaire,
    marginLeft: "10px",
  },

  input: {
    fontSize: "20px",
    color: "#5D9AD4",
    borderColor: colors.borderColor,
  },

  buttonContainer: {
    marginTop: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5px",
  },

  cancelBtn: {
    fontSize: "27px",
    color: colors.primary,
    width: "210px",
    height: "59px",
    border: "3px solid #5D9AD4",
    borderRadius: "35px",
    //marginRight: "8%",
    textDecoration: "none",
    marginRight: 50
  },

  addBtn: {
    fontSize: "27px",
    color: colors.white,
    width: "210px",
    height: "59px",
    border: "3px solid #5D9AD4",
    borderRadius: "35px",
    textDecoration: "none",
  },
};

export default styles;
