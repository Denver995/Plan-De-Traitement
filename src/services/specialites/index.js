import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class SpecialiteService {

  getListeSpecialite = () => {
    return http.get(BASE_URL_API + `ajax/liste_profession.php?idc=195kltbymwehnkhevh&idcatprofession=25`);
  }

}

export default new SpecialiteService();

