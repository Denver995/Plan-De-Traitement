import colors from "../../utils/colors";

var win = window,
  doc = document,
  docElem = doc.documentElement,
  body = doc.getElementsByTagName('body')[0],
  x = win.innerWidth || docElem.clientWidth || body.clientWidth
console.log(x);
const styles = {
  container: {
    padding: "25px 30px 0px 30px",
  },

  bodyContainer: {
    alignItems: 'center'
  },
  modal: {
    width: 837,
    height: 386,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: 10,
    opacity: 1,
  },
  title: {
    width: '100%',
    height: 27,
    font: "normal normal 600 20px/27px Open Sans",
    letterSpacing: 0,
    color: "#464646",
    opacity: 1,
  },

  secondTitle: {
    marginTop: 20,
    marginBottom: 10,
    font: "normal normal bold 14px/19px Open Sans",
    color: "#464646",
    fontWeight : "bold",
    opacity: 1,
  },

  hidden: {
    visibility: "hidden",
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
    font: "normal normal normal 13px/18px Open Sans",
    color: colors.blackClaire,
    fontSize: 14,
    fontWeight: "bold"
  },

  number: {
    font: "normal normal normal 20px/27px Open Sans",
    color: colors.primary,
  },

  select: {
    font: "normal normal 600 20px/27px Open Sans",
    color: colors.blackClaire,
    fontFamily : "arial"
  },

  cancel: {
    width: 210,
    height: 48,
    border: "3px solid 5D9AD4",
    borderRadius: 35,
    background: colors.white,
    textDecoration: "none",
    marginRight: 50
  },

  annuler: {
    font: "normal normal normal 27px/37px Open Sans",
    color: colors.primary,
    fontFamily: "arial"
  },

  ajouter: {
    font: "normal normal normal 27px/37px Open Sans",
    fontFamily: "arial"
  },

  submit: {
    width: 210,
    height: 48,
    background: "#5D9AD4 0% 0% no-repeat padding-box",
    borderRadius: 39,
    color: colors.white,
    textDecoration: "none",
  },

  submitDeactivated: {
    width: 210,
    height: 48,
    background: colors.lightGray,
    borderRadius: 39,
    color: colors.white,
    textDecoration: "none",
    borderColor: colors.lightGray
  },

  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  inputContainer: {
    paddingTop: 4
  }
};

export default styles;
