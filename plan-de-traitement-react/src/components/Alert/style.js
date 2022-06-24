import colors from "../../utils/colors";

var win = window,
  doc = document,
  docElem = doc.documentElement,
  body = doc.getElementsByTagName('body')[0],
  x = win.innerWidth || docElem.clientWidth || body.clientWidth;


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

  footer: { display: "flex", justifyContent: "center", padding: 0, marginBottom: 30 },
  footerResp: {
    flexDirection: 'column'
  },
  saveBtn: {
    width: "210px",
    heiht: "48px",
    borderRadius: "30px",
    justifyContent: "center",
    alignItems: "center",
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
  abortBtnResp: {
    fontSize: 20,
    padding: 5,
    width: "100%",
    marginBottom: 20,
  },
  // body: { marginTop: 30, marginBottom: 30 },
  // message: { textAlign: "center", fontSize: 22, fontWeight: "600" },
  // footer: { justifyContent: "center", padding: 0, marginBottom: 30 },
  btn: { fontSize: x <= 500 ? 20 : 25, fontFamily: 'Open Sans, Sans Serif', width: x <= 500 ? "100%" : "210px", padding: x <= 500 ? "5px" : "", },
  btnRep: {
    fontSize: 20,
    width: "100%",
    padding: 5,
  },

  textContainer: {
    float: "left",
    fontSize: 22,
    color: "#242729"
  },

  textTitle: {
    display: "flex",
    alignItems: "center",
    fontSize: 20,
    color: colors.primary,
    marginTop: 10,
    marginBottom: 20,
  },

  pencil: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 28,
    width: 28,
    border: "1px solid #5D9AD4",
    borderRadius: "50%",
    marginLeft: 15,
    // marginTop: -2,
    cursor: "pointer",
  }
};

export default styles;
