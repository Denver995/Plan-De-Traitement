import './App.css';
import './font.css';
import './responsive.css';
import styles from './eui_theme_light.css';
import "./responsive.css";
import { createStep } from './utils/helper';
import { STEP1 } from './utils/constants';
import { useDispatch } from 'react-redux';
import { addStep } from './redux/steps/actions';
import MainScreenWrapper from './components/MainScreenWrapper';

function App() {
  const dispatch = useDispatch();
  dispatch(addStep(createStep(STEP1)));

  return (
    <div className={styles}>
      <MainScreenWrapper />
    </div>
  );
}

export default App;