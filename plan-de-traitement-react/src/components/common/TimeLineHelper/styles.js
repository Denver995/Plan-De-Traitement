import colors from "../../../utils/colors";

const styles = {
  titleWrapper: {
    height: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  leftDiv: {
    width: "46.5%",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: 20
  },
  dotContainer: {
    width: 25,
    height: 25,
    marginLeft: -1,
    borderRadius: "50%",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dotChild: {
    height: 15,
    width: 15,
    background: "#01263A",
    borderRadius: "50%",
    zIndex: 1,
  },
  rightDiv: {
    width: "49%",
    display: "flex",
    justifyContent: "flex-start",
  },
  date: {
    position: "absolute",
    backgroundColor: "#fff",
    left: "50%",
    top: "55%",
    transform: "translate(-55%,-50%)",
    fontSize: 12,
  }
};

export default styles;