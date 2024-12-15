import { AppConstants } from "../constants/AppConstants"

export const BalanceResume = () => {
  const { initialInvestment } = AppConstants;
  const text = (text: string, className: string = '') => (
    <p className={`text-2xl whitespace-nowrap font-bold mb-4 ${className}`}>{text}</p>
  );

  return (
    <div className="pt-2 pb-2 pl-4 pr-4">
      <div className="flex gap-2">
        {text(`Invested:`, 'text-neutral-300 font-normal')}
        {text(`$${initialInvestment}`)}
      </div>
      <div className="flex gap-2">
        {text(`Balance:`, 'text-neutral-300 font-normal')}
        {text(`$${initialInvestment}`)}
      </div>
    </div>
  )
}
