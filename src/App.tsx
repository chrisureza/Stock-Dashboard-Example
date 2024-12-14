import Dashboard from './pages/Dashboard';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <Dashboard />
      </div>
    </AppProvider>
  );
}

export default App;