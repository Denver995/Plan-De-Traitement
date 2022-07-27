import {
  EuiButtonEmpty,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  useGeneratedHtmlId,
} from "@elastic/eui";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { default as React, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setComponent,
  setError,
  setShowExamForm,
  setShowPeriodForm,
} from "../redux/commons/actions";
import {
  deleteExamGroup,
  deleteExamSimple,
  editExam,
  editExamGrouped,
  linkToExam,
  linkToGroup,
  mostBeEditable,
  setGroupeToEditeExam,
  SetShowGroupeContentForUpdate,
  toggleFixExamPosition,
} from "../redux/examens/actions";
import examenLieService from "../services/examensLie";
import GroupeLieService from "../services/groupeLie";
import { typeScreen } from "../utils/constants";
import examenService from "../services/examens";

const Propover = ({
  isModelGroup,
  onDeleteGroup,
  onDeleteExam,
  onUpdateExam,
  onDeleteExamInGroup,
  onFixePosition,
  index,
  onEditItem,
  forEXam,
  isOnGroupe,
  setRerenderDel,
  examId,
  loading,
  idGroup,
  exam,
  groupKey,
  isExamGroup,
  setReload,
  examsGrouped,
  onBack,
  isRecap,
  loadingScreen,
  isGroup,
  examOnGroup,
  predecessor,
  setPredecessor,
  modelData
}) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, setPopover] = useState(false);
  const togglePropover = () => setPopover(!isPopoverOpen);
  const [isOpen, setIsOpen] = useState(false);
  const [panelRef] = useState(null);
  const contextMenuPopoverId = useGeneratedHtmlId({
    prefix: "contextMenuPopover",
  });
  const groupesWithData = useSelector(
    (state) => state.ExamenReducer.groupWithData
  );

  const getAllExams = () => {
    if (isModelGroup)
      examenService
        .getExamenByIds(modelData.id, idGroup)
        .then((response) => {
          setExams(response.data.data);
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            dispatch(
              setError("Erreur de connexion, Vérifiez votre connexion internet")
            );
          } else {
            dispatch(setError("Une erreur est survenue"));
          }
        });
    else
      examenService
        .getExamenByModelId(modelData.id)
        .then((response) => {
          setExams(response.data.data);
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            dispatch(
              setError("Erreur de connexion, Vérifiez votre connexion internet")
            );
          } else {
            dispatch(setError("Une erreur est survenue"));
          }
        });
  };

  const [exams, setExams] = useState([]);
  const groupPayload = useSelector((state) => state.ExamenReducer.groupPayload);

  const handleClick = () => {
    setIsOpen(!isOpen)
  };
  const handleClose = () => setIsOpen(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loadingg, setLoadingg] = useState(false);

  const onEdit = () => {
    dispatch(SetShowGroupeContentForUpdate(index));
    dispatch(editExam({ ...exam, id: examId + 1 }));

    if (isGroup) isExamGroup = isGroup;

    if (isExamGroup) {
      if (examId) {
        dispatch(setGroupeToEditeExam({ groupKey, index }));
        dispatch(mostBeEditable(true));
        dispatch(editExamGrouped(groupesWithData[groupKey].exams[examId]));
      } else {
        dispatch(mostBeEditable(true));
        dispatch(editExamGrouped(groupesWithData[groupKey].exams[index]));
        onBack();
      }
    } else {
      if (predecessor) setPredecessor(typeScreen.examList);
      dispatch(mostBeEditable(true));
      dispatch(setShowExamForm({ show: false }));
      exam.indexExam = index;
      dispatch(setComponent({ name: typeScreen.examFormEdit, data: exam }));
      isRecap && onBack();
    }
    togglePropover();
  };

  const onDelete = (index) => {
    if (isModelGroup) {
      onDeleteGroup();
      togglePropover();
      setRerenderDel(true);
      return;
    }

    if (isExamGroup) {
      onDeleteExam();
      dispatch(
        deleteExamGroup({
          groupKey: groupKey,
          examId: index,
        })
      );
    } else {
      onDeleteExam();
      dispatch(deleteExamSimple({ examId: index }));
    }

    togglePropover();
  };

  const onFixPosition = () => {
    if (isGroup) {
      onFixePosition();
      togglePropover();
    }

    if (examOnGroup) isExamGroup = examOnGroup;

    if (isExamGroup) {
      dispatch(
        toggleFixExamPosition({
          selectedExam: index,
          groupKey: groupKey,
          isExamGrouped: true,
        })
      );
      togglePropover();
    } else {
      load(true)
      examenService
        .updateExamen(exam.id_examen, {
          id_modele: parseInt(modelData.id),
          id_praticien: exam.id_praticien,
          id_lieu: exam.id_lieu,
          id_motif: exam.id_motif,
          id_profession: exam.id_profession,
          fixe: exam.fixe ? 0 : 1,
          position: exam.position ? exam.position : 1,
        })
        .catch((error) => {
          setErrorMessage(true);
          load(false)

          if (error.message === "Network Error") {
            dispatch(
              setError("Erreur de connexion, Vérifiez votre connexion internet")
            );
          } else {
            dispatch(setError("Une erreur est survenue"));
          }
        });
      dispatch(
        toggleFixExamPosition({
          selectedExam: examId,
          isExamGroup: false,
        })
      );

      togglePropover();

      try {
        onFixePosition();
      } catch (err) { }
    }
  };

  const load = (l) => {
    loadingScreen(l);
  };

  const handleBindExamen = (data, examid) => {
    load(true)
    setErrorMessage(false);
    setLoadingg(true);
    examenLieService
      .createExamenLie(data)
      .then((response) => {
        load(false)
        dispatch(linkToExam({ parent: examid, child: data.id_examen_enfant }));
        handleClose();
        togglePropover();
        setErrorMessage(false);
        dispatch(setError(null));
        setLoadingg(false);
      })
      .catch((error) => {
        setLoadingg(false);
        setErrorMessage(true);
        if (error.message === "Network Error") {
          dispatch(
            setError("Erreur de connexion, Vérifiez votre connexion internet")
          );
        } else {
          dispatch(setError("Une erreur est survenue, veuillez réessayer"));
        }
      });
  };

  const handleCreateExamenLie = (index, examId) => {
    for (let i = 0; i < exams.length; i++) {
      if (index === i) {
        handleBindExamen(
          {
            id_examen_parent: examId,
            id_examen_enfant: exams[i].id_examen,
          },
          examId
        );
        return;
      }
    }
  };

  const handleBindGroup = (data) => {
    setErrorMessage(false);
    setLoadingg(true);
    load(true);

    GroupeLieService.createGroupeLie(data)
      .then((response) => {
        setErrorMessage(false);
        dispatch(setError(null));
        setLoadingg(false);
        load(false);
      })
      .catch((error) => {
        setLoadingg(false);
        setErrorMessage(true);
        load(false);
        if (error.message === "Network Error") {
          dispatch(
            setError("Erreur de connexion, Vérifiez votre connexion internet")
          );
        } else {
          dispatch(setError("Une erreur est survenue, veuillez réessayer"));
        }
      });
  };
  const handleCreateGroupeLie = (index) => {
    for (let i = 0; i < groupPayload.length; i++) {
      if (index === i) {
        handleBindGroup({
          id_groupe_parent: idGroup,
          id_groupe_enfant: groupPayload[i].id_modele_groupe,
        });
      }
    }
  };
  useEffect(() => { }, [groupesWithData]);

  useEffect(() => {
    getAllExams()
  }, [])

  const button = (
    <div
      onClick={togglePropover}
      style={{ width: 20, textAlign: "center", cursor: "pointer" }}
    >
      <span className="icon-ellipsis-v"></span>
    </div>
  );

  return (
    <div grow={false} className="icon_ellipsis">
      {loading ? (
        <Box style={{ display: "flex", alignItems: "center" }}>
          <CircularProgress
            style={{
              marginRight: "5px",
              color: "blue",
              width: "25px",
              height: "25px",
            }}
          />
        </Box>
      ) : (
        ""
      )}
      <EuiPopover
        id={contextMenuPopoverId}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={handleClose}
        panelPaddingSize="s"
        anchorPosition="downLeft"
        container={panelRef}
      >
        <EuiListGroup>
          {isOnGroupe ? (
            <EuiListGroupItem
              onClick={() => {
                dispatch(setShowPeriodForm({ data: groupesWithData[groupKey]?.payload, status: true }));
              }}
              label="Modifier la période de recherche"
            />
          ) : (
            <EuiListGroupItem onClick={onEdit} label="Modifier" />
          )}
          <EuiListGroupItem
            onClick={() => { }}
            label="Dupliquer"
          />
          <EuiListGroupItem onClick={onDelete} label="Supprimer" />
          <EuiListGroupItem
            onClick={onFixPosition}
            label={
              isModelGroup ?
                groupesWithData[groupKey]?.positionFixed
                  ? "Defixer la position"
                  : "Fixer position" :
                exam?.fixe ? "Defixer la position"
                  : "Fixer position"
            }
          />
          <EuiPopover
            id="simpleAccordionId"
            isOpen={isOpen}
            closePopover={handleClose}
            anchorPosition="rightUp"
            button={
              <EuiButtonEmpty
                iconType={isOpen ? "arrowDown" : "arrowRight"}
                iconSide="right"
                color="black"
                onClick={handleClick}
              >
                {isModelGroup
                  ? "Lier avec un autre groupe"
                  : "Lier avec un autre examen"}
              </EuiButtonEmpty>
            }
          >
            <EuiListGroup>
              {groupesWithData && (isModelGroup || isModelGroup === 0)
                ? Object.keys(groupesWithData).length > 0 &&
                Object.keys(groupesWithData).map((key, i) => {
                  return (
                    idGroup != groupesWithData[key]?.payload.id_modele_groupe && (
                      <EuiListGroupItem
                        key={i}
                        onClick={() => {
                          let child = "group " + i;

                          // dispatch(linkToGroup({ key, child }));
                          try {
                            handleCreateGroupeLie(i);
                          } catch (err) { }
                          handleClose();
                          togglePropover();
                        }}
                        label={`Groupe ${i + 1}`}
                      />
                    )
                  );
                })
                : exams.map(
                  (exam, i) => {
                    return (
                      (isModelGroup ? examId !== exam[i]?.id_examen : examId !== exam?.id_examen) && (
                        <EuiListGroupItem
                          key={i}
                          onClick={() => {
                            handleCreateExamenLie(i, examId);
                          }}
                          label={`Examen ${i + 1}`}
                        />
                      )

                    );
                  }
                )}
            </EuiListGroup>
          </EuiPopover>
        </EuiListGroup>
      </EuiPopover>
    </div>
  );
};

const mapStateToProps = ({ ModelsReducer }) => ({
  modelData: ModelsReducer.modelData
});
export default connect(mapStateToProps)(Propover);

// export default Propover;
