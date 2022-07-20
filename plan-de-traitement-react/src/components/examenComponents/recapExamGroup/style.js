import colors from "../../../utils/colors";

const styles = {
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
    left: -52,
    width: 28,
    height: 28,
    // marginLeft: -1,
    borderRadius: "50%",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
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
    right: -49,
    width: 28,
    height: 28,
    // marginLeft: -1,
    borderRadius: "50%",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },

  customBar: {
    position: "absolute",
    top: -15,
    left: -42,
    background: "#0f4461",
    width: 7,
    height: 105,
  },

  customBarLeft: {
    position: "absolute",
    top: -15,
    right: -38.5,
    background: "#0f4461",
    width: 7,
    height: 103,
  },
};

export default styles;
