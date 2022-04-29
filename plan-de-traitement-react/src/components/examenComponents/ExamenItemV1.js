import { EuiSpacer } from '@elastic/eui';
import '../../utils/groupe-et-exam.css'
import Propover from '../Propover';



const ExamenItem = ({data, showEditForm}) => {

    return (
        <div className='exam-item-content'>
            <div className="exam-item">
                <div className='bloc-1'>
                    {/* <img src={elipse} alt='' height={15} width={15} /> */}
                    {/* <span onClick={togglePropover} class="icon-ellipsis-v"></span> */}
                    <Propover data={data} showEditForm={showEditForm}/>
                    <EuiSpacer size="xxl" />
                    {/* <RouteIcon className='cardio-img' /> */}
                    <span class="icon-Trac-39 cardio-img" style={{marginLeft: 12, marginRight: 4}}></span>
                    <p>Examen 1</p>
                </div>
                <div className='bloc-2'>
                    <p>"Spécialité"-"motif"</p>
                    <p className='separate'>|</p>
                    <p className='praticien-info'>"Praticien"-"Lieu"</p>
                </div>
            </div>
        </div>
    )
}

export default ExamenItem