import { useAppContext } from "../context/AppContext";

export const StockDistribution = () => {
  const { data } = useAppContext();

  const text = (text: string, className: string = '') => (
    <p className={`text-md whitespace-nowrap mb-2 ${className}`}>{text}</p>
  );

  return (
    <div className="pt-2 pb-2 pl-4 pr-4">
      {text('Distribution:', 'font-bold')}
      {data.map(stock => (
        <div className="flex justify-between gap-2 md:w-[120px]">
          {text(`${stock.ticket}:`, 'text-neutral-300')}
          {text(`${stock.distributionPercentage}%`, 'font-bold')}
        </div>
      ))}
    </div>
  )
}
