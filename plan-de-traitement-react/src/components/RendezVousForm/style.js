import colors from "../../utils/colors";

const styles = {
  modal: {
    width: "70rem",
    bottom: "unset",
  },

  header: {
    display: "flex",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },

  textHeader: {
    fontSize: 20,
    color: colors.primaryRdv,
    borderRadius: 28,
    padding: "4px 15px 4px 15px",
  },

  textHeaderSelected: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    backgroundColor: colors.primarySombre,
    borderRadius: 28,
    padding: "4px 15px 4px 15px",
  },

  horizontalRule: {
    backgroundColor: colors.primaryRdv,
    height: 1,
    boxShadow: "1px 3px 6px #00000029",
  },

  form: { marginLeft: 20, marginRight: 20 },

  nomModel: {
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 4,
    letterSpacing: 0,
    color: colors.blackClaire,
    fontWeight: "bold",
  },

  inputModal: {
    letterSpacing: 0,
    color: colors.primary,
    fontSize: 20,
    borderColor: colors.shadow,
  },

  inputText: {
    borderColor: colors.shadow,
    fontSize: 15,
    color: colors.primary,
  },

  calendarIcon: {
    position: "absolute",
    top: "64%",
    right: "59.5%",
    background: colors.transparent,
    height: 40,
    width: 40,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    border: "1px solid #b7b7b7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  calendarIcon2: {
    position: "absolute",
    top: "64%",
    right: "2.4%",
    background: colors.transparent,
    height: 40,
    width: 40,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    border: "1px solid #b7b7b7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },

  cancelButton: {
    border: "3px solid #5D9AD4",
    height: "59px",
    borderRadius: "41px",
    fontSize: "27px",
    color: colors.primary,
    textDecoration: "none",
    marginRight: 70,
  },

  addButton: {
    height: 59,
    border: "none",
    background: colors.primary,
    borderRadius: 41,
    fontSize: 27,
    color: colors.white,
    textDecoration: "none",
  },

  addButton2: {
    height: 59,
    border: "none",
    background: colors.lightGray,
    borderRadius: 41,
    fontSize: 27,
    color: colors.white,
    textDecoration: "none",
  },
};

export default styles;
