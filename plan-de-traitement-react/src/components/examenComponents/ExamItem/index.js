import "../../../utils/groupe-et-exam.css";
import Propover from "../../Propover";

import styles from "./styles";

const ExamenItem = ({ data, showEditForm, color }) => {
  console.log("COlor: ", color);
  return (
    <div style={{ ...styles.lineWrapper, backgroundColor: color }}>
      <div style={styles.flex}>
        {/* <img src={elipse} alt='' height={15} width={15} /> */}
        {/* <span onClick={togglePropover} class="icon-ellipsis-v"></span> */}
        <div>
          <Propover data={data} showEditForm={showEditForm} />
        </div>
        {/* <RouteIcon className='cardio-img' /> */}
        <div>
          <span
            className="icon-Trac-39 cardio-img"
            style={styles.tracIcon}
          ></span>
          <span>Examen 1</span>
        </div>
      </div>
      <div>
        <span>"Spécialité"-"motif"</span>
        <span className="separate">|</span>
        <span className="praticien-info">"Praticien"-"Lieu"</span>
      </div>
    </div>
  );
};

export default ExamenItem;
