import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class PraticiensService {

  getListePraticien = (idtyperdv, idlieux) => {
    return http.get(BASE_URL_API + `ajax/liste_praticien.php?idc=85flnlrfavxymwvma&idtyperdv=` + idtyperdv + `&idlieux=` + idlieux)
  }

}

export default new PraticiensService();

