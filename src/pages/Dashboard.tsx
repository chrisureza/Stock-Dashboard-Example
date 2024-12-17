import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useWebSocket } from '../hooks/useWebSocket';
import { AppConstants } from '../constants/AppConstants';
import { Card } from '../components/Card';
import { BalanceResume } from '../components/BalanceResume';
import { StockDistribution } from '../components/StockDistribution';
import { StockChart } from '../components/StockChart';
import { Loading } from '../components/Loading';
import { Search } from '../components/SearchBar';
import { Stock } from '../Interfaces/Stock.interface';

const Dashboard = () => {
  useWebSocket(); // Activates the WebSocket for constant messages
  const { data, filterString } = useAppContext();
  const { appTitle } = AppConstants;

  // State for selected sorting option, initialize with localStorage value
  const [sortOption, setSortOption] = useState<string>(
    localStorage.getItem('sortOption') || '1'
  );

  // Save the selected option to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  // Handle sorting selection
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Enhanced filter function with sorting
  const filter = (stocks: Stock[]) => {
    // Filtered data based on the search string
    const filteredData = stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(filterString) ||
        stock.ticket.toLowerCase().includes(filterString) ||
        stock.sector.toLowerCase().includes(filterString) ||
        stock.trend.toLowerCase().includes(filterString)
    );

    // Sort the filtered data based on the selected option
    switch (sortOption) {
      case '2': // Up First
        return filteredData.sort((a, b) => b.change - a.change);
      case '3': // Down First
        return filteredData.sort((a, b) => a.change - b.change);
      case '4': // Price Desc
        return filteredData.sort((a, b) => b.price[0] - a.price[0]);
      case '5': // Change Desc
        return filteredData.sort((a, b) => b.percentageChange - a.percentageChange);
      default: // Default (No Sorting)
        return filteredData;
    }
  };

  const Select = () => (
    <select
      className="w-full lg:w-[160px] p-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
      onChange={handleSortChange}
      value={sortOption}
    >
      <option value="1">Default</option>
      <option value="2">Up First</option>
      <option value="3">Down First</option>
      <option value="4">Price Desc</option>
      <option value="5">Change Desc</option>
    </select>
  );

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Header */}
        <div className="w-full md:w-1/2 p-2">
          <h1 className="text-5xl font-bold mb-3">{appTitle}</h1>
        </div>
        <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-end gap-4 p-2">
          <Search />
          {Select()}
        </div>
      </div>
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
          {data.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filter(data).map((item, index) => (
                <Card key={index}>
                  <StockChart data={item} />
                </Card>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;