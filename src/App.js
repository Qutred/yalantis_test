import { Route, Switch } from 'react-router-dom';
import Employees from './components/Employees/Employees';
import './index.scss';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/'>
          <Employees />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
