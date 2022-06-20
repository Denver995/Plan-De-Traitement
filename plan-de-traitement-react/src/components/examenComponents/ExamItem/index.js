import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import "../../../utils/groupe-et-exam.css";
import Propover from "../../Propover";
import { formatExamNumber } from "../../../utils/helper";
import { getWindowSize } from "../../../hooks/dimensions";
import { deleteExamSimple } from '../../../redux/examens/actions';

import styles from "./styles";

const ExamenItem = ({ data, showEditForm, color, id_modele, exam }) => {
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

  console.log('data: ', data)
  return (
    <div style={{ ...styles.lineWrapper, backgroundColor: exam.color }}>
      <div style={styles.flex}>
        <div>
          <Propover onDelete={() => {
            console.log('examen simple delete')
            dispatch(deleteExamSimple(data))}
          } data={data} showEditForm={showEditForm} />
        </div>
        <div>
          <span
            className="icon-Trac-39 cardio-img"
            style={styles.tracIcon}
          ></span>
          <span style={styles.examen}>
            Examen {windowSize.innerWidth < 971 && windowSize.innerWidth > 729 ? formatExamNumber(id_modele) : id_modele}
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

export default ExamenItem;
