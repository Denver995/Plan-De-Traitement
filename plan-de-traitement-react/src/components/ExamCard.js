import React from 'react';
import {EuiIcon} from '@elastic/eui';
import '../RecapitulatifRendezVous.css';

function ExamCard(props) {

    return (
        <div className="exam-card">
            <h3 className="exam-card-title">Examen 1</h3>
            <div className="exam-card-content" style={{"background": props.couleur}}>
                <div className="card-content-header">
                    <h4 className="spec">*Spécilalité* - *Motif*</h4>
                    <EuiIcon type='boxesVertical' id="iconList"/>
                </div>
                <div className="first-div">
                    <div className="praticien">
                        <EuiIcon type="user"  id="icon"/>
                        <p>*Praticien*</p>
                    </div>
                    <div className="rue">
                        <EuiIcon type='visMapCoordinate' id="icon"/>
                        <p>*00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*</p>
                    </div>
                </div>
                <div className="second-div">
                    <div className="date">
                        <EuiIcon type='calendar'  id="icon"/>
                        <p>00/00/0000</p>
                    </div>
                    <div className="heure">
                        <EuiIcon type='clock'  id="icon"/>
                        <p>00h00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamCard;
