import { EuiIcon, EuiText } from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ReactComponent as PinIcon } from "../../../assets/svgs/Groupe 301.svg";
import { deleteGroup } from "../../../redux/examens/actions";
import colors from "../../../utils/colors";
import { getFisrtLetter } from "../../../utils/helper";
import Propover from "../../Propover";
import styles from "./style";
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
} from '@elastic/eui';
import { bgcolor } from "@mui/system";
import { type_espacement } from "../../../utils/constants";
import EspacementInterExamenForm from "../../EspacementInterExamenForm";

const RecapExamItemV2 = ({
  color,
  date,
  position,
  index_,
  data,
  groupKey,
  onFixePosition,
  group,
  groupesWithData
}) => {
  const dispatch = useDispatch();
  const [showInterExam, setShowInterExam] = useState(false)
  const [reRenderDel, setRerenderDel] = useState(false);
  const [childId, setChildId] = useState(-1)
  const espacement = useSelector(state => state.ExamenReducer.espacement);
  const espace = espacement["espace " + index_];
  const espacementSubExam = useSelector(
    (state) => state.ExamenReducer.espacementSubExam
  );
  const praticienData = useSelector(state => state.ExamenReducer?.praticienData);
  const specialitieData = useSelector(state => state.ExamenReducer.specialitieData);
  const lieuData = useSelector(state => state.ExamenReducer.lieuData);
  const motifData = useSelector(state => state.ExamenReducer.motifData);
  useEffect(() => {
    setRerenderDel(true)
  }, [reRenderDel])
  useEffect(() => { }, [groupesWithData])
  useEffect(() => {
    handleGetSpecialitie();
    handleGetPraticien();
    handleGetLieu();
    handleGetMotif();
  }, [groupesWithData]);

  const handleGetSpecialitie = (examen) => {
    specialitieData.forEach(element => {
      if (element.id == examen?.id_profession) {
        return element.libelle;
      }
    });

  };
  const handleGetPraticien = (examen) => {
    if (praticienData && praticienData.length > 0)
      praticienData.forEach(element => {
        if (element.id_user == examen?.id_praticien) {
          return element?.nom_sms_user + " " + element?.prenom
        }
      });

  };
  const handleGetLieu = (examen) => {
    lieuData.forEach(element => {
      if (element.id_lieu == examen?.id_lieu) {
        return element.libelle_lieu;
      }
    });

  };
  const handleGetMotif = (examen) => {
    motifData.forEach(element => {
      if (element.id == examen?.id_motif) {
        return element?.libelle
      }
    });

  };
  const onDragEnd = ({ source, destination }) => {

  };

  return (
    <>
      {showInterExam ? (<EspacementInterExamenForm
        onClose={(data) => setShowInterExam(!data)}
        forSubExam={true}
        typeEspacement={type_espacement.examen}
        initialIndex={childId}
        parentSubExamId={index_}
        initialId={index_}
      />) :
        (<VerticalTimelineElement
          className="custom-vertical-timeline-element-group"
          contentStyle={{
            background: "white",
            border: "1px solid #5d9ad4",
            padding: 10,
            marginBottom: 10,
            marginTop: -55,
          }}
          position={position}
          date={(espace &&
            espace[0] &&
            espace[0].minInterval) ?
            (espace[0]?.minInterval + getFisrtLetter(espace[0]?.minIntervalUnit) + "-" +
              espace[0]?.maxInterval + getFisrtLetter(espace[0]?.maxIntervalUnit)) : ""}
        >
          <EuiText style={position === "right" ? styles.textRight : styles.text}>
            Groupe {index_ + 1}
          </EuiText>
          <div
            style={
              position === "right" ? styles.dotContainer : styles.dotContainerLeft
            }
            className="dotContainer-right"
          >
            <div style={styles.dotChild}></div>
          </div>
          {group.id_child !== undefined && (
            <div
              className="custom-bar"
              style={position === "right" ? styles.customBar : styles.customBarLeft}
            ></div>
          )}
          {position === "left" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: -10,
                alignItems: "center",
                marginRight: -5,
              }}
            >
              <Propover isGroup={true} isRecap={true} onFixePosition={onFixePosition} groupKey={groupKey} setRerenderDel={setRerenderDel} isModelGroup={true} index={index_} forEXam={false} onDeleteGroup={() => {
                dispatch(deleteGroup(groupKey));
                setRerenderDel(true);
              }} />
              {groupesWithData[groupKey]?.positionFixed && <PinIcon width={7} height={11} />}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
                marginLeft: -5,
                marginRight: -10,
              }}
            >
              <Propover isGroup={true} isRecap={true} onFixePosition={onFixePosition} groupKey={groupKey} setRerenderDel={setRerenderDel} isModelGroup={true} onDeleteGroup={() => {
                dispatch(deleteGroup(groupKey));
                setRerenderDel(true);
              }} index={index_} forEXam={false} />
              {groupesWithData[groupKey]?.positionFixed && <PinIcon width={7} height={11} />}
            </div>
          )}

          <div>
            <EuiDragDropContext onDragEnd={onDragEnd}>
              <EuiDroppable droppableId="examen" style={{ backgroundColor: "white" }} >
                {(provided) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {groupesWithData[groupKey]?.exams?.map((exam, index) => (
                        <EuiDraggable key={"item-" + index} index={index}
                          draggableId={"draggable-" + index}>
                          <div key={index}>
                            <div
                              style={{
                                backgroundColor: exam.color_type_rdv,
                                padding: 5,
                                marginBottom: data.length - 1 !== index ? 1 : 0,
                                boxShadow: "0px 3px 6px #00000029",
                                marginLeft: 6,
                                marginRight: position === "right" ? 6 : 0,
                              }}
                            >
                              <div style={{ marginBottom: 14 }}>
                                <div
                                  className="card-content-header"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <h4 style={{ fontSize: 13, color: colors.primarySombre }}>
                                    <strong>
                                      {exam.id_profession && handleGetSpecialitie(exam)}
                                      {exam.id_modif && (<>
                                        -{" "} {handleGetMotif(exam)}</>)}
                                    </strong>
                                  </h4>
                                  {exam.positionFixed && <PinIcon width={7} height={11} />}
                                </div>
                              </div>
                              <div>
                                <div className="praticien">
                                  {exam.id_praticien && (<>

                                    <EuiIcon type="user" id="icon" />
                                    <h4 className="prc">
                                      {handleGetPraticien(exam)}
                                    </h4>
                                  </>)}
                                  {exam.id_lieu && (<>
                                    <EuiIcon type="visMapCoordinate" id="icon" />
                                    <h4 style={{ fontSize: 13, color: colors.primarySombre }}>
                                      {handleGetLieu(exam)}
                                    </h4>
                                  </>)}
                                </div>
                              </div>
                            </div>
                            {index !== data.length - 1 && (
                              <p
                                onClick={() => {
                                  setChildId(index)
                                  setShowInterExam(
                                    true
                                  );
                                }}
                                style={{
                                  fontSize: 12,
                                  textDecoration: "underline",
                                  textAlign: "right",
                                  marginTop: 0,
                                  cursor: "pointer",
                                  marginBottom: 0,
                                  marginRight: position === "right" ? 5 : 0,
                                  color: colors.primarySombre,
                                }}
                              >
                                {(espacementSubExam["group " + index_]["subEspace " + index] &&
                                  espacementSubExam["group " + index_]["subEspace " + index]
                                    .length > 0) ?
                                  espacementSubExam["group " + index_]["subEspace " + index][
                                    espacementSubExam["group " + index_]["subEspace " + index]
                                      .length - 1
                                  ].minInterval +
                                  getFisrtLetter(espacementSubExam["group " + index_]["subEspace " + index][
                                    espacementSubExam["group " + index_]["subEspace " + index]
                                      .length - 1
                                  ].minIntervalUnit) +
                                  "-" +
                                  espacementSubExam["group " + index_]["subEspace " + index][
                                    espacementSubExam["group " + index_]["subEspace " + index]
                                      .length - 1
                                  ].maxInterval +
                                  getFisrtLetter(espacementSubExam["group " + index_]["subEspace " + index][
                                    espacementSubExam["group " + index_]["subEspace " + index]
                                      .length - 1
                                  ].maxIntervalUnit) : "Choisir l'intervalle inter examen"}
                              </p>
                            )}
                          </div>
                        </EuiDraggable>
                      ))}
                    </div>
                  )
                }}
              </EuiDroppable>
            </EuiDragDropContext>
          </div>
        </VerticalTimelineElement>)}
    </>
  );
};
export default RecapExamItemV2;
