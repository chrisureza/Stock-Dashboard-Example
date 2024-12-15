import PulseLoader from 'react-spinners/PulseLoader';

export const Loading = () => {
  return (
    <div className="flex justify-center items-center pt-2">
      <PulseLoader color="#008CB4" size={15} margin={5} />
    </div>
  );
};
