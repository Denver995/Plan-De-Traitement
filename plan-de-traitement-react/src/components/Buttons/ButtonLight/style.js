import colors from "../../../utils/colors";

const styles = {
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    textDecoration: 'none',
    border: '3px solid',
    borderColor: colors.primary,
    backgroundColor: '#fff',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 36,
    color: colors.primary,
    fontSize: 20,
    minWidth: 210,
  },
  enabled: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  disable: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    color: colors.secondary2
  }
};

export default styles;