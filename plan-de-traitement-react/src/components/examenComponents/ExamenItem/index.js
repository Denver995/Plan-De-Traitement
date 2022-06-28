import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup,
} from "@elastic/eui";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { editExam } from "../../../redux/commons/actions";
import styles from "./styles";

const ExamenItem = ({ data, showEditForm, color }) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, setPopover] = useState(false);
  const [panelRef] = useState(null);

  const contextMenuPopoverId = useGeneratedHtmlId({
    prefix: "contextMenuPopover",
  });

  const closePopover = () => setPopover(false);

  const togglePropover = () => setPopover(!isPopoverOpen);

  const onEdit = () => {
    dispatch(editExam(data));
    showEditForm(true);
  };

  const button = (
    <span onClick={togglePropover} className="icon-ellipsis-v"></span>
  );

  const Pop = () => (
    <div style={styles.flex}>
      <span className="icon_ellipsis">
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
            <EuiListGroupItem onClick={() => {}} label="Supprimer" />
            <EuiListGroupItem onClick={() => {}} label="Fixer la position" />
            <EuiListGroupItem
              onClick={() => {}}
              label="Lier avec un autre examen"
            />
          </EuiListGroup>
        </EuiPopover>
      </span>
      <span
        style={styles.mx10}
        onClick={togglePropover}
        className="icon-Trac-39"
      ></span>
      <span>{data.label ?? "Examen 1"}</span>
    </div>
  );

  return (
    <div style={{ marginLeft: 10, marginRight: 10, marginBottom: 5 }}>
      <div style={{ ...styles.lineWrapper, backgroundColor: color }}>
        <div>
          <Pop />
        </div>
        <div>
          <span>*Specialite*-*motif*</span>
          <span>|</span>
          <span>*Praticien*-*lieu*</span>
        </div>
      </div>
      <p style={styles.delay}>delai entre exams</p>
    </div>
  );
};

export default ExamenItem;
