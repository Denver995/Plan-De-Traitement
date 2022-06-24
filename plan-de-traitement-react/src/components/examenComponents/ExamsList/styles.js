import colors from "../../../utils/colors";

const styles = {
  modal: {
    width: 1361,
    height: 582,
  },
  contain :{
    height:"100%", 
  },

  btnContainer: {
    // width: "100%",
    // display: 'flex',
    // justifyContent: 'center',
    // backgroundColor: colors.blackClaire,
  },

  image: {
    width: 42,
  },

  titleWrapper: {
    paddingTop: 20,
    paddingLeft: "2.5%",

    textAlign: "left",
    font: "normal normal bold 14px/19px Open Sans",
    letterSpacing: 0,
    color: "#464646",
    opacity: 1,
  },

  plusBtn: {
    float: "right",
    marginRight: 10,
    width: 58,
    height: 58,
    // boxShadow: "0px 2px 8px #13405885",
  },

  leftDiv: {
    width: "50%",
  },

  rightDiv: {
    width: "50%",
    display: "flex",
  },

  titles: {
    marginTop: 50,
    textAlign: "left",
    font: "normal normal bold 14px/19px Open Sans",
    letterSpacing: 0,
    color: colors.black,
    opacity: 1,
  },

  subtitleWrapper: {
    textAlign: "left",
    fontSize: 20,
    letterSpacing: 0,
    color: colors.primary,
    opacity: 1,
  },

  terminer: {
    display: "flex",
    width: "100%",
    bottom: 15
  },

  btnTerminer: {
    width: 210,
    height: 48,
    boxShadow: "3px 3px 6px #00000029",
    backgroundColor: colors.darkBlue,
    borderRadius: 32,
    color: colors.white,
    fontSize: 27,
    textDecoration: "none",
    borderColor: colors.darkBlue
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
  btn_group:{
    display: "flex",
    justifyContent: "space-between",
    margin: 18
  },
  button_cancel_me: {
    fontSize: "27px",
    color: colors.primary,
    width: "210px",
    height: "48px",
    border: "3px solid #5D9AD4",
    borderRadius: "35px",
    //marginRight: "8%",
    textDecoration: "none",
    marginRight: 50,
  },
  
  buttonContainer: {
    marginTop: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5px",
  },
};

export default styles;
