import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class ModelService {
  //Done
  createModele = (data) => {
    var formdata = new FormData();
    formdata.append("nom", data.nom);
    formdata.append("groupe_rdv", data.groupe_rdv);
    formdata.append("id_granularite_groupe", data.id_granularite_groupe);
    formdata.append("id_granularite_examen", data.id_granularite_examen);
    formdata.append("id_entite", data.id_entite);
    formdata.append("nb_occurence", data.nb_occurence);
    formdata.append("espacement_groupe", data.espacement_groupe);
    formdata.append("espacement_examen", data.espacement_examen);

    return http.post(BASE_URL_API + "api/api_modeleexamen/modeleexamen", formdata);
  }
  //DONE
  getModele = () => {
    return http.get(BASE_URL_API + `api/api_modeleexamen/modeleexamen`);
  }
  //DONE
  deleteModele = (id__model_examen) => {
    return http.delete(BASE_URL_API + `api/api_modeleexamen/modeleexamen/${id__model_examen}`);
  }
  //DONE
  updateModele = (id_model_examen, data) => {
    var formdata = new FormData();
    formdata.append("nom", data.nom);
    formdata.append("groupe_rdv", data.groupe_rdv);
    formdata.append("id_granularite_groupe", data.id_granularite_groupe);
    formdata.append("id_granularite_examen", data.id_granularite_examen);
    formdata.append("id_entite", data.id_entite);
    formdata.append("complet", data.complet);
    formdata.append("nb_occurence", data.nb_occurence);
    formdata.append("espacement_groupe", data.espacement_groupe);
    formdata.append("espacement_examen", data.espacement_examen);
    return http.put(BASE_URL_API + `api/api_modeleexamen/modeleexamen/${id_model_examen}`, formdata);
  }

}

export default new ModelService();

