
import ky from "ky";
// import { store } from "../store";
import {
  BASE_MODEL_URL,
  BASE_EXAMEN_URL,
  BASE_LIEUX_URL,
  BASE_MOTIF_URL,
  BASE_PRATICIEN_URL,
  BASE_SPECIALITE_URL,
  BASE_URL_API
} from './urls';
import http from "../services/http-helper";
import { addStep, desactivateStep } from '../redux/steps/actions';
import { stopLoading, addFieldData } from '../redux/commons/actions';
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

// Model

export const createModel = (payload,dispatch) => {
   var formdata = new FormData();
    formdata.append("nom", payload.nom);
    formdata.append("groupe_rdv", payload.groupe_rdv);
    formdata.append("nb_occurence", payload.nb_occurence);

   return http.post(BASE_URL_API+"/api_modeleexamen/modeleexamen", formdata)
    .then((response) => {
      console.log("model created ");
      console.log(response.data);
      dispatch(stopLoading());
    })
    .catch((error)=>{
      console.log(error);
      dispatch(stopLoading());
    });
}

export const  getModel = (payload) => {
      return http.get(BASE_URL_API+`/api_modeleexamen/modeleexamen/${payload}`)
      .then((response)=> {
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error ", error)
      });
    }

export const  deleteModel = (id__model_examen, dispatch) => {
       return http.delete(BASE_URL_API+`/api_modeleexamen/modeleexamen/${id__model_examen}`)
       .then((response) => {
        console.log("Model deleted ");
        console.log(response.data);
        dispatch(stopLoading())
       })
       .catch((error)=> {
        console.log("Error ", error);
        dispatch(stopLoading())
       });
    }

export const  updateModel = (id_model_examen, payload, dispatch) => {
      return http.put(BASE_URL_API+`api_modeleexamen/modeleexamen/${id_model_examen}`, payload)
      .then((response) => {
        console.log("Model Updated");
        console.log(response.data);
        dispatch(stopLoading())
      })
      .catch((error) => {
        console.log("Error ", error);
        dispatch(stopLoading())
      });
    }

    //Examen

export const createExamen = (payload, dispatch) => {
    console.log('Create Examen Service ', payload);
    const formdata = new FormData();
    formdata.append("nom", payload.nom);
    formdata.append("id_modele", parseInt(payload.id_modele));
    formdata.append("id_modele_groupe", parseInt(payload.id_model_groupe));
    formdata.append("id_praticien", parseInt(payload.id_praticien));
    formdata.append("id_profession", parseInt(payload.id_profession));
    formdata.append("id_lieu",parseInt(payload.id_lieu));
    formdata.append("fixe", payload.fixe);
    formdata.append("position", payload.position);
    formdata.append("id_motif", parseInt(payload.id_motif));


  return http.post(BASE_URL_API+`/api_examen/examen`, formdata)
  .then((response)=>{
    console.log(response.data)
    dispatch(stopLoading())
  })
  .catch((error) => {
    console.log(error)
    dispatch(stopLoading())
  });
}

export const getExamen = (payload) => {
 
    return http.get(BASE_URL_API+`/api_examen/examen${payload}`)
    .then((response)=> {
      console.log(response.data)
    })
    .catch((error)=>{
      console.log("Error", error)
    });
}

export const deleteExamen = (id_examen, dispatch) => {
    return http.delete(BASE_URL_API+`/api_examen/examen/${id_examen}`)
    .then((response)=>{
      console.log(response)
      dispatch(stopLoading())
    })
    .catch((error)=> {
      console.log("Error", error)
      dispatch(stopLoading())
    });

}

export const updateExamen = (id_examen, payload, dispatch) => {
   
    return http.put(BASE_URL_API+`/api_examen/examen/${id_examen}`, payload)
    .then((response) => {
      console.log(response.data)
      dispatch(stopLoading())
    })
    .catch((error) => {
      console.log(error)
      dispatch(stopLoading)
    });
}

//Examen Lie

export const createExamenLie = (values, dispatch) => {
    console.log('Create Examen Lie Service ', values);
    const formdata = new FormData();
    formdata.append("nom", values.nom);
    formdata.append("id_modele", values.id_modele);
    formdata.append("id_modele_groupe", values.id_model_groupe);
    formdata.append("id_praticien", values.id_praticien);
    formdata.append("id_profession", values.id_profession);
    formdata.append("id_lieu", values.id_lieu);
    formdata.append("fixe", values.fixe);
    formdata.append("position", values.position);
    formdata.append("id_motif", values.id_motif);

    console.log(values);

  return http.post(BASE_URL_API+"/api_examenlie/examenlie", formdata)
  .then((response) => {
    console.log(response.data)
    dispatch(stopLoading())
  })
  .catch((error) => {
    console.log("Error ", error)
    dispatch(stopLoading())
  });
}


