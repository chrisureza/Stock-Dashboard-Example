import { useAppContext } from '../context/AppContext';
// import DataTable from '../components/DataTable';
// import RealTimeStats from '../components/RealTimeStats';
import { useWebSocket } from '../hooks/useWebSocket';
import { AppConstants } from '../constants/AppConstants';
import { Card } from '../components/Card';
import { BalanceResume } from '../components/BalanceResume';
import { StockDistribution } from '../components/StockDistribution';
import { StockChart } from '../components/StockChart';
import { Loading } from '../components/Loading';

const Dashboard = () => {
  useWebSocket(); // Activates the WebSocket for constant messages
  const { data } = useAppContext();
  const { appTitle } = AppConstants;

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold mb-3 p-4">{appTitle}</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Info Resume Container */}
        <div className="w-full lg:w-[20%] p-4">
          <p className="text-xl font-bold mb-2">My Balance:</p>
          <Card>
            <BalanceResume />
            <StockDistribution />
          </Card>
        </div>
        {/* Stock charts Container */}
        <div className="w-full lg:w-[80%] p-4">
          <p className="text-xl font-bold mb-2">My Stocks:</p>
          {data.length ?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.map((item, index) => (
                <Card key={index}>
                  <StockChart data={item} />
                </Card>
              ))}
            </div>
            : <Loading />
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
