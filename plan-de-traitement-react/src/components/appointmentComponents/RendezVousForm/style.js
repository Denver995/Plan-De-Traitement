import colors from "../../../utils/colors";

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
    color: colors.blueDark,
    borderRadius: 20,
    padding: "4px 15px 4px 15px"
  },

  textHeaderSelected: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    backgroundColor: colors.primarySombre,
    borderRadius: 20,
    padding: "4px 15px 4px 15px"
  },

  horizontalRule: {
    backgroundColor: colors.primarySombre,
    height: 1,
    boxShadow: "#9cabb3 1px 1px 3px 0px",
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
    fontSize: 16,
    color: colors.primary,
  },

  calendarIcon: {
    position: "absolute",
    top: "63.9%",
    right: "59.7%",
    background: "#e4e4e4",
    padding: 7.5,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  calendarIcon2: {
    position: "absolute",
    top: "63.9%",
    right: "2.3%",
    background: "#e4e4e4",
    padding: 7.5,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
};

export default styles;
