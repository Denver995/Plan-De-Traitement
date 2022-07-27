import {
  BASE_URL_API
} from '../../utils/urls';
import http from '../http-helper';


class GroupeLieService {
  //DONE
  createGroupeLie = (values) => {
    const formdata = new FormData();
    formdata.append("id_groupe_parent", values.id_groupe_parent);
    formdata.append("id_groupe_enfant", values.id_groupe_enfant);
    // formdata.append("espacement_min", values.espacement_min);
    // formdata.append("espacement_max", values.espacement_max);


    return http.post(BASE_URL_API + "api/api_groupelie/groupelie", formdata);
  }

  //NOT DONE
  getGroupeLie = (idParent, idEnfant) => {

    return http.get(BASE_URL_API + `api/api_groupelie/groupelie?id_groupe_parent=${idParent}&id_groupe_enfant=${idEnfant}`);
  }
  //NOT DONE
  deleteGroupeLie = (id_groupelie) => {

    return http.delete(BASE_URL_API + `api/api_groupelie/groupelie/${id_groupelie}`);
  }

}


export default new GroupeLieService();

