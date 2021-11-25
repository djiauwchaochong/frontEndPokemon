import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './views/Main';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" caseSensitive={false} element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
