import React, { useEffect, useState } from 'react';
import './ExperienceCounters.css'; // Ensure to create this CSS file

const ExperienceCounters = () => {
  const counters = [
    { id: 1, title: "Years Experience", value: 5,adjustMargin: true },
    { id: 2, title: "Retention Rate", value: 95 }, // Add a property for margin adjustment
    { id: 3, title: "Tours Completed", value: 120, adjustMargin: true },
    { id: 4, title: "Happy Travellers", value: 3000 } // Add a property for margin adjustment
  ];

  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    const section = document.getElementById("counters-section");
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight && !hasScrolled) {
      setHasScrolled(true);
      window.removeEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <div className="counters-section" id="counters-section">
      <h2 className='h2-exp'>Our Achievements</h2>
      <div className="counters-container">
        {counters.map(counter => (
          <div key={counter.id} className="counter" style={{ marginTop: counter.adjustMargin ? '150px' : '0' }}> {/* Adjust margin conditionally */}
            <div className="circle">
              <Counter value={hasScrolled ? counter.value : 0} />
              <h3 className="counter-title">{counter.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const incrementTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      if (start < end) {
        start++;
        setCount(start);
      } else {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span className="counter-value">{count}</span>;
};

export default ExperienceCounters;
