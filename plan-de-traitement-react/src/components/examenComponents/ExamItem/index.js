import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getWindowSize } from "../../../hooks/dimensions";
import "../../../utils/groupe-et-exam.css";
import { formatExamNumber } from "../../../utils/helper";
import Propover from "../../Propover";
import styles from "./styles";
import colors from "../../../utils/colors";
import {setError} from "../../../redux/commons/actions";
import examenService from '../../../services/examens';
import {
  shareAllExams
} from "../../../redux/examens/actions";


const ExamItem = ({
  showEditForm,
  reRender,
  color,
  id_modele,
  exam,
  index,
  isExamGroup = false,
  groupKey,
  reload,
  setReload,
  loadingScreen,
}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [loading, setLoading] = useState(false);
  const modelData = useSelector(state => state.ModelsReducer.modelData);
  const praticienData = useSelector(state => state.ExamenReducer.praticienData);
  const specialitieData = useSelector(state => state.ExamenReducer.specialitieData);
  const examInfo = useSelector(state => state.ExamenReducer.examInfo);
  const colorsArr = ["primaryLight", "danger", "success", "warning"];
  const [specialite, setSpecialite] = useState("");
  const [praticien, setPraticien] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const examenSelected = useSelector(
    (state) => state.CommonReducer.examen.examData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    function handleWindowResiwe() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResiwe);
    return () => {
      window.removeEventListener("resize", handleWindowResiwe);
    };
  });
   const handleGetExams = () => {
    examenService.getExamenByModelId(modelData.id)
      .then((response) => {
        dispatch(shareAllExams(response.data));
      })
      .catch((error) => {
        
      });
  }

  const handleUpdateExams = () => {
    setLoading(true);
    setErrorMessage(false);
    examenService.updateExamen(exam[index]?.id_examen, {
            fixe: 1
    })
    .then(response => {
      setLoading(false)
      setErrorMessage(false);
      dispatch(setError(null));
    })
    .catch(error => {
     setLoading(false)
          setErrorMessage(true);
          if (error.message === "Network Error") {
            dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
          } else {
            dispatch(setError("Une erreur est survenue"))
          }
    })
  }

  const handleGetSpecialitie = () => {
    for(var i=0; i<specialitieData.length; i++){
      if(specialitieData[i]?.id == examInfo[index]?.id_specialite){
        setSpecialite(specialitieData[i].libelle);
        return;
      }
    }
  }
   const handleGetPraticien = () => {
    for(var i=0; i<praticienData.length; i++){
      if(praticienData[i]?.id_praticien == exam[index]?.id_praticien){
        setPraticien(praticienData[i].nom_praticien+" "+praticienData[i].prenom_praticien);
        return;
      }
    }
  }
  const handleLoading = (l) => {
    loadingScreen(l)
  }

  const handleDeleteExam = () => {
   
    setLoading(true);
    handleLoading(true);
    examenService.deleteExamen(exam[index]?.id_examen || examenSelected[index]?.id_examen)
    .then(response => {
      handleGetExams();
      setLoading(false);
      handleLoading(false);
    })
    .catch(error => {
      handleLoading(false);
     setLoading(false);
  
    })
  }
  const handleFixePosition = () => {
    handleUpdateExams();
  }


  useEffect(() => {
    handleGetSpecialitie();
    handleGetPraticien();
  }, [reRender]);
  return (
    <div style={{ ...styles.lineWrapper, backgroundColor: exam[index]?.color_type_rdv }}>
      <div style={styles.flex}>
        <div>
          <Propover
            index={index}
            onFixePosition={handleFixePosition}
            showEditForm={showEditForm}
            onDeleteExam={handleDeleteExam}
            exam={exam}
            isExamGroup={isExamGroup}
            groupKey={groupKey}
            examId={exam[index]?.id_examen}
            loading={loading}
            loadingScreen={handleLoading}
            setReload={() => setReload(!reload)}
          />
        </div>
        <div>
          <span
            className="icon-Trac-39 cardio-img"
            style={styles.tracIcon}
          ></span>
          <span style={styles.examen}>
            Examen{" "}
            {windowSize.innerWidth < 971 && windowSize.innerWidth > 729
              ? formatExamNumber(index + 1)
              : index + 1}
          </span>
        </div>
      </div>
      <div className="exam-item-infos">
        <span style={styles.special}>{specialite}</span>
        <span style={styles.separator}>|</span>
        <span className="praticien-info">{praticien}</span>
      </div>
    </div>
  );
};

export default ExamItem;
