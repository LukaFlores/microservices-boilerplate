import express, { Request, Response } from 'express';
import cheerio from 'cheerio';
import axios from 'axios';
import _ from 'lodash';

const router = express.Router();

router.post('/api/testsrv/githubactivity', async (req: Request, res: Response) => {
  const fetchYears = async (usernames: string[]) => {
    const years: any = [];
    const hrefs: any = [];
    await Promise.all(
      usernames.map(async (username: any) => {
        const { data } = await axios.get(`https://github.com/${username}`);
        const $ = cheerio.load(data);
        return await Promise.all(
          $('.js-year-link')
            .get()
            .map((a: any) => {
              const $a = $(a);
              if (!years.includes($a.text().trim())) {
                years.push($a.text().trim());
                hrefs.push($a.attr('href'));
              } else {
                hrefs.push($a.attr('href'));
              }
            }),
        );
      }),
    );
    return await Promise.all(
      years.map(async (year: string) => {
        return {
          [year]: hrefs
            .map((href: string) => {
              if (href.includes(year)) {
                return href;
              }
            })
            .filter((href: string) => href != null),
        };
      }),
    );
  };

  const fetchDataForYear = async (year: any) => {
    var highestCount = 0;

    return await Promise.all(
      Object.values(year).map(async (urls: any) => {
        return await Promise.all(
          urls.map(async (url: any) => {
            const { data } = await axios.get(`https://github.com${url}`);
            const $ = cheerio.load(data);
            const $days = $('svg.js-calendar-graph-svg rect.ContributionCalendar-day');
            const contribText = $('.js-yearly-contributions h2')
              .text()
              .trim()
              .match(/^([0-9,]+)\s/);
            let contribCount;
            if (contribText) {
              [contribCount] = contribText;
              contribCount = parseInt(contribCount.replace(/,/g, ''), 10);
            }

            return {
              year: Object.keys(year),
              total: contribCount || 0,
              range: {
                start: $($days.get(0)).attr('data-date'),
                end: $($days.get($days.length - 1)).attr('data-date'),
              },
              contributions: (() => {
                const parseDay = (day: any) => {
                  const $day = $(day);
                  const date = $day
                    .attr('data-date')!
                    .split('-')
                    .map((d: any) => parseInt(d, 10));
                  const value = {
                    date: $day.attr('data-date'),
                    count: parseInt($day.attr('data-count')!, 10),
                  };
                  return { date, value };
                };
                return $days.get().map((day: any) => parseDay(day).value);
              })(),
            };
          }),
        ).then(async (resp: any) => {
          return {
            year: Object.keys(year)[0],
            total: resp.reduce((acc: any, curr: any) => acc + curr.total, 0),
            range: resp[0].range,
            contributions: resp.reduce((prev: any, curr: any) => {
              const year = Object.values(
                [prev.contributions, curr.contributions].reduce((acc, currChild) => {
                  acc = currChild.map((x: any, index: any) => {
                    return {
                      date: x.date,
                      count: (acc.length > 0 ? acc[index]?.count : 0) + x.count,
                    };
                  });
                  return acc;
                }, []),
              );
              year.map((day: any) => {
                if (day.count > highestCount) {
                  highestCount = day.count;
                }
              });
              const finalYear = year.map((day: any) => {
                var level = 0;
                const date = day.date;
                const count = day.count;
                if (count > 0) {
                  if (count > 0.75 * highestCount) {
                    level = 4;
                  } else if (count > 0.5 * highestCount) {
                    level = 3;
                  } else if (count > 0.25 * highestCount) {
                    level = 2;
                  } else {
                    level = 1;
                  }
                }
                return {
                  date,
                  count,
                  level,
                };
              });
              return finalYear;
            }),
          };
        });
      }),
    );
  };

  try {
    const { usernames } = req.body;
    const data = await fetchYears(usernames);

    res.send(
      await Promise.all(
        Object.values(data).map(async (year) => {
          return await fetchDataForYear(year);
        }),
      ).then((resp: any) => {
        return {
          years: resp.map((x: any) => x[0]['year']),
          total: resp
            .map((x: any) => x[0]['total'])
            .reduce((prev: any, curr: any) => {
              return prev + curr;
            }),

          contributions: resp
            .map((year: any) => Object.values(year[0]['contributions']))
            .reduce((prev: any, curr: any) => [...prev, ...curr])
            .sort(function compare(a: any, b: any) {
              var dateA: any = new Date(a.date);
              var dateB: any = new Date(b.date);
              return dateB - dateA;
            }),
        };
      }),
    );
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as getGithubActivity };
