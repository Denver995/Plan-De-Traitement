import colors from "../../utils/colors";

const styles = {
  modal: {
    width: "70rem",
  },
  container: {
    with: "100%",
    marginLeft: "3%",
    marginRight: "3%",
  },
  groupContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "5px",
  },
  text: {
    fontSize: "14px",
    marginLeft: "5px",
    marginBottom: "4px",
    letterSpacing: "0px",
    color: colors.blueLight,
  },
  btn: {
    backgroundColor: colors.primary,
  },
  input: {
    fontSize: "20px",
    color: "#5D9AD4",
  },
  groupRdv: {
    fontSize: "14px",
    marginRight: "10px",
  },
  radioContainer: {
    width: "160px",
  },
  leftItem: {
    marginLeft: "15px",
    flexDirection: "row",
  },
  rightItem: {
    flexDirection: "row",
  },
  radioLabel: {
    marginLeft: "10%",
    fontSize: "18px",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: '10px',
  },
  cancelButton: {
    border: "3px solid #5D9AD4",
    width: "186px",
    height: "59px",
    borderRadius: "41px",
    fontSize: "27px",
    color: colors.primary,
    textDecoration: 'none',
    marginRight: '8%',
  },
  addButton: {
    width: "187px",
    height: "59px",
    border: 'none',
    background: "#5D9AD4",
    borderRadius: "45px",
    fontSize: "27px",
    color: colors.white,
    textDecoration: 'none',
  },
};

export default styles;
