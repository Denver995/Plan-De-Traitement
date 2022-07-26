import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class LieuxService {

  getListeLieux = () => {
    return http.get(BASE_URL_API + `api/api_lieu/lieu`, {
      headers: {
        "x-alx-idc": "85flnlrfavxymwvma",
        "authorization": "alaxBOC@alaxione.fr 545541xfndwcsjpwvtita"
      }
    });
  }

}

export default new LieuxService();

