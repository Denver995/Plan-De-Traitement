import colors from "../../utils/colors";

var win = window,
  doc = document,
  docElem = doc.documentElement,
  body = doc.getElementsByTagName('body')[0],
  x = win.innerWidth || docElem.clientWidth || body.clientWidth

const styles = {
  modal: { width: "50rem" },

  nomModel: {
    color: colors.primary,
  },

  body: {
    margin: "30px",
    marginLeft: "50px",
  },

  message: { fontSize: 22, fontWeight: "500", textAlign: "center", marginRight: x < 768 ? "20%" : "" },

  footer: { display: "flex", flexDirection: x <= 500 ? "column" : "row", justifyContent: "center", padding: 0, marginBottom: 30 },

  saveBtn: {
    width: "210px",
    heiht: "48px",
    borderRadius: "30px",
    justifyContent: "center",
    alignItem: "center",
    fontSize: "20px",
    color: colors.white,
    textDecoration: "none",
  },

  abortBtn: {
    fontSize: x <= 500 ? 20 : 25,
    padding: x <= 500 ? "5px" : "",
    border: "1px solid #5D9AD4",
    borderRadius: "39px",
    opacity: 1,
    width: x <= 500 ? "100%" : "210px",
    height: "48px",
    marginRight: "46px",
    textDecoration: "none",
    marginBottom: x <= 500 ? "20px" : "",
  },
  // body: { marginTop: 30, marginBottom: 30 },
  // message: { textAlign: "center", fontSize: 22, fontWeight: "600" },
  // footer: { justifyContent: "center", padding: 0, marginBottom: 30 },
  btn: { fontSize: x <= 500 ? 20 : 25, fontFamily: 'Open Sans, Sans Serif', width: x <= 500 ? "100%" : "210px", padding: x <= 500 ? "5px" : "", },
};

export default styles;
