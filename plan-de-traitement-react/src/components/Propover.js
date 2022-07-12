import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup,
  EuiButtonEmpty,
} from "@elastic/eui";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { linkToGroup, mostBeEditable, setGroupeToEditeExam, SetShowGroupeContentForUpdate } from "../redux/examens/actions";
import { setComponent, setShowExamForm } from "../redux/commons/actions";
import {
  deleteExamGroup,
  deleteExamSimple,
  editExam,
  linkToExam,
  toggleFixExamPosition,
} from "../redux/examens/actions";

const Propover = ({
  isModelGroup,
  onDeleteGroup,
  idGroupe,
  onFixePosition,
  index,
  onEditItem,
  forEXam,
  setRerenderDel,
  examId,
  exam,
  groupKey,
  isExamGroup,
  setReload,
  onBack,
  isRecap,
}) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, setPopover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [panelRef] = useState(null);
  const contextMenuPopoverId = useGeneratedHtmlId({
    prefix: "contextMenuPopover",
  });
  const groupeToShowContentId = useSelector(state => state.ExamenReducer.groupeToShowContentId)
  const groupesWithData = useSelector(
    (state) => state.ExamenReducer.groupWithData
  );
  const groupesWithDataKeys = Object.keys(groupesWithData)
  const exams = useSelector((state) => state.ExamenReducer.exams);
  const closePopover = () => setPopover(false);

  const togglePropover = () => setPopover(!isPopoverOpen);

  const handleClick = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);
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
      dispatch(setComponent({ name: "EXAMENFORMEDIT", data: exam }));
      isRecap && onBack();
    }
    togglePropover();
  };

  const onDelete = () => {
    if (isModelGroup) {
      onDeleteGroup();
      togglePropover();
      setRerenderDel(true);
      return;
    }

    if (isExamGroup) {
      dispatch(
        deleteExamGroup({
          groupKey: groupKey,
          examId: examId,
        })
      );
    } else {
      dispatch(deleteExamSimple({ examId: examId }));
    }
    togglePropover();
  };

  const onFixPosition = () => {
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
      togglePropover();
      if (examId) {
        dispatch(
          toggleFixExamPosition({
            selectedExam: examId,
            isExamGroup: false,
          })
        );
      }
      onFixePosition()

    }
  };

  useEffect(() => {

  }, [groupesWithData])

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
              {groupesWithDataKeys && (isModelGroup || isModelGroup === 0)
                ? groupesWithDataKeys.length > 0 &&
                groupesWithDataKeys.map((group, i) => idGroupe !== "group " + i && (
                  <EuiListGroupItem
                    key={i}
                    onClick={() => {
                      if (idGroupe) {
                        let child = "group " + i
                        dispatch(linkToGroup({ idGroupe, child }))
                        handleClose();
                        togglePropover();
                      }
                    }}
                    label={`groupe ${i + 1}`}
                  />
                ))
                : groupeToShowContentId !== -1 &&
                  groupesWithData['group ' + groupeToShowContentId]?.exams?.length > 0 ?
                  groupesWithData['group ' + groupeToShowContentId]?.exams?.map(
                    (exam, i) => index !== i && (
                      <EuiListGroupItem
                        key={i}
                        onClick={() => {
                          // dispatch(linkToExam({ parent: examId, child: i }));
                          handleClose();
                          togglePropover();
                        }}
                        label={`Examen ${i + 1}`}
                      />
                    )
                  )
                  : exams.map(
                    (exam, i) =>
                      examId !== i && (
                        <EuiListGroupItem
                          key={i}
                          onClick={() => {
                            dispatch(linkToExam({ parent: examId, child: i }));
                            handleClose();
                            togglePropover();
                          }}
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
