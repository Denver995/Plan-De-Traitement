import { SERVER_URL, BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
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

  createModel = (data) => {
    var formdata = new FormData();
    formdata.append("nom", data.nom);
    formdata.append("groupe_rdv", data.groupe_rdv);
    formdata.append("nb_occurence", data.nb_occurence);

    console.log("my value for model");
    console.log(formdata);

    return http.post(BASE_URL_API + "/api_modeleexamen/modeleexamen", formdata);
  }

  getModel = (payload) => {

    return http.get(BASE_URL_API + `/api_modeleexamen/modeleexamen/${payload}`);
  }

  deleteModel = (id__model_examen) => {

    return http.delete(BASE_URL_API + `/api_modeleexamen/modeleexamen/${id__model_examen}`);
  }

  updateModel = (id_model_examen, payload) => {


    return http.put(BASE_URL_API + `api_modeleexamen/modeleexamen/${id_model_examen}`, payload);
  }

}

export default new ModelService;

