import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class GranulariteService {

  getListeGranularite = () => {
    return http.get(BASE_URL_API + `api/api_granularite/granularite`);
  }

}

export default new GranulariteService();

