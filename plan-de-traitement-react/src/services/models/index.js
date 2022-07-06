import { SERVER_URL, BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';

class ModelService {
  //Done
  createModele = (data) => {
    var formdata = new FormData();
    formdata.append("nom", data.nom);
    formdata.append("groupe_rdv", data.groupe_rdv);
    formdata.append("id_entite", data.id_entite);

    console.log("my value for model");
    console.log(formdata);

    return http.post(BASE_URL_API + "/api_modeleexamen/modeleexamen", formdata);
  }
  //IN PROGRESS
  getModele = () => {
    return http.get(BASE_URL_API + `/api_modeleexamen/modeleexamen`);
  }
  //DONE
  deleteModele = (id_model_examen) => {
    return http.delete(BASE_URL_API + `/api_modeleexamen/modeleexamen/?id_model_examen=${id_model_examen}`);
  }
  //NOT DONE
  updateModele = (id_model_examen, payload) => {
    return http.put(BASE_URL_API + `api_modeleexamen/modeleexamen/?id_model_examen=${id_model_examen}`, payload);
  }

}

export default new ModelService;

