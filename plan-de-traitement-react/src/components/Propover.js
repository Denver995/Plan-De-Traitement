import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup
} from "@elastic/eui";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { editExam } from "../redux/examens/actions";
import { setComponent } from "../redux/commons/actions";

const Propover = ({ data, showEditForm, isModelGroup, onDeleteGroup, onDeleteExam }) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, setPopover] = useState(false);
  const [panelRef] = useState(null);
  const contextMenuPopoverId = useGeneratedHtmlId({
    prefix: "contextMenuPopover",
  });

  const closePopover = () => setPopover(false);

  const togglePropover = () => setPopover(!isPopoverOpen);

  const onEdit = () => {
    if (isModelGroup) {
      dispatch(setComponent({ name: "RECAPITULATIF", data: data }));
      return;
    }
    dispatch(editExam(data));
    dispatch(setComponent({ name: "EXAMENFORMEDIT", data: data }));
  };

  const onDelete = () => {
    console.log('data.groupKey ', data.groupKey);
    if(isModelGroup){
      onDeleteGroup();
      return;
    }
    onDeleteExam();
    return;
  };

  const onFixPosition = () => {};

  const button = (
    <span onClick={togglePropover} className="icon-ellipsis-v"></span>
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
          <EuiListGroupItem onClick={onFixPosition} label="Fixer la position" />
          {/* <EuiListGroupItem
            onClick={() => {}}
            label="Lier avec un autre examen"
          > */}
          {/* <EuiAccordion
            style={{ marginLeft: 9, marginTop: 8 }}
            arrowDisplay="right"
            id={simpleAccordionId}
            buttonContent={
              isModelGroup
                ? "Lier avec un autre groupe"
                : "Lier avec un autre examen"
            }
          >
            <EuiPanel color="red">
              {examsGrouped && (isModelGroup || isModelGroup === 0)
                ? examsGrouped.length > 0 &&
                  examsGrouped.map((group, i) => (
                    <p style={{ cursor: "pointer", paddingBottom: 5 }} key={i}>
                      {"group " + i}
                    </p>
                  ))
                : exams.map((exam, i) => (
                    <p style={{ cursor: "pointer", paddingBottom: 5 }} key={i}>
                      {exam.nom + " " + exam.id_modele}
                    </p>
                  ))}
            </EuiPanel>
          </EuiAccordion> */}
          {/* </EuiListGroupItem> */}
        </EuiListGroup>
      </EuiPopover>
    </div>
  );
};

export default Propover;
