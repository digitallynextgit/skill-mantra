import Counter from './Counter';

const data = [
  { end: 1000, label: "Careers Advanced" },
  { end: 100, label: "Corporate Tie-Ups" },
  { end: 50, label: "Qualified Trainers" },
  { end: 10000, label: "Students Counseled" },
  { end: 6000000, label: "Reach On Social Media" },
];

const CounterSection: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center ">
          {data.map((item, index) => (
            <Counter key={index} end={item.end} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
