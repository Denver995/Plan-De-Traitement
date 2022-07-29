import { BASE_URL_API } from "../../utils/urls";
import http from '../http-helper';
class MotifsService {

  getListeMotif = (idprofession) => {
    return http.get(BASE_URL_API + `ajax/liste_rdv_backoffice.php?idc=85flnlrfavxymwvma&idprofession=` + idprofession, {
      headers: {
        "Cookie": "AlaxioneAutreCentre=85flnlrfavxymwvma; PHPSESSID=vj1mt49plfeq12udado1bdi2o3; cookie_centre=centre85; cookie_alaxione=545541xfndwcsjpwvtita; AlaxioneAutreCentre=85flnlrfavxymwvma; x-alx-idc=85flnlrfavxymwvma; x-alx-login=alaxBOC@alaxione.fr; x-alx-token=545541xfndwcsjpwvtita; x-alx-sdomaine=melanie; linkprecedent_alaxione=mon_compte; AlaxioneFiltreAgenda=; AlaxioneDateSSEMessagerie=2022-07-21 11:23:13; AlaxioneDateSSE=2022-07-21 11:23:13"
      }
    })
  }

}

export default new MotifsService();

