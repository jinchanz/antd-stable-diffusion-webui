import { useRoutes } from 'react-router-dom';
import routes from './pages/routes';

function App() {
  const config = useRoutes(routes);
    return <div className="App">{config}</div>;
}

export default App;