export const getExamenLie = (payload, dispatch) => {
  return http.get(BASE_URL_API+`/api_examenlie/examenlie/${payload}`)
  .then((response) => {
    console.log(response.data)
    dispatch(stopLoading)
  })
  .catch((error) => {
    console.log(error)
    dispatch(stopLoading())
  });
}

export const deleteExamenLie = (id_examenlie, dispatch) => {
   return http.delete(BASE_URL_API+`/api_examenlie/examenlie/${id_examenlie}`)
   .then((response) => {
    console.log(response.data)
    dispatch(stopLoading())
   })
   .catch((error) => {
    console.log("Error", error)
    dispatch(stopLoading())
   });
}

export const updateExamenLie = (id_examenlie, payload, dispatch) => {
   return http.put(BASE_URL_API+`/api_examenlie/examenlie/${id_examenlie}`, payload)
   .then((response) => {
    console.log(response.data)
    dispatch(stopLoading());
   })
   .catch((error) => {
    console.log("Error ", error)
    dispatch(stopLoading());
   });
}

//Groupe Lie

export const createGroupeLie = (values, dispatch) => {
    console.log('Create Groupe Lie Service ', values);
    const formdata = new FormData();
    formdata.append("nom", values.nom);
    formdata.append("id_modele", values.id_modele);
    formdata.append("id_modele_groupe", values.id_model_groupe);
    formdata.append("id_praticien", values.id_praticien);
    formdata.append("id_profession", values.id_profession);
    formdata.append("id_lieu", values.id_lieu);
    formdata.append("fixe", values.fixe);
    formdata.append("position", values.position);
    formdata.append("id_motif", values.id_motif);

    console.log(formdata);

  return http.post(BASE_URL_API+"/groupelie", formdata)
  .then((response) => {
    console.log(response.data);
    dispatch(stopLoading())
  })
  .catch((error) => {
    console.log(error)
    dispatch(stopLoading())
  });
}

export const getGroupeLie = (payload, dispatch) => {
  return http.get(BASE_URL_API+`/groupelie/${payload}`)
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log("Error ", error)
  });
}

export const deleteGroupeLie = (id_groupelie, dispatch) => {

  return http.delete(BASE_URL_API+`/groupelie/${id_groupelie}`)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log("Error ", error)
  });
}

export const updateGroupeLie = (id_groupelie, payload, dispatch) => {
 
  return http.put(BASE_URL_API+`/groupelie/${id_groupelie}`, payload)
  .then((response) => {
    console.log(response.data)
    dispatch(stopLoading())
  })
  .catch(error => {
    console.log("Error ",error)
    dispatch(stopLoading)
  });
}

//Model de groupe

export const createModelGroupe = (values, dispatch) => {
    console.log('Create Model Groupe Service ', values);
    const formdata = new FormData();
    formdata.append("nom", values.nom);
    formdata.append("nb_occurence", values.nb_occurence);
    formdata.append("groupe_rdv", values.groupe_rdv);
    formdata.append("id_entite", values.id_entite);
    formdata.append("periode", values.periode);
    formdata.append("id_modele", values.id_modele);

    console.log("my form data for Groupe model ");
    console.log(formdata);
  

  return http.post(BASE_URL_API+"/api_modelegroupe/modelegroupe", formdata)
  .then((response) => {
    console.log("Groupe created successfully");
    console.log(response)
    dispatch(stopLoading())
  })
  .catch(error => {
    console.log("Error ", error)
    dispatch(stopLoading())
  });
}

export const getModelGroupe = (payload, dispatch) => {
  return http.get(BASE_URL_API+`/api_modelegroupe/modelegroupe/${payload}`)
  .then((response) => {
    console.log(response)
    dispatch(stopLoading())
  })
  .catch((error) => {
    console.log("Error ", error)
    dispatch(stopLoading())
  });
}

export const deleteModelGroupe = (id_model_groupe, dispatch) => {
  return http.delete(BASE_URL_API+`/api_modelegroupe/modelegroupe/${id_model_groupe}`)
  .then((response) => {
    console.log(response.data)
    dispatch(stopLoading())
  })
  .catch((error) => {
    console.log(error)
    dispatch(stopLoading())
  });
}

export const updateModelGroupe = (id_model_groupe, payload, dispatch) => {
  return http.put(BASE_URL_API+`/api_modelegroupe/modelegroupe/${id_model_groupe}`, payload)
  .then((response) => {
    console.log(response.data)
    dispatch(stopLoading())
  })
  .catch((error) => {
    console.log(error)
    dispatch(stopLoading())
  });
}




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

/*export const getExamen = () => {
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
    // fetcher()
    //   .post(BASE_EXAMEN_URL, { searchParams: values.data })
    //   .then(response => response.json())
    //   .then(json => {
        // json = Array.isArray(json) ? json[0] : json;
        console.log('model created ', values);
        dispatch(addFieldData("model", values));
        dispatch(stopLoading());
    //   })
    //   .catch(() => {
    //     dispatch(stopLoading());
    // });
  };
}

export const deleteExamen = () => {

}

export const editExamen = () => {

}*/