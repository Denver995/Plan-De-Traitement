import colors from "../../../utils/colors";

const styles = {
  modal: {
    width: 1361,
    minHeight: 566
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
    marginTop: "4%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5px",
  },

  cancelBtn: {
    fontSize: "27px",
    color: colors.primary,
    width: "210px",
    // paddingLeft : "20px",
    // paddingRight : "20px",
    height: "48px",
    border: "3px solid #5D9AD4",
    borderRadius: "35px",
    //marginRight: "8%",
    textDecoration: "none",
    marginRight: 50,
  },

  addBtn: {
    fontSize: "27px",
    // paddingLeft : "20px",
    // paddingRight : "20px",
    color: colors.white,
    width: "210px",
    height: "48px",
    border: "3px solid #5D9AD4",
    borderRadius: "35px",
    textDecoration: "none",
  },

  btnDisabled: {
    fontSize: "27px",
    color: colors.white,
    // paddingLeft: "20px",
    // paddingRight: "20px",
    width: "210px",
    height: "48px",
    borderRadius: "35px",
    textDecoration: "none",
    background: colors.lightGray,
  },

  activated: {
    background: "#134058",
    fontSize: 27,
    width: 235,
    height: 49,
    boxShadow: "3px 3px 6px #00000029",
    borderRadius: 32,
    borderColor: "#134058",
    color: colors.white,
  },

  deactivated: {
    background: colors.lightGray,
    fontSize: 27,
    width: 235,
    height: 49,
    boxShadow: "3px 3px 6px #00000029",
    borderRadius: 32,
    borderColor: colors.lightGray,
    color: colors.white,
  },
};

export default styles;
