import GroupExamenItem from "./GroupExamenItem"
import "../utils/groupe-et-exam.css"
import '../App.css'
import { EuiButton, EuiButtonEmpty, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'


const AffichageDesGroupes = () => {
    return (
        <div className="affichage-groupes">
            <div className="model-info">
                <p>Modele :</p><br />
                <p className="num-model">Xxxxxx xxxxxxxxxxxxxxxxxxx XXXXXXXXXXX</p>
            </div>
            <div className="for-group-bloc">
                <div className="list-group">
                    <GroupExamenItem />
                    <span className='delai-inter-group'>delai entre "groupe 1" et "groupe 2"</span>
                    <GroupExamenItem />
                    <span className='delai-inter-group'>delai entre "groupe 1" et "groupe 2"</span>
                    <GroupExamenItem />
                    <span className='delai-inter-group'>delai entre "groupe 1" et "groupe 2"</span>
                    <GroupExamenItem />
                </div>
            </div>
            <div>
                <EuiFlexGroup
                    gutterSize="s"
                    alignItems="center"
                    style={{
                        paddingTop: "15px",
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginLeft: '15px',
                        marginRight: '15px'
                    }}>
                    <EuiFlexItem grow={false}>
                        <EuiButton
                            size="s"
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '20px',
                            }}>
                            Retour
                        </EuiButton>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        <EuiButton
                            size="s"
                            style={{ borderRadius: '20px'}}
                            fill>
                            Enregistrer
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        </div>
    )
}


export default AffichageDesGroupes