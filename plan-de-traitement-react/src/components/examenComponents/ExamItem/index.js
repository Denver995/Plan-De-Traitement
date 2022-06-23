import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import "../../../utils/groupe-et-exam.css";
import Propover from "../../Propover";
import { formatExamNumber } from "../../../utils/helper";
import { getWindowSize } from "../../../hooks/dimensions";

import styles from "./styles";

const ExamItem = ({ data, showEditForm, color, id_modele, exam, index }) => {
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
  return (
    <div style={{ ...styles.lineWrapper, backgroundColor: exam.color }}>
      <div style={styles.flex}>
        <div>
          <Propover data={data} showEditForm={showEditForm} />
        </div>
        <div>
          <span
            className="icon-Trac-39 cardio-img"
            style={styles.tracIcon}
          ></span>
          <span style={styles.examen}>
            Examen {windowSize.innerWidth < 971 && windowSize.innerWidth > 729 ? formatExamNumber(index) : index}
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
