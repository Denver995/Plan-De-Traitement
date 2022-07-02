import {
  SERVER_URL,
  BASE_EXAMEN_URL,
  BASE_URL_API,
} from '../../utils/urls';


class ExamenLieService {

createExamenLie = (values) => {
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

  return fetch(BASE_URL_API+"/api_examenlie/examenlie", requestOptions);
}

getExamenLie = (payload) => {
  const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_examenlie/examenlie/${payload}`, requestOptions);
}

deleteExamenLie = (id_examenlie) => {
  const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_examenlie/examenlie/${id_examenlie}`, requestOptions);
}

updateExamenLie = (id_examenlie, payload) => {
   const requestOptions = {
      method: 'PUT',
      body: payload,
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_examenlie/examenlie/${id_examenlie}`, requestOptions);
}


}


export default new ExamenLieService;

