import { AppConstants } from "../constants/AppConstants"
import { useAppContext } from "../context/AppContext";
import { stockPriceColor } from "../utils/StockCalcs";

export const BalanceResume = () => {
  const { initialInvestment } = AppConstants;
  const { totalBalance } = useAppContext();
  const text = (text: string, className: string = '') => (
    <p className={`text-2xl whitespace-nowrap font-bold mb-2 ${className}`}>{text}</p>
  );

  return (
    <div className="pt-2 pb-2 pl-4 pr-4 border-b-[1px] border-neutral-400">
      <div className="flex gap-2">
        {text(`Invested:`, 'text-neutral-400 font-[200]')}
        {text(`$${initialInvestment.toFixed(2)}`, 'text-neutral-100')}
      </div>
      <div className="flex gap-2">
        {text(`Balance:`, 'text-neutral-400 font-[200]')}
        {text(`$${totalBalance.toFixed(2)}`, stockPriceColor(totalBalance >= initialInvestment))}
      </div>
    </div>
  )
}
