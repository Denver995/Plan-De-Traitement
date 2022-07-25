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

const RecapExamItemV2 = ({
  color,
  date,
  position,
  index_,
  data,
  groupKey,
  onFixePosition,
  group,
}) => {
  const groupesWithData = useSelector(
    (state) => state.ExamenReducer.groupWithData
  );
  const dispatch = useDispatch();
  const [reRenderDel, setRerenderDel] = useState(false);
  const espacement = useSelector(state => state.ExamenReducer.espacement);
  const espace = espacement["espace " + index_];
  const espacementSubExam = useSelector(
    (state) => state.ExamenReducer.espacementSubExam
  );
  useEffect(() => {
    setRerenderDel(true)
  }, [reRenderDel])
  useEffect(() => { }, [groupesWithData])

  return (
    <VerticalTimelineElement
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
          <Propover isRecap={true} onFixePosition={onFixePosition} idGroupe={groupKey} setRerenderDel={setRerenderDel} isModelGroup={true} index={index_} forEXam={false} onDeleteGroup={() => {
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
          <Propover isRecap={true} onFixePosition={onFixePosition} idGroupe={groupKey} setRerenderDel={setRerenderDel} isModelGroup={true} onDeleteGroup={() => {
            dispatch(deleteGroup(groupKey));
            setRerenderDel(true);
          }} index={index_} forEXam={false} />
          {groupesWithData[groupKey]?.positionFixed && <PinIcon width={7} height={11} />}
        </div>
      )}

      <div>
        {groupesWithData[groupKey]?.exams?.map((exam, index) => (
          <div key={index}>
            <div
              style={{
                backgroundColor: exam.color,
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
                      {exam.id_profession ? exam.id_profession : "Spécialité"} -{" "}
                      {exam.id_modif ? exam.id_modif : "exam.id_modif"}
                    </strong>
                  </h4>
                  {exam.positionFixed && <PinIcon width={7} height={11} />}
                </div>
              </div>
              <div>
                <div className="praticien">
                  <EuiIcon type="user" id="icon" />
                  <h4 className="prc">
                    {exam.id_praticien ? exam.id_praticien : "id_praticien"}
                  </h4>
                  <EuiIcon type="visMapCoordinate" id="icon" />
                  <h4 style={{ fontSize: 13, color: colors.primarySombre }}>
                    {exam.id_lieu}
                  </h4>
                </div>
              </div>
            </div>
            {index !== data.length - 1 && (
              <p
                style={{
                  fontSize: 12,
                  textDecoration: "underline",
                  textAlign: "right",
                  marginTop: 0,
                  marginBottom: 0,
                  marginRight: position === "right" ? 5 : 0,
                  color: colors.primarySombre,
                }}
              >
                {espacementSubExam["group " + index_]["subEspace " + index] &&
                  espacementSubExam["group " + index_]["subEspace " + index]
                    .length > 0 &&
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
                  ].maxIntervalUnit)}
              </p>
            )}
          </div>
        ))}
      </div>

    </VerticalTimelineElement>
  );
};
export default RecapExamItemV2;
