import {
  SERVER_URL,
  BASE_EXAMEN_URL,
  BASE_URL_API,
} from '../../utils/urls';
import http from '../http-helper';


class ExamenLieService {
//NOT DONE
createExamenLie = (values) => {
    console.log('Create Examen Lie Service ', values);
    const formdata = new FormData();
    formdata.append("nom", values.nom);
    formdata.append("id_modele", values.id_modele);
    formdata.append("id_modele_groupe", values.id_model_groupe);
    formdata.append("id_praticien", values.id_praticien);
    formdata.append("id_profession", values.id_profession);
    formdata.append("id_lieu", values.id_lieu);
    formdata.append("fixe", values.fixe);
    formdata.append("position", values.position);
    formdata.append("id_motif", values.id_motif);

    console.log(values);

    
  return http.post(BASE_URL_API+"/api_examenlie/examenlie", values);
}

//NOT DONE
getExamenLie = (payload) => {

  return http.get(BASE_URL_API+`/api_examenlie/examenlie/${payload}`);
}
//NOT DONE
deleteExamenLie = (id_examenlie) => {

   return http.delete(BASE_URL_API+`/api_examenlie/examenlie/${id_examenlie}`);
}
//NOT DONE
updateExamenLie = (id_examenlie, payload) => {
 
   return http.put(BASE_URL_API+`/api_examenlie/examenlie/${id_examenlie}`, payload);
}


}


export default new ExamenLieService;

