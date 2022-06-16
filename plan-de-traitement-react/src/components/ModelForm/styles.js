import colors from "../../utils/colors";

const styles = {
  modal: {
    width: "70rem",
    bottom: 'unset'
  },
  container: {
    with: "100%",
    marginLeft: "3%",
    marginRight: "3%",
  },
  groupContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "5px",
  },
  text: {
    fontSize: "14px",
    marginLeft: "5px",
    marginBottom: "4px",
    letterSpacing: "0px",
    color: colors.blueLight,
  },
  form: { marginLeft: 20, marginRight: 20 },
  btn: {
    backgroundColor: colors.primary,
  },
  input: {
    fontSize: "20px",
    color: "#5D9AD4",
  },
  groupRdv: {
    fontSize: "14px",
    marginRight: "10px",
  },
  radioContainer: {
    width: "160px",
  },
  leftItem: {
    marginLeft: "15px",
    flexDirection: "row",
  },
  rightItem: {
    flexDirection: "row",
  },
  radioLabel: {
    marginLeft: "10%",
    fontSize: "18px",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: '10px',
  },
  cancelButton: {
    border: "3px solid #5D9AD4",
    height: "59px",
    borderRadius: "41px",
    fontSize: "27px",
    color: colors.primary,
    textDecoration: 'none',
  },
  addButton: {
    height: "59px",
    border: 'none',
    background: "#5D9AD4",
    borderRadius: "41px",
    fontSize: "27px",
    color: colors.white,
    textDecoration: 'none',
  },
  nomModel: {
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 4,
    letterSpacing: 0,
    color: colors.blackClaire,
    fontWeight: 'bold',
  },
  inputModal: {
    letterSpacing: 0,
    color: colors.primary,
    fontSize: 20,
    borderColor: colors.inputBorder
  },
  groupeTitle: {
    letterSpacing: 0,
    color: colors.blackClaire,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 7,
  },
  toolTipCon: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 5
  },
  periodeRecherche: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 12,
  }
};

export default styles;
