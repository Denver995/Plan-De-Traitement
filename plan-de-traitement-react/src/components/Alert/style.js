import colors from "../../utils/colors";

const styles = {
  modal: { width: "50rem" },

  nomModel: {
    color: colors.primary,
  },

  body: {
    margin: "30px",
    marginLeft: "50px",
  },
  message: { fontSize: 22, fontWeight: "500" },
  footer: { justifyContent: "center", padding: 0, marginBottom: 30 },

  saveBtn: {
    width: "210px",
    heiht: "48px",
    borderRadius: "30px",
    fontSize: "27px",
    color: colors.white,
  },

  abortBtn: {
    fontSize: "27px",
    border: "3px solid #5D9AD4",
    borderRadius: "39px",
    opacity: 1,
    width: "210px",
    height: "48px",
    marginRight: "46px",
  },
  // body: { marginTop: 30, marginBottom: 30 },
  // message: { textAlign: "center", fontSize: 22, fontWeight: "600" },
  // footer: { justifyContent: "center", padding: 0, marginBottom: 30 },
  btn: { fontSize: 20, fontFamily: 'Open Sans, Sans Serif' },
};

export default styles;
