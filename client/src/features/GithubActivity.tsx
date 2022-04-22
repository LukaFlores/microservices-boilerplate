import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import GitHubCalendar from '../components/GithubCalendar/GithubCalendar';
import { getGithubActivity } from '../services/githubactivity';

const GithubActivityCalendar: React.FC = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [todayIndex, setTodayIndex] = useState(0);
  const [contributions, setContributions] = useState([]);

  const init = async () => {
    if (!process.env.REACT_APP_ANONYMOUS_GITHUB) {
      return;
    }
    // Can only handle two usernames or more than two years
    getGithubActivity({
      usernames: ['lukaflores', process.env.REACT_APP_ANONYMOUS_GITHUB],
    }).then((res) => {
      res.contributions.map((day: any, index: number) => {
        if (day.date.toString() === today) {
          setTodayIndex(index);
          return;
        }
      });
      setContributions(res.contributions);
      
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex justify-center mt-20 bg-[#0f1116] text-white w-3/4 border-8 border-[#0f1116] rounded-lg">
      <GitHubCalendar
        year={'last'}
        loading={contributions === null ? true : false}
        data={contributions && contributions.slice(todayIndex, todayIndex + 365).reverse()}
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
