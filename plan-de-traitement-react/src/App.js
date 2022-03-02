import './App.css';
//import './EspacementInterExamenForm.css';     // Valentin    -->> composant: EspacementInterExamenForm (1)

//import './AlertPopUpEnregistrementRdv.css';   // Valentin    -->> composant: AlertPopUpEnregistrementRdv (2)
//import AlertPopUpEnregistrementRdv from './components/AlertPopUpEnregistrementRdv';   // Valentin    -->> composant: AlertPopUpEnregistrementRdv (2)
/*import ModifierExamen from './components/ModifierExamen';*/

import styles from './eui_theme_light.css';
import { createStep } from './utils/helper';
import { STEP1 } from './utils/constants';
import { useDispatch } from 'react-redux';
import { addStep } from './actions/index';
import MainScreen from './components/MainScreen';

function App() {
  const dispatch = useDispatch();
  dispatch(addStep(createStep(STEP1)));

  return (
    <div className={styles}>
      <MainScreen />
    </div>
  );
}

export default App;