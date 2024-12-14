import { Stock } from "../Interfaces/Stock.interface"

interface IStockChart {
  data: Stock,
}

export const StockChart = ({ data }: IStockChart) => {
  return (
    <div>{JSON.stringify(data.price)}</div>
  )
}
