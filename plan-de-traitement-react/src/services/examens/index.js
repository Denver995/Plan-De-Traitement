import {
  SERVER_URL,
  BASE_EXAMEN_URL,
  BASE_URL_API,
} from '../../utils/urls';


class ExamenService {

createExamen = (values) => {
    console.log('Create Examen Service ', values);
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

    console.log(formdata);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

  return fetch(BASE_URL_API+"/api_examen/examen", requestOptions);
}

createExamen1 = (payload) => {
  const requestOptions = {
      method: 'POST',
      body: payload,
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+"/api_examen/examen", requestOptions);
  
}

getExamen = (payload) => {
  const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_examen/examen${payload}`, requestOptions);
}

deleteExamen = (id_examen) => {
  const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_examen/examen/${id_examen}`, requestOptions);
}

updateExamen = (id_examen, payload) => {
   const requestOptions = {
      method: 'PUT',
      body: payload,
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_examen/examen/${id_examen}`, requestOptions);
}


}


export default new ExamenService;

