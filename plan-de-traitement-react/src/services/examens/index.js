
import {
  SERVER_URL,
  BASE_EXAMEN_URL,
  BASE_URL_API,
} from '../../utils/urls';
import http from '../http-helper';


class ExamenService {

createExamen = (payload) => {
    console.log('Create Examen Service ', payload);
    const formdata = new FormData();
    formdata.append("nom", payload.nom);
    formdata.append("id_modele", parseInt(payload.id_modele));
    formdata.append("id_modele_groupe", parseInt(payload.id_model_groupe));
    formdata.append("id_praticien", parseInt(payload.id_praticien));
    formdata.append("id_profession", parseInt(payload.id_profession));
    formdata.append("id_lieu",parseInt(payload.id_lieu));
    formdata.append("fixe", payload.fixe);
    formdata.append("position", payload.position);
    formdata.append("id_motif", parseInt(payload.id_motif));


    console.log("------------My form data------------------");
    console.log(payload);

  return http.post(BASE_URL_API+`/api_examen/examen`, formdata);
}
getExamen = (payload) => {
 
    return http.get(BASE_URL_API+`/api_examen/examen${payload}`);
}
deleteExamen = (id_examen) => {
  
    return http.delete(BASE_URL_API+`/api_examen/examen/${id_examen}`);

}
updateExamen = (id_examen, payload) => {
   
    return http.put(BASE_URL_API+`/api_examen/examen/${id_examen}`, payload);
}


}


export default new ExamenService;

