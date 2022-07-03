import { SERVER_URL, BASE_URL_API } from "../../utils/urls";

// export const createModel = async (data) => {
//   console.log('dataService: ', data);
//   const formData = new FormData();
//   formdata.append("nom", "new mel");
//   formdata.append("groupe_rdv", "0");
//   formdata.append("id_granularite_groupe", "4");
//   formdata.append("id_granularite_examen", "4");
//   formdata.append("id_entite", "4");
//   formdata.append("nb_occurence", "2");
//   formdata.append("espacement_groupe", "2");
//   formdata.append("espacement_examen", "4");
//   try {
//     const request = await fetch(`https://melanie.alaxione.fr/api/api_modeleexamen/modeleexamen`,{
//       method: 'POST',
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       body: formData,
//     });

//     // console.log({request: {
//     //   method: 'POST',
//     //   url: `https://melanie.alaxione.fr/api/api_modeleexamen/modeleexamen`,
//     //   headers: {
//     //     "Accept": "application/json",
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: formData
//     // }});
//     const response = await request.json();
//     console.log('response: ', response);
//     return response;
//   } catch (err) {
//     console.error('Service Err: ', err);
//   }
// }

class ModelService {

  createModelExamen = (data) => {
    var formdata = new FormData();
    formdata.append("nom", data.nom);
    formdata.append("groupe_rdv", data.groupe_rdv);
    formdata.append("nb_occurence", data.nb_occurence);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(BASE_URL_API+`/api_modeleexamen/modeleexamen`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    }

getModelExamen = (payload) => {
  const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_modeleexamen/modeleexamen/${payload}`, requestOptions);
}

deleteModelExamen = (id__model_examen) => {
  const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`/api_modeleexamen/modeleexamen/${id__model_examen}`, requestOptions);
}

updateModelExamen = (id_model_examen, payload) => {
   const requestOptions = {
      method: 'PUT',
      body: payload,
      redirect: 'follow'
    };
  return fetch(BASE_URL_API+`api_modeleexamen/modeleexamen/${id_model_examen}`, requestOptions);
}

}

export default new ModelService;

