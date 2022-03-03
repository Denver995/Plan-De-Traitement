import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import '../Recapitulatif.css';

const RecapitulatifDesExamens = (props) =>{
  return (

        <div>
            <p className="division"> <strong>Recapitulatif des rendez vous</strong> </p>

            <p> <strong>Modéle : </strong></p> 
            <p>xxxxxxxxxx xxxxxxxxxxxxx XXXXX</p>
            <VerticalTimeline className="container"  lineColor={'rgb(19, 83, 117)'}>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date="2011 - present"
                iconStyle={{ background: 'rgb(19, 83, 117)', color: '#fff' }}
            
            >

            </VerticalTimelineElement>
            <VerticalTimelineElement 
                className="vertical-timeline-element"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date="2011 - present"
                iconStyle={{ background: 'rgb(19, 83, 117)', color: '#fff' }}
            
            >
                <h3 className="vertical-timeline-element-title">Dehors cest chaud tu connais</h3>
                <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                <p>
                Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                </p>
            </VerticalTimelineElement>

            </VerticalTimeline>
        </div>
)
}
export default RecapitulatifDesExamens;