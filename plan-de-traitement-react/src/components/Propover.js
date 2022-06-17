import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup,
  EuiAccordion,
  EuiPanel,
} from "@elastic/eui";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

import { editExam } from "../redux/examens/actions";

const Propover = ({ data, showEditForm, isModelGroup, onDelete, onFixPosition, examsGrouped, exams }) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, setPopover] = useState(false);
  const [panelRef] = useState(null);

  const contextMenuPopoverId = useGeneratedHtmlId({
    prefix: "contextMenuPopover",
  });

  const simpleAccordionId = useGeneratedHtmlId({ prefix: 'simpleAccordion' });
  const closePopover = () => setPopover(false);

  const togglePropover = () => setPopover(!isPopoverOpen);

  const onEdit = () => {
    dispatch(editExam(data));
    showEditForm(true);
  };

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
            <EuiAccordion style={{marginLeft: 9, marginTop: 8}} arrowDisplay="right" id={simpleAccordionId} buttonContent={isModelGroup ? "Lier avec un autre groupe": "Lier avec un autre examen"}>
              <EuiPanel color="subdued">
                {isModelGroup || isModelGroup === 0 ? (
                  examsGrouped.map((group, i) => <p key={i}>{"group " + i}</p>)
                ): (
                  exams.map((exam, i) => <p key={i}>{exam.nom + " " + exam.id_modele}</p>)
                )}
              </EuiPanel>
            </EuiAccordion>
          {/* </EuiListGroupItem> */}
        </EuiListGroup>
      </EuiPopover>
      {/* <EuiSpacer size="xxl" />
                    <EuiSpacer size="xxl" /> */}
    </div>
  );
};

const mapStateToProps = ({ ExamenReducer }) => ({
  exams: ExamenReducer.exams,
  examsGrouped: ExamenReducer.examsGrouped
});

export default connect(mapStateToProps)(Propover);
