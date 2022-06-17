import colors from "../../utils/colors";

var win = window,
  doc = document,
  docElem = doc.documentElement,
  body = doc.getElementsByTagName('body')[0],
  x = win.innerWidth || docElem.clientWidth || body.clientWidth
console.log(x);
const styles = {
  container: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
  },
  modal: {
    width: 837,
    height: 386,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: 10,
    opacity: 1,
  },
  title: {
    width: x <= 500 ? 320 : 500,
    height: 27,
    textAlign: x <= 500  ? "left" : "left",
    font: "normal normal 600 20px/27px Open Sans",
    letterSpacing: 0,
    color: "#464646",
    opacity: 1,
  },
  secondTitle: {
    marginTop: 35,
    left: 590,
    width: 205,
    height: 19,
    textAlign: "left",
    font: "normal normal bold 14px/19px Open Sans",
    letterSpacing: 0,
    color: "#464646",
    opacity: 1,
  },
  hidden: {
    visibility: 'hidden',
    top: 305,
    left: 779,
    width: 173,
    height: 40,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #707070",
    borderRadius: 7,
    opacity: 1,
  },
  label: {
    fontSize: 14
  },
  number: {
    top: 305,
    left: 0,
    width: "100%",
    height: 40,
    marginRight: -17,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #707070",
    borderRadius: 7,
    opacity: 1
  },
  cancel: {
    width: x <= 500 ? "100%" : 210,
    marginBottom: x <= 500 ? "15px" : 0,
    height: 48,
  },
  annuler: {
    top: 394,
    left: 782,
    width: 100,
    height: 37,
    textAlign: "left",
    font: "normal normal normal 27px/37px Open Sans",
    letterSpacing: 0,
    opacity: 1,
    background: "#FFFFF  0% 0% no-repeat padding-box",
  },
  submit: {
    top: 389,
    width: x <= 500 ? "100%" : 210,
    height: 48,

    background: "#5D9AD4 0% 0% no-repeat padding-box",
    borderRadius: 39,
    opacity: 1,
  }


};

export default styles;