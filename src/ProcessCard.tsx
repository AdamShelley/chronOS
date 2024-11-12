interface ProcessCardProps {
  title: string;
  process: {
    id: string;
    name: string;
    running_time: string;
    memory: number;
  };
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  title,
  process,
}: ProcessCardProps) => {
  return (
    <div className="process-card">
      <h3>{title}</h3>
      <p>
        {process.name} (ID: {process.id})
      </p>
      <p>Running Time: {process.running_time}</p>
      <p>Memory: {process.memory} MB</p>
    </div>
  );
};

export default ProcessCard;
