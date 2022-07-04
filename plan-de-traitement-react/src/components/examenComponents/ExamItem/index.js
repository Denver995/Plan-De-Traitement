import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import "../../../utils/groupe-et-exam.css";
import Propover from "../../Propover";
import { formatExamNumber } from "../../../utils/helper";
import { getWindowSize } from "../../../hooks/dimensions";
import { deleteExamSimple, deleteExamGroup, editExam, toggleFixExamPosition } from "../../../redux/examens/actions";
import { setComponent } from "../../../redux/commons/actions";

import styles from "./styles";

const ExamItem = ({ showEditForm,reRender, color, id_modele, exam, index, isExamGroup=false, groupKey, reload, setReload }) => {
  const dispatch = useDispatch();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResiwe() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResiwe);
    return () => {
      window.removeEventListener("resize", handleWindowResiwe);
    };
  });

  useEffect(() => {

  }, [reRender])
  return (
    <div style={{ ...styles.lineWrapper, backgroundColor: exam.color }}>
      <div style={styles.flex}>
        <div>
          <Propover
            data={exam}
            showEditForm={showEditForm}
            onDeleteExam={() => {
              if(isExamGroup){
                dispatch(deleteExamGroup({groupKey: groupKey, examId: index}));
                setReload(!reload);
              }else dispatch(deleteExamSimple({examId: index}));
            }}
            onEditItem={() => {
              console.log('editing exam group ...');
              dispatch(editExam({...exam, id: index+1}));
              if(isExamGroup){
                dispatch(setComponent({ name: "EXAMENFORMEDIT", groupKey: groupKey, examId: index, data: exam }));
                // setReload(!reload);
              }else dispatch(setComponent({ name: "EXAMENFORMEDIT", data: exam }));
            }}
            onFixePosition={() => {
              if(isExamGroup)
                dispatch(toggleFixExamPosition({selectedExam: index, groupKey: groupKey, isExamGrouped: true}))
              else dispatch(toggleFixExamPosition({selectedExam: index, isExamGrouped: false}))
            }}
          />
        </div>
        <div>
          <span
            className="icon-Trac-39 cardio-img"
            style={styles.tracIcon}
          ></span>
          <span style={styles.examen}>
            Examen {windowSize.innerWidth < 971 && windowSize.innerWidth > 729 ? formatExamNumber(index) : index + 1}
          </span>
        </div>
      </div>
      <div className="exam-item-infos">
        <span style={styles.special}>Ophtalmologie - IVT antiVGEF</span>
        <span style={styles.separator}>|</span>
        <span className="praticien-info">Dr.Dupont - Centre Perpignan</span>
      </div>
    </div>
  );
};

export default ExamItem;
