import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class PraticiensService {

  getListePraticien = () => {
    return http.get(BASE_URL_API + `api/api_praticien/praticie`, {
      headers: {
        "x-alx-idc": "85flnlrfavxymwvma",
        "authorization": "alaxBOC@alaxione.fr 545541xfndwcsjpwvtita"
      }
    });
  }

}

export default new PraticiensService();

