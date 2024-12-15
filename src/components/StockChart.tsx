import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Stock } from "../Interfaces/Stock.interface"
import { formatTime } from "../utils/FormatTime";

interface IStockChart {
  data: Stock,
}

export const StockChart = ({ data }: IStockChart) => {
  const title = (text: string) => (
    <p className="text-2xl whitespace-nowrap font-bold">{text}</p>
  );
  const subtitle = (text: string, className: string = '') => (
    <p className={`text-sm whitespace-nowrap ${className}`}>{text}</p>
  );
  const mention = (text: string, className: string = '') => (
    <p className={`text-xs text-neutral-400 whitespace-nowrap ${className}`}>{text}</p>
  );

  const Header = () => (
    <div className="grid grid-cols-2 gap-4 mb-2">
      <div>
        {title(data.ticket)}
        {subtitle(data.name)}
        {mention(data.sector, 'text-neutral-200')}
      </div>
      <div className="text-right">
        {title(`$ ${data.price[data.price.length - 1]}`)}
      </div>
    </div>
  );

  const trendColor = {up: 'text-green-300', down: 'text-red-400', neutral: ''};
  const Change = () => (
    <div className="mb-2">
      {mention('Change:')}
      <div className="grid grid-cols-3 gap-4">
        <div className={`text-left ${trendColor[data.trend]}`}>
          {subtitle(data.trend.toLocaleUpperCase(), 'text-lg')}
        </div>
        <div className="text-center">
          {subtitle(`$${data.change}`, 'text-lg')}
        </div>
        <div className="text-right">
          {subtitle(`${data.percentageChange}%`, 'text-lg')}
        </div>
      </div>
    </div>
  );

  const Chart = () => (
    <ResponsiveContainer width="100%" height={80} >
      <LineChart
        data={data.price.map(price => ({ price }))}
        margin={{ top: 0, right: 0, left: -20, bottom: -20 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="linear"
          dataKey="price"
          stroke="#008CB4"
          fill="#008CB4"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const Footer = () => (
    <div className="mt-2">
      <div className="grid grid-cols-2">
        <div>
          {mention(`Volume: ${data.volume}`)}
        </div>
        <div className="text-right">
          {mention(`Updated: ${formatTime(data.timestamp)}`)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pl-4 pr-4 pt-2 pb-2">
      {Header()}
      {Change()}
      {Chart()}
      {Footer()}
    </div>
  )
};
