import React from 'react';
import {EuiIcon} from '@elastic/eui';
import { VerticalTimelineElement } from "react-vertical-timeline-component";
// import "../../Recapitulatif.css";
import Propover from "../Propover";
import { getHSPBrightness } from '../../utils/helper';
import colors from '../../utils/colors';

function ExamCard({color, date, position}) {
    console.log('coleur: ', getHSPBrightness(color));
    return (
        // <div>
            // <div className="exam-title">{props.examen}</div>
            <VerticalTimelineElement
                contentStyle={{ background: color ? color: colors.primary, height: 90, marginTop: -40 }}
                date={date}
                position={position}
                iconStyle={{
                background: "rgb(19, 83, 117)",
                color: "#fff",
                border: "rgb(19, 83, 117)",
                }}
            >
                <div className="exam-card-content">
                    <div className="card-content-header">
                        {/* <EuiIcon type="boxesVertical" id="iconList" /> */}
                        {/* <span class="icon-ellipsis-v iconList"></span> */}
                        <Propover />
                        <h4 className="spec" style={{}}>
                        <strong>*Spécilalité* - *Motif*</strong>
                        </h4>
                    </div>
                </div>
                <div className="first-div">
                <div className="praticien">
                    <EuiIcon type="user" id="icon" />
                    {/* <span class="icon-Groupe-367"></span> */}
                    <h4 className="prc">*Praticien*</h4>
                    <EuiIcon type="visMapCoordinate" />
                    {/* <span class="icon-Groupe-368"></span> */}
                    <h4 className="spec">
                    *00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*
                    </h4>
                </div>
                </div>
                <div className="first-div">
                <div className="praticien">
                    <EuiIcon type="calendar" id="icon" />
                    {/* <span class="icon-Groupe-254" id="icon"></span> */}
                    <h4 className="prc">00/00/0000</h4>
                    <EuiIcon type="clock" id="icon" />
                    <h4 className="spec">00h00</h4>
                </div>
                </div>
            
            </VerticalTimelineElement>
        // </div>
    );
}

export default ExamCard;
