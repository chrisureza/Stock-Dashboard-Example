import { useAppContext } from '../context/AppContext';
// import DataTable from '../components/DataTable';
// import RealTimeStats from '../components/RealTimeStats';
import { useWebSocket } from '../hooks/useWebSocket';
import { AppConstants } from '../constants/AppConstants';
import { Card } from '../components/Card';
import { BalanceResume } from '../components/BalanceResume';
import { StockDistribution } from '../components/StockDistribution';
import { StockChart } from '../components/StockChart';

const Dashboard = () => {
  useWebSocket(); // Activates the WebSocket for constant messages
  const { data } = useAppContext();
  const { appTitle } = AppConstants;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{appTitle}</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Info Resume Container */}
        <div className="w-full lg:w-[30%] p-4">
          <Card>
            <BalanceResume />
            <StockDistribution />
          </Card>
        </div>
        {/* Stock charts Container */}
        <div className="w-full lg:w-[70%] p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <Card key={index}>
                <StockChart data={item} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
