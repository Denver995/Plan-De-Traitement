import './App.css';
import './font.css';
import styles from './eui_theme_light.css';
// import '@elastic/eui/dist/eui_theme_light.css';
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