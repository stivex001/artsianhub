type DateProps = {
  date: string;
  time?: string;
};

export const DateTimeDisplay = ({ date, time }: DateProps) => {
  return (
    <div>
      <p className="text-sm">{date}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  );
};
