import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import GitHubCalendar from '../components/GithubCalendar/GithubCalendar';
import Data from '../services/data.json';

const GithubActivityCalendar: React.FC = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [todayIndex, setTodayIndex] = useState(0);

  const init = async () => {
    Data.contributions.map((day: any, index: number) => {
      if (day.date.toString() === today) {
        setTodayIndex(index);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex justify-center mt-20 bg-[#0f1116] text-white w-3/4 border-8 border-[#0f1116] rounded-lg">
      <GitHubCalendar
        year={'last'}
        data={Data.contributions.slice(todayIndex, todayIndex + 365).reverse()}
        theme={{
          level0: '#181b21',
          level1: '#20432b',
          level2: '#2f6b38',
          level3: '#52a44e',
          level4: '#6dd064',
        }}
      >
        <ReactTooltip html />
      </GitHubCalendar>
    </div>
  );
};
export default GithubActivityCalendar;
