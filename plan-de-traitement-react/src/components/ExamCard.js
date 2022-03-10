import React from 'react';
import {EuiIcon} from '@elastic/eui';
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "../Recapitulatif.css";

function ExamCard(props) {
    return (
        <div>
            <div className="exam-title">{props.examen}</div>
            <VerticalTimelineElement
                contentStyle={{ background: props.couleur, height: 90 }}
                date={props.date}
                position={props.position}
                iconStyle={{
                background: "rgb(19, 83, 117)",
                color: "#fff",
                border: "rgb(19, 83, 117)",
                }}
            >
                <div className="exam-card-content">
                <div className="card-content-header">
                    <EuiIcon type="boxesVertical" id="iconList" />
                    <h4 className="spec">
                    <strong>*Spécilalité* - *Motif*</strong>
                    </h4>
                </div>
                </div>
                <div className="first-div">
                <div className="praticien">
                    <EuiIcon type="user" id="icon" />
                    <h4 className="prc">*Praticien*</h4>
                    <EuiIcon type="visMapCoordinate" id="icon" />
                    <h4 className="spec">
                    *00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*
                    </h4>
                </div>
                </div>
                <div className="first-div">
                <div className="praticien">
                    <EuiIcon type="calendar" id="icon" />
                    <h4 className="prc">00/00/0000</h4>
                    <EuiIcon type="clock" id="icon" />
                    <h4 className="spec">00h00</h4>
                </div>
                </div>
            
            </VerticalTimelineElement>
        </div>
    );
}

export default ExamCard;
