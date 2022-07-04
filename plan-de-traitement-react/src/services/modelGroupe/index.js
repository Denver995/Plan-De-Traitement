import {
  SERVER_URL,
  BASE_EXAMEN_URL,
  BASE_URL_API,
} from '../../utils/urls';
import http from '../http-helper';


class ModelGroupeService {

createModelGroupe = (values) => {
    console.log('Create Model Groupe Service ', values);
    const formdata = new FormData();
    formdata.append("nom", values.nom);
    formdata.append("nb_occurence", values.nb_occurence);
    formdata.append("groupe_rdv", values.groupe_rdv);
    formdata.append("id_entite", values.id_entite);
    formdata.append("periode", values.periode);
    formdata.append("id_modele", values.id_modele);

    console.log(values);

   /* const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };*/

  return http.post(BASE_URL_API+"/api_modelegroupe/modelegroupe", values);
}

getModelGroupe = (payload) => {

  return http.get(BASE_URL_API+`/api_modelegroupe/modelegroupe/${payload}`);
}

deleteModelGroupe = (id_model_groupe) => {
 
  return http.delete(BASE_URL_API+`/api_modelegroupe/modelegroupe/${id_model_groupe}`);
}

updateModelGroupe = (id_model_groupe, payload) => {
   
  return http.put(BASE_URL_API+`/api_modelegroupe/modelegroupe/${id_model_groupe}`, payload);
}


}


export default new ModelGroupeService;

