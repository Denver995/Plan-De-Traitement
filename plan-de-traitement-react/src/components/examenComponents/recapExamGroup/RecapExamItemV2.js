import { EuiIcon } from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ReactComponent as PinIcon } from "../../../assets/svgs/Groupe 301.svg";
import { deleteGroup } from "../../../redux/examens/actions";
import colors from "../../../utils/colors";
import Propover from "../../Propover";

const RecapExamItemV2 = ({ color, date, position, index_, data, groupKey, onFixePosition }) => {
  const groupesWithData = useSelector(state => state.ExamenReducer.groupWithData);
  const dispatch = useDispatch()
  const [reRenderDel, setRerenderDel] = useState(false)
  const espacementSubExam = useSelector(
    (state) => state.ExamenReducer.espacementSubExam
  );
  useEffect(() => {
    setRerenderDel(true)
  }, [reRenderDel, groupesWithData])
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "white",
        border: "1px solid",
        padding: 10,
        marginBottom: 10,
        marginTop: -40,
      }}
      position={position}
    >
      {position === "left" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: -10,
            marginRight: -5,
          }}
        >
          <Propover onFixePosition={onFixePosition} idGroupe={groupKey} setRerenderDel={setRerenderDel} isModelGroup={true} index={index_} forEXam={false} onDeleteGroup={() => {
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
          <Propover onFixePosition={onFixePosition} idGroupe={groupKey} setRerenderDel={setRerenderDel} isModelGroup={true} onDeleteGroup={() => {
            dispatch(deleteGroup(groupKey));
            setRerenderDel(true);
          }} index={index_} forEXam={false} />
          {groupesWithData[groupKey]?.positionFixed && <PinIcon width={7} height={11} />}
        </div>
      )}

      {data?.map((exam, index) => (
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
              <div className="card-content-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                <h4 style={{ fontSize: 13, color: colors.primarySombre }}>
                  <strong>
                    {exam.id_specialite ? exam.id_specialite : "Spécialité"} -{" "}
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
                espacementSubExam["group " + index_]["subEspace " + index][
                  espacementSubExam["group " + index_]["subEspace " + index]
                    .length - 1
                ].minIntervalUnit +
                "-" +
                espacementSubExam["group " + index_]["subEspace " + index][
                  espacementSubExam["group " + index_]["subEspace " + index]
                    .length - 1
                ].maxInterval +
                espacementSubExam["group " + index_]["subEspace " + index][
                  espacementSubExam["group " + index_]["subEspace " + index]
                    .length - 1
                ].maxIntervalUnit}
            </p>
          )}
        </div>
      ))}
    </VerticalTimelineElement>
  );
};
export default RecapExamItemV2;
