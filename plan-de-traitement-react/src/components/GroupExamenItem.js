import '../App.css'
import elipse from '../assets/svgs/ellipsis-v.svg'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExamenItem from './ExamenItemV1';

const GroupExamenItem = () => {
    return (
        <div className='groups-content'>
            <div className="group-exam-item">
                <div className='bloc-1'>
                    <img src={elipse} alt='' height={15} width={15} />
                    <p>Groupe 1</p>
                </div>
                <div className='bloc-2'>
                    <p>Periode de recherche : 00h</p>
                    <ArrowDropDownIcon />
                </div>
            </div>
            <div className='exams'>
                <div style={{ marginBottom: '20px' }}>
                    <hr className='divisor' color='#5d9ad4' size="1"></hr>
                    <div className='divisor-btn'>
                        + Ajouter un  examen
                    </div>
                </div>
                <ExamenItem />
                <span className='delai-inter-exam'>delai entre "examen 1" et "examen 2" : 5h</span>
                <ExamenItem />
                <span className='delai-inter-exam'>delai entre "examen 2" et "examen 3" : 3h</span>
                <ExamenItem />
            </div>
        </div>
    )
}


export default GroupExamenItem