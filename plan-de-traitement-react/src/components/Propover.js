  import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup,
  EuiButtonEmpty,
} from "@elastic/eui";

import React, { useState } from "react";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import GroupeLieService from "../services/groupeLie";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setError } from "../redux/commons/actions";
import { setEspacement, setEspacementNonGroupe, setEspacementSubExam } from "../redux/examens/actions";
import examenService from '../services/examens';


const Propover = ({
  isModelGroup,
  onDeleteGroup,
  idGroupe,
  onEditItem,
  onDeleteExam,
  onFixePosition,
  examId,
  loading,
  idGroup
}) => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [panelRef] = useState(null);
  const contextMenuPopoverId = useGeneratedHtmlId({
    prefix: "contextMenuPopover",
  });
  const examsGrouped = useSelector((state) => state.ExamenReducer.examsGrouped);
  const groupesWithData = useSelector(state => state.ExamenReducer.groupWithData)
  const exams = useSelector((state) => state.ExamenReducer.exams);
  const examsListGroup = useSelector(state => state.ExamenReducer.examsListGroup);
  const listOfNewExam = useSelector(state => state.ExamenReducer.listOfNewExam);
  const closePopover = () => setPopover(false);
  const dispatch = useDispatch();
  const togglePropover = () => setPopover(!isPopoverOpen);
  const groupPayload = useSelector(state => state.ExamenReducer.groupPayload);
  const handleClick = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loadingg, setLoadingg] =useState(false);


  const onEdit = () => {
    // if (isModelGroup) {
    //   dispatch(setComponent({ name: "RECAPITULATIF", data: data }));
    //   return;
    // }
    // dispatch(editExam(data));
    // dispatch(setComponent({ name: "EXAMENFORMEDIT", data: data }));
    onEditItem();
    togglePropover();
  };

  const onDelete = (index) => {
    if (isModelGroup) {
      onDeleteGroup();
      return;
    }
    handleDeleteExamen(index);
    onDeleteExam();
    togglePropover();
    return;
  };

  const onFixPosition = () => {
    onFixePosition();
    togglePropover();
    console.log(idGroupe)
  };

  const handleBindGroup = (data) => {
    setErrorMessage(false);
    setLoadingg(true);
    GroupeLieService.createGroupeLie(data)
    .then(response => {
      setErrorMessage(false)
      dispatch(setError(null));
      setLoadingg(false);
    })
    .catch(error => {
     setLoadingg(false)
          setErrorMessage(true)
          if(error.message == "Network Error"){
            dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
          }else{
            dispatch(setError("Une erreur est survenue, veuillez réessayer"))
          }
    })
  }
  const handleCreateGroupeLie = (index) => {
    for(let i=0; i<groupPayload.length; i++){
      if(index === i){
        handleBindGroup({
        id_groupe_parent: idGroup,
        id_groupe_enfant: groupPayload[i].id_modele_groupe
    })
        return;
      }
     
    }
  }

  const handleBindExamen = (index) => {

  }

  const handleDeleteExamen = (index) => {
    for(let i=0; i<listOfNewExam.length; i++){
      if(index === i){
        examenService.deleteExamen(listOfNewExam[i].id)
        .then(response => {

        })
        .catch(error => {

        })
      }
    }
    
    togglePropover();
  }

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
    {loading ?
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress  style={{ marginRight: '5px', color: 'blue', width: '25px', height: '25px' }} />
                
                </Box>
                : ""
              }
      <EuiPopover
        id={contextMenuPopoverId}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="s"
        anchorPosition="downLeft"
        container={panelRef}
      >
        <EuiListGroup>
          <EuiListGroupItem onClick={onEdit} label="Modifier" />
          <EuiListGroupItem onClick={onDelete} label="Supprimer" /> 
          <EuiListGroupItem onClick={onFixPosition} label={groupesWithData[idGroupe]?.positionFixed ? "Defixer la position" : "Fixer position"} />
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
                      onClick={()=>handleCreateGroupeLie(i)}
                      label={"group " + i}
                    />
                  ))
                : exams.map(
                    (exam, i) =>
                      examId !== i && (
                        <EuiListGroupItem
                          key={i}
                          onClick={() => handleBindExamen(i)}
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
