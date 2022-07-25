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

    pin: {
        float: "right",
    }
}

export default styles;