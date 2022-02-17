import './App.css';
import ModelForm from './components/ModelForm';
import styles from './eui_theme_light.css';

function App({props}) {
  const mode = () => {
    if (this.props.createModel) {
      return "createModel";
    }
  }

  // const appMode = mode();

  return (
    <div className={styles}>
      <ModelForm />
    </div>
  );
}

export default App;
