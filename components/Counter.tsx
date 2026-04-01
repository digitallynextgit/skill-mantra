// components/Counter.tsx
import { useEffect, useState } from 'react';

interface CounterProps {
  end: number;
  label: string;
}

const Counter: React.FC<CounterProps> = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Total animation time in ms
    const increment = Math.ceil(end / (duration / 50)); // Adjust for smooth incrementing

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, 50); // Updates every 50ms

    return () => clearInterval(counter);
  }, [end]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`; // Format as M
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`; // Format as K
    }
    return num.toString();
  };

  return (
    <div className="flex flex-col items-center py-16">
      <span className="text-5xl font-bold text-blue-90">{formatNumber(count)}+</span>
      <span className="text-xl text-black font-semibold">{label}</span>
    </div>
  );
};

export default Counter;
