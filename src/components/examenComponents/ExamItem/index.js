import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWindowSize } from "../../../hooks/dimensions";
import { setError } from "../../../redux/commons/actions";
import {
  shareAllExams
} from "../../../redux/examens/actions";
import examenService from '../../../services/examens';
import { typeScreen } from "../../../utils/constants";
import "../../../utils/groupe-et-exam.css";
import { formatExamNumber } from "../../../utils/helper";
import Propover from "../../Propover";
import styles from "./styles";


const ExamItem = ({
  showEditForm,
  reRender,
  exam,
  index,
  isExamGroup = false,
  groupKey,
  reload,
  setReload,
  loadingScreen,
  setPredecessor,
  groupWithData,
  praticienData
}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [loading, setLoading] = useState(false);
  const modelData = useSelector(state => state.ModelsReducer.modelData);
  const specialitieData = useSelector(state => state.ExamenReducer.specialitieData);
  const [specialite, setSpecialite] = useState("");
  const [praticien, setPraticien] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

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
      ;
  }

  const handleFixePosition = () => {
    setLoading(true);
    setErrorMessage(false);
    let payload = {
      id_modele: exam?.id_modele,
      id_modele_groupe: exam?.id_modele_groupe,
      id_praticien: exam?.id_praticien,
      id_profession: exam?.id_profession,
      id_lieu: exam?.id_lieu,
      fixe: 1,
      position: exam?.position,
      id_motif: exam?.id_motif,
    }

    examenService.updateExamen(exam?.id_examen, payload)
      .then(() => {
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
    if (specialitieData && specialitieData.length > 0)

      specialitieData.forEach(element => {
        if (element?.id == exam?.id_profession)
          setSpecialite(element.libelle);

      });

  }
  const handleGetPraticien = () => {
    console.log('sssssssssssssss ', praticienData);

    if (praticienData && praticienData.length > 0)

      praticienData.forEach(element => {
        if (exam?.id_praticien != 0)
          if (element?.id_user == exam?.id_praticien)
            setPraticien(element?.nom_sms_user + " " + element?.prenom);
        console.log('sssssssssssssss ', exam?.id_praticien);

      });
  }
  const handleLoading = (l) => {
    loadingScreen(l)
  }

  const handleDeleteExam = () => {

    setLoading(true);
    // handleLoading(true);
    examenService.deleteExamen(exam?.id_examen)
      .then(response => {
        handleGetExams();
        setLoading(false);
        // handleLoading(false);
      })
      .catch(error => {
        // handleLoading(false);
        setLoading(false);

      })
  }

  useEffect(() => {
    handleGetSpecialitie();
    handleGetPraticien();
  }, [reRender]);

  return (
    <div style={{ ...styles.lineWrapper, backgroundColor: exam.color_type_rdv }}>
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
            examId={exam?.id_examen}
            loading={loading}
            loadingScreen={handleLoading}
            setReload={() => setReload(!reload)}
            predecessor={typeScreen.examList}
            setPredecessor={setPredecessor}
            groupWithData={groupWithData}
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
        {praticien && praticien != "" && (
          <>
            <span style={styles.separator}>|</span>
            <span className="praticien-info">{praticien}</span>
          </>
        )}

      </div>
    </div>
  );
};

export default ExamItem;
