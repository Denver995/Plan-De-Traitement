import {
  BASE_URL_API
} from '../../utils/urls';
import http from '../http-helper';


class ExamenLieService {
  //NOT DONE
  createExamenLie = (values) => {
    const formdata = new FormData();
    formdata.append("id_examen_parent", values.id_examen_parent);
    formdata.append("id_examen_enfant", values.id_examen_enfant);
    if (values.espacement_min)
      formdata.append("espacement_min", values.espacement_min);
    if (values.espacement_max)
      formdata.append("espacement_max", values.espacement_max);

    return http.post(BASE_URL_API + "api/api_examenlie/examenlie", formdata);
  }

  //NOT DONE
  getExamenLie = (payload) => {

    return http.get(BASE_URL_API + `api/api_examenlie/examenlie/${payload}`);
  }
  //NOT DONE
  deleteExamenLie = (id_examenlie) => {

    return http.delete(BASE_URL_API + `api/api_examenlie/examenlie/${id_examenlie}`);
  }
  //NOT DONE
  updateExamenLie = (id_examenlie, values) => {
    const formdata = new FormData();
    formdata.append("id_examen_parent", values.id_examen_parent);
    formdata.append("id_examen_enfant", values.id_examen_enfant);
    if (values.espacement_min)
      formdata.append("espacement_min", values.espacement_min);
    if (values.espacement_max)
      formdata.append("espacement_max", values.espacement_max);

    return http.put(BASE_URL_API + `api/api_examenlie/examenlie/${id_examenlie}`, formdata);
  }


}


export default new ExamenLieService();

