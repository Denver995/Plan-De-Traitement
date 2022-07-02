import {
  SERVER_URL,
  BASE_EXAMEN_URL,
  BASE_URL_API,
} from '../../utils/urls';


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

    console.log(formdata);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

  return fetch(BASE_URL_API+"/api_modelegroupe/modelegroupe", requestOptions);
}

getModelGroupe = (payload) => {
  const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_modelegroupe/modelegroupe/${payload}`, requestOptions);
}

deleteModelGroupe = (id_model_groupe) => {
  const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_modelegroupe/modelegroupe/${id_model_groupe}`, requestOptions);
}

updateModelGroupe = (id_model_groupe, payload) => {
   const requestOptions = {
      method: 'PUT',
      body: payload,
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_modelegroupe/modelegroupe/${id_model_groupe}`, requestOptions);
}


}


export default new ModelGroupeService;

