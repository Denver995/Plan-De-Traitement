import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { ReactComponent as PinIcon } from "../../../assets/svgs/Groupe 301.svg";
import { ReactComponent as PersonIcon } from "../../../assets/svgs/Groupe-367.svg";
import { ReactComponent as MapIcon } from "../../../assets/svgs/Groupe-368.svg";
import Propover from "../../Propover";
import { setError } from "../../../redux/commons/actions";
import styles from "./style";
import examenService from '../../../services/examens';

function ExamCard({
  showEditForm,
  date,
  color,
  index,
  position,
  groupKey,
  examen,
  isExamGroup = false,
  examId,
  onBack,
  loadingScreen,
}) {
  const dispatch = useDispatch();
  const groupesWithData = useSelector(state => state.ExamenReducer.groupWithData);
  const praticienData = useSelector(state => state.ExamenReducer.praticienData);
  const specialitieData = useSelector(state => state.ExamenReducer.specialitieData);
  const lieuData = useSelector(state => state.ExamenReducer.lieuData);
  const motifData = useSelector(state => state.ExamenReducer.motifData);
  const examInfo = useSelector(state => state.ExamenReducer.examInfo);
  const examenSelected = useSelector(
    (state) => state.CommonReducer.examen.examData
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [specialite, setSpecialite] = useState("");
  const [praticien, setPraticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [motif, setMotif] = useState("");


  useEffect(() => {
    handleGetSpecialitie();
    handleGetPraticien();
    handleGetLieu();
    handleGetMotif();
  }, [groupesWithData])

  const handleUpdateExams = () => {
    setLoading(true);
    setErrorMessage(false);
    examenService.updateExamen(examenSelected[index].id_examen, {
      position: index + 1,
      id_modele: examenSelected[index]?.id_modele,
      id_modele_groupe: examenSelected[index]?.id_modele_groupe,
      id_praticien: examenSelected[index]?.id_praticien,
      id_profession: examenSelected[index]?.id_profession,
      id_lieu: examenSelected[index]?.id_lieu,
      fixe: examenSelected[index]?.fixe ? 1 : 0,
      id_motif: examenSelected[index]?.id_motif,
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

  const handleLoading = (l) => {
    loadingScreen(l)
  }

  const handleDeleteExam = () => {
    setLoading(true);
    handleLoading(true);
    examenService.deleteExamen(examen[index]?.id_examen)
      .then(response => {
        setLoading(false);
        handleLoading(false);
      })
      .catch(error => {
        handleLoading(false);
      })
  }
  const handleFixePosition = () => {
    handleUpdateExams();
  }

  const handleGetSpecialitie = () => {
    for (var i = 0; i < specialitieData.length; i++) {
      if (specialitieData[i]?.id === examInfo[index]?.id_profession) {
        setSpecialite(specialitieData[i].libelle);
        return;
      }
    }
  }
  const handleGetPraticien = () => {
    for (var i = 0; i < praticienData.length; i++) {
      if (praticienData[i]?.id_praticien == examen[index]?.id_praticien) {
        setPraticien(praticienData[i].nom_praticien + " " + praticienData[i].prenom_praticien);
        return;
      }
    }
  }
  const handleGetLieu = () => {
    for (var i = 0; i < lieuData.length; i++) {
      if (lieuData[i].id_lieu == examen[index]?.id_lieu) {
        setLieu(lieuData[i].libelle_lieu);
        return;
      }
    }
  }
  const handleGetMotif = () => {
    for (var i = 0; i < motifData.length; i++) {
      if (motifData[i]?.id_motif_rdv == examen[index]?.id_motif) {
        setMotif(motifData[i].libelle_motif_rdv);
        return;
      }
    }
  }
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: examen[index]?.color_type_rdv ? examen[index]?.color_type_rdv : "white",
        height: 82,
        marginTop: -40,
        boxShadow: examen.positionFixed && "inset 0px 3px 6px #00000029",
      }}
      date={date}
      position={position}
      iconStyle={{
        background: "rgb(19, 83, 117)",
        color: "#fff",
        border: "rgb(19, 83, 117)",
      }}
    >
      <div className="exam-card-content">
        <div
          style={position === "right" ? styles.rightHeader : styles.leftHeader}
        >
          <div
            style={position === "right" ? styles.propRight : styles.propLeft}
          >
            <Propover
              index={index}
              onFixePosition={handleFixePosition}
              showEditForm={showEditForm}
              onDeleteExam={handleDeleteExam}
              groupKey={groupKey}
              exam={examen}
              isExamGroup={isExamGroup}
              examId={examen[index]?.id_examen}
              loadingScreen={handleLoading}
              onBack={onBack}
              isRecap={true}
            />
          </div>
          <h4 className="spec" style={styles.speciality}>
            <strong>{specialite} - {motif ?? "id_motif"}</strong>
          </h4>
        </div>
      </div>
      <div style={styles.sectionPraticien}>
        <div>
          <div
            style={
              position === "right"
                ? styles.praticienRightContainer
                : styles.praticienLeftContainer
            }
          >
            <PersonIcon width={"1rem"} />
            <h4 style={styles.praticien}>
              {praticien ?? "id_praticien"}
            </h4>
            <MapIcon width={"0.7rem"} />
            <h4 style={styles.adresse}>{lieu ?? "id_lieu"}</h4>
          </div>
          {groupesWithData[groupKey]?.exams[index]?.positionFixed && (
            <PinIcon
              width={"7px"}
              height={"11px"}
              style={position === "right" ? styles.pinRight : styles.pinLeft}
            />
          )}
        </div>
      </div>
    </VerticalTimelineElement>
  );
}

export default ExamCard;
