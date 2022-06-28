import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup,
  EuiAccordion,
  EuiPanel,
  EuiButtonEmpty,
} from "@elastic/eui";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editExam } from "../redux/examens/actions";
import { setComponent } from "../redux/commons/actions";

const Propover = ({
  data,
  showEditForm,
  isModelGroup,
  onDeleteGroup,
  onEditItem,
  onDeleteExam,
}) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, setPopover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [panelRef] = useState(null);
  const contextMenuPopoverId = useGeneratedHtmlId({
    prefix: "contextMenuPopover",
  });

  // const deploymentsList: EuiListGroupProps['listItems'] = [
  //   {
  //     label: 'combining-binaries',
  //     iconType: 'logoAzureMono',
  //     size: 's',
  //   },
  //   {
  //     label: 'stack-monitoring',
  //     iconType: 'logoAWSMono',
  //     size: 's',
  //   },
  // ];
  const examsGrouped = useSelector((state) => state.ExamenReducer.examsGrouped);
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
  };

  const onDelete = () => {
    console.log("data.groupKey ", data.groupKey);
    if (isModelGroup) {
      onDeleteGroup();
      return;
    }
    onDeleteExam();
    return;
  };

  const onFixPosition = () => {};

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
          <EuiListGroupItem onClick={onFixPosition} label="Fixer la position" />
          <EuiPopover
            id="simpleAccordionId"
            isOpen={isOpen}
            closePopover={handleClose}
            anchorPosition="rightUp"
            button={
              <EuiButtonEmpty
                iconType="arrowRight"
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
                    <EuiListGroupItem key={i} label={"group " + i} />
                  ))
                : exams.map((exam, i) => (
                    <EuiListGroupItem
                      key={i}
                      label={exam.nom + " " + exam.id_modele}
                    />
                  ))}
            </EuiListGroup>
          </EuiPopover>
        </EuiListGroup>
      </EuiPopover>
    </div>
  );
};

export default Propover;
