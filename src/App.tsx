import { Theme } from './settings/types';
import { NSMQTrainingApp } from './components/generated/NSMQTrainingApp';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <>
      <NSMQTrainingApp />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
