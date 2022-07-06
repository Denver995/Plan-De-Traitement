import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup,
  EuiButtonEmpty,
} from "@elastic/eui";

import React, { useState } from "react";
import { useSelector } from "react-redux";

const Propover = ({
  isModelGroup,
  onDeleteGroup,
  idGroupe,
  onEditItem,
  onDeleteExam,
  onFixePosition,
  examId,
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
  const closePopover = () => setPopover(false);

  const togglePropover = () => setPopover(!isPopoverOpen);

  const handleClick = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

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

  const onDelete = () => {
    if (isModelGroup) {
      onDeleteGroup();
      return;
    }
    onDeleteExam();
    togglePropover();
    return;
  };

  const onFixPosition = () => {
    onFixePosition();
    togglePropover();
    console.log(idGroupe)
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
                            console.log("Parent ", examId+1, "Enfant: ", i + 1);
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
