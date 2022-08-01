import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class MotifsService {

  getListeMotif = (idprofession) => {
    return http.get(BASE_URL_API + `ajax/liste_rdv_backoffice.php?idc=195kltbymwehnkhevh&idc2=195kltbymwehnkhevh&idprofession=` + idprofession, {
      headers: {
        "Cookie": "AlaxioneAutreCentre=195kltbymwehnkhevh;PHPSESSID=vj1mt49plfeq12udado1bdi2o3;AlaxioneFiltreAgenda=;cookie_centre=APITEST;cookie_alaxione=zamxmi;AlaxioneAutreCentre=195kltbymwehnkhevh;x-alx-idc=195kltbymwehnkhevh;x-alx-login=alaxBOC@alaxione.fr;x-alx-token=zamxmi;x-alx-sdomaine=melanie;linkprecedent_alaxione=mon_compte;AlaxioneDateSSEMessagerie=2022-08-01 09:57:29;AlaxioneDateSSE=2022-08-01 09:57:29"
      }
    })
  }

}

export default new MotifsService();

