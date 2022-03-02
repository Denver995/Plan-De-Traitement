import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {
  PersonOutline, 
  FmdGood, 
  CalendarToday, 
  AccessTime,
  MoreVert
} from '@mui/icons-material';
import './App.css';

function RecapExams() {

  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Examen 1
          <div className="timeline-content">
            <div className="header">
              <h4 className="spec">Spécilalité - Motif</h4>
              <MoreVert />
            </div>
            <div className="first-div">
              <div className="praticien">
                <PersonOutline />
                <p>Praticien</p>
              </div>
              <div className="rue">
                <FmdGood />
                <p>Rue</p>
              </div>
            </div>
            <div className="second-div">
              <div className="date">
                <CalendarToday />
                <p>Date</p>
              </div>
              <div className="heure">
                <AccessTime />
                <p>Heure</p>
              </div>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default RecapExams;
