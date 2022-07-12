import {
  SERVER_URL,
  BASE_EXAMEN_URL,
} from '../../utils/urls';

export const createExamen = (values) => {
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

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://melanie.alaxione.fr/api/api_examen/examen", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}