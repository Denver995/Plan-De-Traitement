
import {
  BASE_URL_API
} from '../../utils/urls';
import http from '../http-helper';


class ExamenService {

  createExamen = (payload) => {
    console.log('Create Examen Service ', payload);
    const formdata = new FormData();
    //formdata.append("nom", payload.nom);
    formdata.append("id_modele", payload.id_modele);
    formdata.append("id_modele_groupe", payload.id_modele_groupe);
    formdata.append("color", payload.color);
    formdata.append("id_praticien", payload.id_praticien);
    formdata.append("id_profession", payload.id_profession);
    formdata.append("id_lieu",payload.id_lieu);
    formdata.append("fixe", payload.fixe);
    formdata.append("position", payload.position);
    formdata.append("id_motif", payload.id_motif);
    formdata.append("id_specialite", payload.id_specialite);


    console.log("------------My form data------------------");
    console.log(payload);

  return http.post(BASE_URL_API+`api/api_examen/examen`, formdata);
}

  getExamenByIds = (id_modele, id_modele_groupe,) => {
    return http.get(BASE_URL_API + `api/api_examen/examen?id_modele=${id_modele}&id_modele_groupe=${id_modele_groupe}`);
  }
  getAllExamen = () => {
    return http.get(BASE_URL_API + `api/api_examen/examenAll`);
  }
  deleteExamen = (id_examen) => {
    return http.delete(BASE_URL_API + `api/api_examen/examen/${id_examen}`);

  }
  updateExamen = (id_examen, payload) => {
    return http.put(BASE_URL_API + `api/api_examen/examen/${id_examen}`, payload);
  }


}


export default new ExamenService();

