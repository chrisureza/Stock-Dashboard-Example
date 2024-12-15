import PulseLoader from 'react-spinners/PulseLoader';

export const Loading = () => {
  return (
    <div className="flex justify-center items-center pt-2">
      <PulseLoader color="#36d7b7" size={15} margin={5} />
    </div>
  );
};
