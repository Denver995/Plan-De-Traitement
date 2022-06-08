
import colors from "../../../utils/colors";

const styles = {
  modal: {
    width: 1361,
    height: 582,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  image: {
    width: 42,
  },
  titleWrapper: {
    paddingTop: 20,
    paddingLeft: '2.5%',

    textAlign: "left",
    font: "normal normal bold 14px/19px Open Sans",
    letterSpacing: 0,
    color: "#464646",
    opacity: 1,
  
  },
  plusBtn: {
    marginLeft: 600,
    marginTop:-50,
    left: 1557,
    width: 58,
    height: 58,
    boxShadow: "0px 2px 8px #13405885",
    opacity: 1,
  
  },
  leftDiv: {
    width: '50%'
  },
  rightDiv: {
    width: '50%',
    display: 'flex'
  },
  titles:{
  marginTop: 50,
  textAlign: "left",
  font: "normal normal bold 14px/19px Open Sans",
  letterSpacing: 0,
  color: colors.black,
  opacity: 1,
  },
  subtitleWrapper:{
  
    textAlign: "left",
    font: "normal normal normal 20px/27px Open Sans",
    letterSpacing: 0,
    color: colors.primary,
    opacity: 1,
    
  },

};

export default styles;