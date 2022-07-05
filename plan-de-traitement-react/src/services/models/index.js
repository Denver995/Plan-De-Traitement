import { SERVER_URL, BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';

class ModelService {
  //Done
  createModele = (data) => {
    var formdata = new FormData();
    formdata.append("nom", data.nom);
    formdata.append("groupe_rdv", data.groupe_rdv);
    formdata.append("nb_occurence", data.nb_occurence);

    console.log("my value for model");
    console.log(formdata);

      return http.post(BASE_URL_API+"/api_modeleexamen/modeleexamen", formdata);
    }
    //IN PROGRESS
    getModele = (payload) => {

      return http.get(BASE_URL_API+`/api_modeleexamen/modeleexamen/${payload}`);
    }
    //DONE
    deleteModele = (id__model_examen) => {
      
       return http.delete(BASE_URL_API+`/api_modeleexamen/modeleexamen/${id__model_examen}`);
    }
    //NOT DONE
    updateModele = (id_model_examen, payload) => {
       
      
      return http.put(BASE_URL_API+`api_modeleexamen/modeleexamen/${id_model_examen}`, payload);
    }

}

export default new ModelService;

