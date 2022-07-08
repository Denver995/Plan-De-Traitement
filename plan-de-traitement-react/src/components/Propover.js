import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup,
  EuiButtonEmpty,
} from "@elastic/eui";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetShowGroupeContentForUpdate } from "../redux/examens/actions";
import { setComponent } from "../redux/commons/actions";
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
  index,
  forEXam,
  setRerenderDel,
  onEditItem,
  onDeleteExam,
  onFixePosition,
  examId,
  exam,
  groupKey,
  isExamGroup,
  setReload,
  reload,
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
  const examsGrouped = useSelector((state) => state.ExamenReducer.examsGrouped);
  const groupesWithData = useSelector(
    (state) => state.ExamenReducer.groupWithData
  );
  const exams = useSelector((state) => state.ExamenReducer.exams);
  const closePopover = () => setPopover(false);

  const togglePropover = () => setPopover(!isPopoverOpen);

  const handleClick = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const onEdit = () => {
    dispatch(SetShowGroupeContentForUpdate(index))
    console.log("isExamGroup", isExamGroup)
    dispatch(editExam({ ...exam, id: examId + 1 }));
    if (isExamGroup) {
      console.log("groupeKey, examId, data ", groupKey, index, exam)
      dispatch(
        setComponent({
          name: "EXAMENFORMEDIT",
          groupKey: groupKey,
          examId: index ? index : examId,
          data: {
            groupKey: groupKey,
            data: groupesWithData
          },
        })
      );
    } else {
      dispatch(setComponent({ name: "EXAMENFORMEDIT", data: exam }));
      isRecap && onBack();
    }
    togglePropover();
  };

  const onDelete = () => {
    console.log("on passe ici", isModelGroup, isExamGroup)
    if (isModelGroup) {
      onDeleteGroup();
      setRerenderDel()
      return;
    }

    if (isExamGroup) {
      dispatch(
        deleteExamGroup({
          groupKey: groupKey,
          examId: examId,
        })
      );
      dispatch(SetShowGroupeContentForUpdate(-1))
    } else {
      dispatch(deleteExamSimple({ examId: examId }));
    }
    togglePropover();
  };

  const onFixPosition = () => {
    dispatch(SetShowGroupeContentForUpdate(-1))
    if (isExamGroup) {
      dispatch(
        toggleFixExamPosition({
          selectedExam: examId,
          groupKey: groupKey,
          isExamGroup: true,
        })
      );
    } else {
      onFixePosition()
      togglePropover();
      dispatch(SetShowGroupeContentForUpdate(-1))
      setRerenderDel(v=>!v)
      dispatch(
        toggleFixExamPosition({
          selectedExam: examId,
          isExamGroup: false,
        })
      );
    }
  };

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
          <EuiListGroupItem onClick={onEdit} label="Modifier" />
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
                    onClick={() => console.log("")}
                    label={"group " + i}
                  />
                ))
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
