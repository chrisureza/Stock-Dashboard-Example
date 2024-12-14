interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="rounded-lg shadow-md bg-gray-800 p-4 hover:shadow-lg transition-shadow duration-200 mb-4 overflow-hidden">
      {children}
    </div>
  );
};