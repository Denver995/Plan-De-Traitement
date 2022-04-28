
import ky from "ky";
// import { store } from "../store";
import {
  BASE_MODEL_URL,
  BASE_EXAMEN_URL,
  BASE_LIEUX_URL,
  BASE_MOTIF_URL,
  BASE_PRATICIEN_URL,
  BASE_SPECIALITE_URL
} from './urls';
import { addStep, desactivateStep, stopLoading, addFieldData } from '../actions';
import { STEP1, STEP2 } from './constants';
import { createStep } from './helper';

let _fetcher, _fetcherSearchParams;

export const fetcher = () => {
    if (!_fetcher) {
      _fetcher = ky.extend({
        prefixUrl: 'https://melanie.alaxione.fr/api',//process.env.REACT_APP_BASE_URL,
        retry: 1,
        limit: 20,
        timeout: 30000,
        searchParams: _fetcherSearchParams,
        credentials: "same-origin",
        // hooks: {
        //   beforeRequest: [
        //     request => {
              
        //     }
        //   ],
        //   afterResponse: [
            
        //   ]
        // }
      });
    }
    return _fetcher;
}

export const createModele = values => {
  // console.log('process env ', process.env.REACT_APP_BASE_UR);
  return (dispatch, getState) => {
    console.log('Step current ', values.data);
    let nextStep = createStep(STEP2);
    nextStep.previousStep = values;
    dispatch(desactivateStep(STEP1));
    dispatch(addStep((nextStep)));
    fetcher()
      .post(BASE_MODEL_URL, { searchParams: values.data })
      .then(response => response.json())
      .then(json => {
        json = Array.isArray(json) ? json[0] : json;
        console.log('model created ', json);
        dispatch(addFieldData("model", json));
        dispatch(getLieux());
        dispatch(getMotifs());
        dispatch(getSpecialite());
        dispatch(stopLoading());
      })
      .catch(() => {
        dispatch(stopLoading());
    });
  };
};

export const getMotifs = () => {
  return (dispatch, getState) => {
    fetcher()
      .get(BASE_MOTIF_URL, {
        searchParams: {
          iduserp: ''
        }
      })
      .then(response => response.json())
      .then(json => {
        json = Array.isArray(json) ? json[0] : json;
        dispatch(addFieldData("motifs", json));
        console.log('result motifs', json);
      })
      .catch((err) => {
        
      });
  };
}

export const getLieux = () => {
  return (dispatch, getState) => {
    fetcher()
      .get(BASE_LIEUX_URL, {
        searchParams: {
          iduserp: ''
        }
      })
      .then(response => response.json())
      .then(json => {
        json = Array.isArray(json) ? json[0] : json;
        dispatch(addFieldData("lieux", json));
        console.log('result lieux ', json);
      })
      .catch(() => {
      });
  };
}

export const getPraticiens = () => {
  return (dispatch, getState) => {
    fetcher()
      .get(BASE_PRATICIEN_URL, {
        searchParams: {
          iduserp: ''
        }
      })
      .then(response => response.json())
      .then(json => {
        json = Array.isArray(json) ? json[0] : json;
        dispatch(addFieldData("praticiens", json.attached_persons));
      })
      .catch(() => {
        
      });
  };
}

export const getSpecialite = () => {
  return (dispatch, getState) => {
    fetcher()
      .get(BASE_SPECIALITE_URL, {
        searchParams: {
          iduserp: ''
        }
      })
      .then(response => response.json())
      .then(json => {
        json = Array.isArray(json) ? json[0] : json;
        dispatch(addFieldData("specialites", json.attached_persons));
        dispatch(stopLoading());
      })
      .catch(() => {
        dispatch(stopLoading());
      });
  };
}

export const getExamen = () => {
  return (dispatch, getState) => {
    fetcher()
      .get(BASE_EXAMEN_URL, {
        searchParams: {
          iduserp: ''
        }
      })
      .then(response => response.json())
      .then(json => {
        json = Array.isArray(json) ? json[0] : json;
        dispatch(addFieldData("examens", json.attached_persons));
        dispatch(stopLoading());
      })
      .catch(() => {
        dispatch(stopLoading());
      });
  };
};

export const createExamen = (values) => {
  return (dispatch, getState) => {
    console.log('Step current ', values.data);
    fetcher()
      .post(BASE_EXAMEN_URL, { searchParams: values.data })
      .then(response => response.json())
      .then(json => {
        json = Array.isArray(json) ? json[0] : json;
        console.log('model created ', json);
        dispatch(addFieldData("model", json));
        dispatch(stopLoading());
      })
      .catch(() => {
        dispatch(stopLoading());
    });
  };
}

export const deleteExamen = () => {

}

export const editExamen = () => {

}