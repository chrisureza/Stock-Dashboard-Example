import { useEffect } from "react";
import { AppConstants } from "../constants/AppConstants";
import { useAppContext } from "../context/AppContext";
import { Stock } from "../Interfaces/Stock.interface";
import { stockPriceColor } from "../utils/StockCalcs";

export const StockDistribution = () => {
  const { data, setTotalBalance } = useAppContext();
  const { initialInvestment } = AppConstants;

  useEffect(() => {
    const newTotalBalance = data.reduce((total, stock) => {
      const initialInvest = initialInvestment * (stock.distributionPercentage / 100);
      const currentBalance = initialInvest + stock.change;
      return total + currentBalance;
    }, 0);
    setTotalBalance(newTotalBalance);
  }, [data, initialInvestment, setTotalBalance]);

  const text = (text: string, className: string = "") => (
    <p className={`text-md font-[200] whitespace-nowrap ${className}`}>{text}</p>
  );

  const getInitialInvest = (distributionPercentage: number) => {
    return initialInvestment * (distributionPercentage / 100);
  };

  const stockInfo = (stock: Stock) => {
    const { distributionPercentage, change } = stock;
    const initialInvest = getInitialInvest(distributionPercentage);
    const currentBalance = initialInvest + change;

    return (
      <div className="md:w-[120px] mb-4" key={stock.ticket}>
        {text(`${stock.ticket}:`, "text-neutral-200 text-xl")}
        <div className="flex justify-between gap-2 md:w-[120px]">
          {text(`Percentage Spent:`, "text-neutral-400")}
          {text(`${distributionPercentage}%`, "font-[600]")}
        </div>
        <div className="flex justify-between gap-2 md:w-[120px]">
          {text(`Initial Balance:`, "text-neutral-400")}
          {text(`$${initialInvest.toFixed(2)}`, "font-[600]")}
        </div>
        <div className="flex justify-between gap-2 md:w-[120px]">
          {text(`Current Balance:`, "text-neutral-400")}
          {text(
            `$${currentBalance.toFixed(2)}`,
            `font-[600] ${stockPriceColor(currentBalance >= initialInvest)}`
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-2 pb-2 pl-4 pr-4">
      {text("Distribution:", "font-[400] text-neutral-200 mb-2")}
      {data.map(stockInfo)}
    </div>
  );
};