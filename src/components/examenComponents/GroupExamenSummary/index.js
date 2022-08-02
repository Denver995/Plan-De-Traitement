import {
    EuiButton,
    EuiButtonEmpty, EuiFlexGroup, EuiSpacer
} from "@elastic/eui";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect, useDispatch, useSelector } from "react-redux";
import { setError } from "../../../redux/commons/actions";
import {
    dragAndDrog, setShowExamForm,
    SetShowGroupeContentForUpdate
} from "../../../redux/examens/actions";
import {
    addStep,
    deleteStep,
    desactivateStep
} from "../../../redux/steps/actions";
import ExamenService from "../../../services/examens";
import ModelGroupeService from "../../../services/modelGroupe";
import ModelService from "../../../services/models";
import { STEP2, STEP3 } from "../../../utils/constants";
import { createStep, getStepByKey } from "../../../utils/helper";
import ModalWrapper from "../../common/ModalWrapper";
import ExamenForm from "../ExamenForm";
import GroupItem from "../GroupItem";
import styles from "./styles";

const getExamByGroupIndex = (group, groupKey) => {
    const result = Object.keys(group).length > 0 ? group[groupKey]?.exams : [];
    return result;
};

const GroupExamenSummary = ({
    nbrGroupe,
    espacement,
    openGroup,
    showPeriodForm,
}) => {
    const dispatch = useDispatch();
    const steps = useSelector((state) => state.StepReducer.steps);
    const modelData = useSelector((state) => state.ModelsReducer.modelData);
    const error = useSelector((state) => state.CommonReducer.error);
    const groupesWithData = useSelector(
        (state) => state.ExamenReducer.groupWithData
    );
    const showForm = useSelector((state) => state.CommonReducer.examen.show);
    const previousStep = getStepByKey(steps, STEP2);
    const [reRender, setReRender] = useState(false);
    const [groupWithData, setGroupWithData] = useState({});
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [groupWithDataTab, setGroupWithDataTab] = useState([]);

    const handleUpdateModele = () => {
        setLoading(true);
        ModelService.updateModele(modelData.id, { complet: true })
            .then((response) => {
                setLoading(false);
                dispatch(setError(null));
            })
            .catch((error) => {
                setLoading(false);
                if (error.message === "Network Error") {
                    dispatch(
                        setError("Erreur de connexion, Vérifiez votre connexion internet")
                    );
                } else {
                    dispatch(setError("Une erreur est survenue"));
                }
            });
        let nextStep = createStep(STEP3);
        nextStep.previousStep = previousStep;
        dispatch(desactivateStep(STEP2));
        dispatch(addStep(nextStep));
        dispatch(SetShowGroupeContentForUpdate(-1));
    };

    const onClickNext = () => {
        handleUpdateModele();
    };

    const onBack = () => {
        Object.keys(groupWithData).map((groupKey, index) => {
            ModelGroupeService.deleteModelGroupe(parseInt(groupWithData[groupKey]?.payload.id_modele_groupe))
                .then((response) => {
                })
                .catch((error) => {
                });
        })
        dispatch(deleteStep(previousStep))
    };

    const onPrevious = () => {
        dispatch(setShowExamForm(false));
    };

    const canContinue = useCallback(() => {
        let can = false;
        let number = 0;
        let groupesWithDataKeys = Object.keys(groupWithData);
        for (var i = 0; i < groupesWithDataKeys.length; i++) {
            if (groupWithData["group " + i]?.exams?.length > 0) {
                number = number + 1;
            }
        }
        if (number === groupesWithDataKeys.length) {
            can = true;
        }
        return can;
    });

    useEffect(() => {
        setReRender(false);
        setDisable(canContinue());
    }, [showForm, ignored, canContinue, groupWithData]);

    useEffect(() => {
        setReRender(true);
        setDisable(canContinue());
    }, [reRender, disable, setDisable, canContinue, groupWithData]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => (
            getGroupExam()
        ), 5000)
    }, [])

    const getGroupExam = () => {
        let newobjet = {}
        setGroupWithData({})
        setGroupWithDataTab([])
        ModelGroupeService.getModelGroupe(parseInt(modelData.id))
            .then((response) => {

                response.data.data.forEach((element, index) => {
                    setLoading(true)

                    ExamenService.getExamenByIds(parseInt(modelData.id), parseInt(element.id_modele_groupe))
                        .then((res) => {
                            setLoading(false);

                            newobjet["group " + index] = {
                                payload: element,
                                fixe: false,
                                exams: res.data.data
                            }

                            newobjet = sortObject(newobjet);

                            setGroupWithDataTab(Object.keys(newobjet))
                            setGroupWithData(newobjet)
                        })
                        .catch(() => {
                            setLoading(false);

                            newobjet["group " + index] = {
                                payload: element,
                                fixe: false,
                                exams: []
                            }
                            newobjet = sortObject(newobjet);
                            setGroupWithDataTab(Object.keys(newobjet))

                            setGroupWithData(newobjet)
                        });

                });
                setLoading(false);

            })
            .catch(() => {
                onBack()
                setLoading(false);
            });

    }

    const sortObject = (obj) => {
        return Object.keys(obj)
            .sort().reduce((a, v) => {
                a[v] = obj[v];
                return a;
            }, {});
    }

    const action = () => {
        getGroupExam()
        setReRender(!reRender)
    }

    const handleOnDragEnd = (result) => {
        let source = result.source.index;
        let destination = result.destination.index;
        if (!result.destination) return;
        const items = Object.keys(groupWithData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        if (
            groupesWithData["group " + source].fixe === false &&
            groupesWithData["group " + destination].fixe === false
        ) {
            dispatch(dragAndDrog({ source, destination }));
        }
        setReRender(true);
        forceUpdate();
    };

    return (
        <ModalWrapper style={styles.modal}>
            {showForm ? (
                <ExamenForm
                    isModelGroup={true}
                    onPrevious={onPrevious}
                    handleGetExamByGroupIndex={getExamByGroupIndex}
                />
            ) : (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ marginTop: 28, marginBottom: 60 }}
                            >
                                {[...Array(nbrGroupe).keys()].map((item, index) => (
                                    <GroupItem
                                        reRender_={() => {
                                            action()
                                        }}
                                        groupName={"Group " + index + 1}
                                        key={index}
                                        espacement={espacement}
                                        groupWithData={groupWithData}
                                        groupWithDataTab={groupWithDataTab}
                                        openGroup={openGroup}
                                        showPeriodForm={showPeriodForm?.status}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            {loading && (
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress
                        style={{
                            margin: "20px auto",
                            color: "blue",
                            width: "35px",
                            height: "35px",
                        }}
                    />
                </Box>
            )}

            {!showForm && (
                <>
                    <EuiFlexGroup
                        className="btn_group"
                        style={{
                            margin: 17,
                            ...styles.cancelBtn,
                            display: "flex",
                            flexDirection: disable ? "row-reverse" : "row",
                            justifyContent: disable ? "space-between" : "",
                        }}
                    >
                        {disable && (
                            <EuiButton
                                fill={true}
                                style={{
                                    ...styles.addBtn,
                                    visibility:
                                        Object.keys(groupWithData).length < 1
                                            ? "hidden"
                                            : "visible",
                                }}
                                className="button_next_me"
                                onClick={onClickNext}
                            >
                                {loading ? (
                                    <Box style={{ display: "flex", alignItems: "center" }}>
                                        <CircularProgress
                                            style={{
                                                marginRight: "5px",
                                                color: "white",
                                                width: "25px",
                                                height: "25px",
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <>Enregistrer</>
                                )}
                            </EuiButton>
                        )}
                        {Object.entries(groupWithData).length > 0 && (
                            <EuiButtonEmpty onClick={onBack} className="button_cancel_me">
                                Retour
                            </EuiButtonEmpty>
                        )}
                    </EuiFlexGroup>
                </>
            )}
            {errorMessage && (
                <>
                    <EuiSpacer size="xl" />
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                </>
            )}
        </ModalWrapper>
    );
};

const mapStateToProps = ({ ExamenReducer, CommonReducer }) => ({
    espacement: ExamenReducer.espacement,
    openGroup: ExamenReducer.openGroup,
    showPeriodForm: CommonReducer.showPeriodForm,
});

export default connect(mapStateToProps)(GroupExamenSummary);