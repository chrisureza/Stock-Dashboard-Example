import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { AppConstants } from '../constants/AppConstants';

export const useWebSocket = () => {
  const { setData } = useAppContext();
  const { stockData } = AppConstants;

  useEffect(() => {
    const socket = new WebSocket('wss://ws.postman-echo.com/raw');

    socket.onopen = () => {
      console.log('WebSocket connected');

      // Sends simulated data of 10 stocks every 3 seconds
      const interval = setInterval(() => {
        const stocks = Array.from({ length: 8 }, (_, index) => stockData(index));
        socket.send(JSON.stringify(stocks));
        console.log('Message sent:', stocks);
      }, 3000);

      // Clears the interval when the WebSocket closes
      socket.onclose = () => clearInterval(interval);
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log('Message received:', newData);

      setData((prev) => {
        return prev.length
          // creates an array with the price history. (last 5 elements)
          ? newData.map((item: any, index: number) => ({ ...item, price: [...prev[index].price, ...item.price].slice(-5) }))
          : newData;
      });
    };

    socket.onerror = (error) => console.error('WebSocket error:', error);

    return () => {
      socket.close(); // Closes the connection when the component unmounts
    };
  }, [setData]);
};