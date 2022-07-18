import {
  EuiButtonEmpty, EuiListGroup, EuiListGroupItem, EuiPopover,
  useGeneratedHtmlId
} from "@elastic/eui";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { default as React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComponent, setError, setShowExamForm } from "../redux/commons/actions";
import {
  deleteExamGroup,
  deleteExamSimple,
  editExam, mostBeEditable, setGroupeToEditeExam, SetShowGroupeContentForUpdate, toggleFixExamPosition
} from "../redux/examens/actions";
import examenLieService from '../services/examensLie';
import GroupeLieService from "../services/groupeLie";




const Propover = ({
  isModelGroup,
  onDeleteGroup,
  onDeleteExam,
  onUpdateExam,
  onDeleteExamInGroup,
  idGroupe,
  onFixePosition,
  index,
  onEditItem,
  forEXam,
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
  loadingScreen
}) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, setPopover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [panelRef] = useState(null);
  const contextMenuPopoverId = useGeneratedHtmlId({
    prefix: "contextMenuPopover",
  });
  const groupesWithData = useSelector(
    (state) => state.ExamenReducer.groupWithData
  );
  const getAllExams = useSelector((state) => state.ExamenReducer.getAllExams);
  const exams = useSelector((state) => state.ExamenReducer.exams);
  const groupPayload = useSelector(state => state.ExamenReducer.groupPayload);
  const handleClick = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loadingg, setLoadingg] = useState(false);


  const onEdit = () => {
    dispatch(SetShowGroupeContentForUpdate(index))
    dispatch(editExam({ ...exam, id: examId + 1 }));
    if (isExamGroup) {
      if (examId) {
        dispatch(setGroupeToEditeExam({ groupKey, index }))
        dispatch(mostBeEditable(true))
        dispatch(setShowExamForm({ show: true }));
        dispatch(
          setComponent({
            name: "EXAMENFORMEDIT",
            groupKey: groupKey,
            examId: examId,
            data: groupesWithData,
          })
        );
      } else {
        dispatch(mostBeEditable(true))
        dispatch(setShowExamForm({ show: true }));
        dispatch(
          setComponent({
            name: "EXAMENFORMEDIT",
            groupKey: groupKey,
            examId: index,
            data: groupesWithData
          })
        );
      }

    } else {
      dispatch(mostBeEditable(true));
      dispatch(setShowExamForm({ show: true }));
      exam.indexExam = index;
      dispatch(setComponent({ name: "EXAMENFORMEDIT", data: exam }));
      isRecap && onBack();
    }
    // togglePropover();
  };

  const onDelete = (index) => {
    if (isModelGroup) {
      onDeleteGroup();
      // togglePropover();
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

    // togglePropover();
  };

  const onFixPosition = () => {
    if (isExamGroup) {
      onFixePosition(index);
      dispatch(
        toggleFixExamPosition({
          selectedExam: index,
          groupKey: groupKey,
          isExamGrouped: true,
        })
      );
      // togglePropover();
    } else {
      // togglePropover();
      if (examId) {
        dispatch(
          toggleFixExamPosition({
            selectedExam: examId,
            isExamGroup: false,
          })
        );
      }
      onFixePosition(index);

    }
  };

  const load = (l) => {
    loadingScreen(l);
  }

  const handleBindExamen = (data) => {
    setErrorMessage(false);
    setLoadingg(true);
    load(true);
    examenLieService.createExamenLie(data)
      .then(response => {
        setErrorMessage(false)
        dispatch(setError(null));
        setLoadingg(false);
        load(false);
      })
      .catch(error => {
        setLoadingg(false)
        setErrorMessage(true)
        load(false);
        if (error.message === "Network Error") {
          dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
        } else {
          dispatch(setError("Une erreur est survenue, veuillez réessayer"))
        }
      })
  }

  const handleCreateExamenLie = (index) => {
    for (let i = 0; i < getAllExams.length; i++) {
      if (index === i) {
        handleBindExamen({
          id_examen_parent: examId,
          id_examen_enfant: getAllExams[i].id_examen
        })
        return;
      }

    }
  }

  const handleBindGroup = (data) => {
    setErrorMessage(false);
    setLoadingg(true);
    load(true);
    GroupeLieService.createGroupeLie(data)
      .then(response => {
        setErrorMessage(false)
        dispatch(setError(null));
        setLoadingg(false);
        load(false);
      })
      .catch(error => {
        setLoadingg(false)
        setErrorMessage(true)
        load(false);
        if (error.message === "Network Error") {
          dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
        } else {
          dispatch(setError("Une erreur est survenue, veuillez réessayer"))
        }
      })
  }
  const handleCreateGroupeLie = (index) => {
    for (let i = 0; i < groupPayload.length; i++) {
      if (index === i) {
        handleBindGroup({
          id_groupe_parent: idGroup,
          id_groupe_enfant: groupPayload[i].id_modele_groupe
        })
        return;
      }

    }
  }
  useEffect(() => {
  }, [groupesWithData])


  const button = (
    <div
      // onClick={togglePropover}
      style={{ width: 20, textAlign: "center", cursor: "pointer" }}
    >
      <span className="icon-ellipsis-v"></span>
    </div>
  );

  return (
    <div grow={false} className="icon_ellipsis">
      {loading ?
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress style={{ marginRight: '5px', color: 'blue', width: '25px', height: '25px' }} />

        </Box>
        : ""
      }
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
          {!isModelGroup &&
            <EuiListGroupItem onClick={onEdit} label="Modifier" />
          }
          <EuiListGroupItem onClick={onDelete} label="Supprimer" />
          <EuiListGroupItem
            onClick={onFixPosition}
            label={
              groupesWithData[idGroupe]?.positionFixed
                ? "Defixer la position"
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
              {examsGrouped && (isModelGroup || isModelGroup === 0)
                ? examsGrouped.length > 0 &&
                examsGrouped.map((group, i) => (
                  <EuiListGroupItem
                    key={i}
                    onClick={() => handleCreateGroupeLie(i)}
                    label={"group " + i}
                  />
                ))
                : exams.map(
                  (exam, i) =>
                    examId !== i && (
                      <EuiListGroupItem
                        key={i}
                        onClick={() => handleCreateExamenLie(i)}
                        label={`Examen ${i + 1}`}
                      />
                    )

                )}
            </EuiListGroup>
          </EuiPopover>
        </EuiListGroup>
      </EuiPopover>
    </div>
  );
};

export default Propover;
