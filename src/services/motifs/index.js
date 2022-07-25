import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class MotifsService {

  getListeMotif = () => {
    return http.get(BASE_URL_API + `api/api_motif_rdv/motif_rdv`);
  }

}

export default new MotifsService();

