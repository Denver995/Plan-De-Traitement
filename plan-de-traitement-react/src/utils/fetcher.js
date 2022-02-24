
import ky from "ky";
// import { store } from "../store";
import { BASE_EXAMEN_URL } from './urls'
import { addStep, desactivateStep, stopLoading, addFieldData } from '../actions';
import { STEP1, STEP2 } from './constants';
import { createStep } from './helper';

let _fetcher, _fetcherSearchParams;

export const fetcher = (
    flush = false,
    additionalSearchParams = {},
    removeSearchParams = []
  ) => {
    if (!_fetcher || flush === true) {

    }
    return _fetcher;
    _fetcher = ky.extend({
      prefixUrl: process.env.REACT_APP_BASE_URL,
      retry: 1,
      limit: 20,
      timeout: 30000,
      searchParams: _fetcherSearchParams,
      credentials: "same-origin",
      hooks: {
        beforeRequest: [
          request => {
            
          }
        ],
        afterResponse: [
          
        ]
      }
    });
}

export const createModele = values => {
    return (dispatch, getState) => {
      console.log('Step current ', values);
      let nextStep = createStep(STEP2);
      nextStep.previousStep = values;
      dispatch(desactivateStep(STEP1));
      dispatch(addStep((nextStep)));
      // fetcher()
      //   .post(BASE_EXAMEN_URL, { searchParams: values })
      //   .then(response => response.json())
      //   .then(json => {
      //     json = Array.isArray(json) ? json[0] : json;

      //     dispatch(stopLoading());
      //   })
      //   .catch(() => {
      //     dispatch(stopLoading());
      //   });
    };
};

export const getListExamen = () => {
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