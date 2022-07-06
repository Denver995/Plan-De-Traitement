import {
  SERVER_URL,
  BASE_EXAMEN_URL,
  BASE_URL_API,
} from '../../utils/urls';
import http from '../http-helper';


class GroupeLieService {
//NOT DONE
createGroupeLie = (values) => {
    console.log('Create Groupe Lie Service ', values);
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

  return http.post(BASE_URL_API+"/groupelie", values);
}
//NOT DONE
getGroupeLie = (id_groupe_parent,id_groupe_enfant) => {
  return http.get(BASE_URL_API+`/groupelie/?id_groupe_parent=${id_groupe_parent}&id_groupe_enfant=${id_groupe_enfant}`);
}
//NOT DONE
deleteGroupeLie = (id_groupelie) => {
  return http.delete(BASE_URL_API+`/groupelie/${id_groupelie}`);
}
//NOT DONE
updateGroupeLie = (id_groupelie, payload) => {
 
  return http.put(BASE_URL_API+`/groupelie/${id_groupelie}`, payload);
}


}


export default new GroupeLieService;

