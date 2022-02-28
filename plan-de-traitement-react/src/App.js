import './App.css';
import ModifierExamen from './components/ModifierExamen';

import styles from './eui_theme_light.css';
import { createStep } from './utils/helper';
import { STEP1 } from './utils/constants';
import { useDispatch } from 'react-redux';
import { addStep } from './actions/index';

function App() {
  const dispatch = useDispatch();
  dispatch(addStep(createStep(STEP1)));

  return (
    <div className={styles}>
      <ModifierExamen />
    </div>
  );
}

export default App;
