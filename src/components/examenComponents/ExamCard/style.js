import colors from "../../../utils/colors";

const styles = {
  rightHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
  },

  leftHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  sectionPraticien: {
    // marginTop: "10px",
  },

  praticienLeftContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },

  praticienRightContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },

  speciality: {
    fontSize: "13px",
    color: colors.darkBlue,
    letterSpacing: 0,
    fontWeight: "bold",
  },

  praticien: {
    fontSize: "13px",
    letterSpacing: 0,
    color: colors.darkBlue,
    marginLeft: "5px",
    marginRight: "30px",
  },

  adresse: {
    fontSize: "13px",
    color: colors.darkBlue,
    letterSpacing: 0,
    marginLeft: "5px",
  },

  pinRight: {
    float: "right",
    marginTop: 5,
  },

  pinLeft: {
    float: "left",
    marginTop: 5,
  },

  propRight: {
    marginRight: -6,
  },

  propLeft: {
    marginLeft: -6,
  },

  text: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: -35,
    width: "95%",
    textAlign: "right",
  },

  textRight: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: -35,
    width: "95%",
  },

  dotContainer: {
    position: "absolute",
    top: -35,
    left: -51,
    width: 28,
    height: 28,
    // marginLeft: -1,
    borderRadius: "50%",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1
  },

  dotChild: {
    height: 16,
    width: 16,
    background:
      "transparent radial-gradient(closest-side at 50% 50%, #16597D 0%, #01263A 100%) 0% 0% no-repeat padding-box",
    borderRadius: "50%",
    zIndex: 999,
  },

  dotContainerLeft: {
    position: "absolute",
    top: -35,
    right: -48,
    width: 28,
    height: 28,
    // marginLeft: -1,
    borderRadius: "50%",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1
  },

  customBar: {
    position: "absolute",
    top: -15,
    left: -40,
    background: "#0f4461",
    width: 7,
    height: "142%"
  },

  customBarLeft: {
    position: "absolute",
    top: -15,
    right: -37,
    background: "#0f4461",
    width: 7,
    height: "142%"
  }
};

export default styles;
