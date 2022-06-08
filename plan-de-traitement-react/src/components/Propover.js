import {
  EuiPopover,
  useGeneratedHtmlId,
  EuiListGroupItem,
  EuiListGroup,
} from "@elastic/eui";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { editExam } from "../redux/examens/actions";

const Propover = ({ data, showEditForm }) => {
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

  return (
    <>
      <div>
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
              <EuiListGroupItem onClick={() => {}} label="Supprimer" />
              <EuiListGroupItem onClick={() => {}} label="Fixer la position" />
              <EuiListGroupItem
                onClick={() => {}}
                label="Lier avec un autre examen"
              />
            </EuiListGroup>
          </EuiPopover>
          {/* <EuiSpacer size="xxl" />
                    <EuiSpacer size="xxl" /> */}
        </div>
      </div>
    </>
  );
};

export default Propover;
