import '../utils/groupe-et-exam.css'
import RouteIcon from '@mui/icons-material/Route';
import elipse from '../assets/svgs/ellipsis-v.svg'



const ExamenItem = () => {
    return (
        <div className='exam-item-content'>
            <div className="exam-item">
                <div className='bloc-1'>
                    <img src={elipse} alt='' height={15} width={15} />
                    <RouteIcon className='cardio-img' />
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