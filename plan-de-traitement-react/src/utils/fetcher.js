
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
import {
  addExamGrouped
} from "../redux/examens/actions";
import {
  setModelData,
  updateModel,
} from "../redux/models/actions";
import { STEP1, STEP2 } from './constants';
import { createStep } from './helper';



// Model
export const createModele = (payload,dispatch) => {
   var formdata = new FormData();
    formdata.append("nom", payload.nom);
    formdata.append("groupe_rdv", payload.groupe_rdv);
    formdata.append("nb_occurence", payload.nb_occurence);
   return http.post(BASE_URL_API+"/api_modeleexamen/modeleexamen", formdata)
    .then((response) => {
      dispatch(stopLoading());
    })
    .catch((error)=>{
      console.log(error);
      dispatch(stopLoading());
    });
}
export const  getModele = (payload) => {
      return http.get(BASE_URL_API+`/api_modeleexamen/modeleexamen/${payload}`)
      .then((response)=> {
        
      })
      .catch((error) => {
        
      });
    }
export const  deleteModele = (id__model_examen, dispatch) => {
       return http.delete(BASE_URL_API+`/api_modeleexamen/modeleexamen/${id__model_examen}`)
       .then((response) => {
        dispatch(stopLoading())
       })
       .catch((error)=> {
        console.log("Error ", error);
        dispatch(stopLoading())
       });
    }
export const  updateModele = (id_model_examen, payload, dispatch) => {
      return http.put(BASE_URL_API+`api_modeleexamen/modeleexamen/${id_model_examen}`, payload)
      .then((response) => {
        dispatch(stopLoading())
      })
      .catch((error) => {
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
     
    })
    .catch((error)=>{
      
    });
}
export const deleteExamen = (id_examen, dispatch) => {
    return http.delete(BASE_URL_API+`/api_examen/examen/${id_examen}`)
    .then((response)=>{
      dispatch(stopLoading())
    })
    .catch((error)=> {
      dispatch(stopLoading())
    });

}
export const updateExamen = (id_examen, payload, dispatch) => {
   
    return http.put(BASE_URL_API+`/api_examen/examen/${id_examen}`, payload)
    .then((response) => {
      dispatch(stopLoading())
    })
    .catch((error) => {
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
    dispatch(stopLoading())
  })
  .catch((error) => {
    dispatch(stopLoading())
  });
}
export const getExamenLie = (payload, dispatch) => {
  return http.get(BASE_URL_API+`/api_examenlie/examenlie/${payload}`)
  .then((response) => {
    dispatch(stopLoading)
  })
  .catch((error) => {
    dispatch(stopLoading())
  });
}
export const deleteExamenLie = (id_examenlie, dispatch) => {
   return http.delete(BASE_URL_API+`/api_examenlie/examenlie/${id_examenlie}`)
   .then((response) => {
    dispatch(stopLoading())
   })
   .catch((error) => {
    dispatch(stopLoading())
   });
}
export const updateExamenLie = (id_examenlie, payload, dispatch) => {
   return http.put(BASE_URL_API+`/api_examenlie/examenlie/${id_examenlie}`, payload)
   .then((response) => {
    dispatch(stopLoading());
   })
   .catch((error) => {
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


  return http.post(BASE_URL_API+"/groupelie", formdata)
  .then((response) => {
    dispatch(stopLoading())
  })
  .catch((error) => {
    dispatch(stopLoading())
  });
}
export const getGroupeLie = (payload, dispatch) => {
  return http.get(BASE_URL_API+`/groupelie/${payload}`)
  .then((response) => {

  })
  .catch((error) => {
    
  });
}
export const deleteGroupeLie = (id_groupelie, dispatch) => {
  return http.delete(BASE_URL_API+`/groupelie/${id_groupelie}`)
  .then((response) => {
  
  })
  .catch((error) => {
   
  });
}
export const updateGroupeLie = (id_groupelie, payload, dispatch) => {
 
  return http.put(BASE_URL_API+`/groupelie/${id_groupelie}`, payload)
  .then((response) => {
    
    dispatch(stopLoading())
  })
  .catch(error => {
    
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
  

  return http.post(BASE_URL_API+"/api_modelegroupe/modelegroupe", formdata)
  .then((response) => {
    dispatch(stopLoading())
  })
  .catch(error => {
    dispatch(stopLoading())
  });
}
export const getModelGroupe = (payload, dispatch) => {
  return http.get(BASE_URL_API+`/api_modelegroupe/modelegroupe/${payload}`)
  .then((response) => {
    dispatch(addExamGrouped(response.data));
    dispatch(stopLoading())
  })
  .catch((error) => {
    dispatch(stopLoading())
  });
}
export const deleteModelGroupe = (id_model_groupe, dispatch) => {
  return http.delete(BASE_URL_API+`/api_modelegroupe/modelegroupe/${id_model_groupe}`)
  .then((response) => {
    dispatch(stopLoading())
  })
  .catch((error) => {
    console.log(error)
    dispatch(stopLoading())
  });
}
export const updateModelGroupe = (id_model_groupe, values, dispatch) => {
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
  return http.put(BASE_URL_API+`/api_modelegroupe/modelegroupe/${id_model_groupe}`, formdata)
  .then((response) => {
    dispatch(stopLoading())
  })
  .catch((error) => {
    dispatch(stopLoading())
  });
}