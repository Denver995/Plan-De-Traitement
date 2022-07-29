import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class LieuxService {

  getListeLieux = (idtyperdv) => {
    return http.get(BASE_URL_API + `ajax/liste_lieux.php?idc=85flnlrfavxymwvma&idtyperdv=` + idtyperdv
    );
  }

}

export default new LieuxService();

