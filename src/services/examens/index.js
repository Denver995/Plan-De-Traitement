
import {
  BASE_URL_API
} from '../../utils/urls';
import http from '../http-helper';


class ExamenService {
  createExamen = (payload) => {
    const formdata = new FormData();
    formdata.append("id_modele", payload.id_modele);
    if (payload.id_modele_groupe)
      formdata.append("id_modele_groupe", payload.id_modele_groupe);
    if (payload.id_praticien)
      formdata.append("id_praticien", payload.id_praticien);
    formdata.append("id_profession", payload.id_profession);
    formdata.append("id_lieu", payload.id_lieu);
    formdata.append("fixe", payload.fixe);
    formdata.append("position", payload.position);
    formdata.append("id_motif", payload.id_motif);

    return http.post(BASE_URL_API + `api/api_examen/examen`, formdata);
  }
  getExamenByIds = (id_modele, id_modele_groupe) => {

    return http.get(BASE_URL_API + `api/api_examen/examen?id_modele=${id_modele}&id_modele_groupe=${id_modele_groupe}`);
  }

  getExamenByModelId = (id_modele) => {
    return http.get(BASE_URL_API + `api/api_examen/examen?id_modele=${id_modele}`);
  }
  getAllExamen = () => {
    return http.get(BASE_URL_API + `api/api_examen/examenAll`);
  }
  deleteExamen = (id_examen) => {
    return http.delete(BASE_URL_API + `api/api_examen/examen/${id_examen}`);
  }
  updateExamen = (id_examen, payload) => {
    let objPatient = {}, objgroup = {}, data = {
      id_modele: payload.id_modele,
      id_profession: payload.id_modele,
      id_lieu: payload.id_lieu,
      fixe: payload.fixe,
      position: payload.position,
      id_motif: payload.id_motif,
    }

    if (payload.id_modele_groupe || (payload.id_modele_groupe && payload.id_modele_groupe !== 0))
      objgroup = { id_modele_groupe: payload.id_modele_groupe }

    let form = Object.assign(data, objgroup);

    if (payload.id_praticien)
      objPatient = {
        id_praticien: payload.id_praticien
      }


    let formdata = Object.assign(form, objPatient);

    return http.put(BASE_URL_API + `api/api_examen/examen/${id_examen}`, formdata);
  }


}


export default new ExamenService();

