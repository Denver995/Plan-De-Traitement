import colors from "../../utils/colors";

const styles = {
  modal: {
    width: '70rem'
  },
  form: { marginLeft: 20, marginRight: 20 },
  btn: {
    backgroundColor: colors.primary,
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
  }
};

export default styles;