import colors from "../../utils/colors";

const styles = {
    container: {
        width: 500,
        height: 230,
        borderRadius: 20,
        border: "4px solid #29928a",
        position: "absolute",
        right: 50,
        bottom: 50,
        backgroundColor: colors.white,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5
    },

    header: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    pause: {
        marginRight: 10
    },

    titleContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: 15
    },

    checkCircle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 40,
        borderRadius: "50%",
        backgroundColor: colors.lightGreen,
        marginRight: 10
    },

    title: {
        fontSize: 22,
        color: colors.lightBlack,
        fontWeight: "bold"
    },

    bodyContainer: {
        margin: 10,
        marginBottom: 12
    },

    flexContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: 10
    },

    label: {
        fontSize: 18,
        marginRight: 5
    },

    modelName: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.lightBlack,
    },

    nbreExams: {
        fontSize: 18,
    },

    footerContainer: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },

    file: {
        marginRight: 20
    }
}

export default styles;