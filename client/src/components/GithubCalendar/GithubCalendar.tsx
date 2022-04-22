import React, { FunctionComponent } from 'react';
import Calendar, {
  CalendarData,
  createCalendarTheme,
  Props as CalendarProps,
  Theme,
} from 'react-activity-calendar';

export type Year = number | 'last';
export interface Props extends Omit<CalendarProps, 'data'> {
  data: any;
  year?: Year;
  transformData?: (data: CalendarData) => CalendarData;
}
export const DEFAULT_THEME: Theme = {
  level4: '#216e39',
  level3: '#30a14e',
  level2: '#40c463',
  level1: '#9be9a8',
  level0: '#ebedf0',
};

const GitHubCalendar: FunctionComponent<Props> = ({
  year = 'last',
  transformData: transformDataProp,
  ...props
}) => {
  const theme = props.color ? undefined : props.theme ?? DEFAULT_THEME;

  const labels = {
    totalCount: `{{count}} contributions in ${year === 'last' ? 'the last year' : '{{year}}'}`,
  };

  return (
    <Calendar theme={theme} labels={labels} {...props}>
      {props.children}
    </Calendar>
  );
};

export { createCalendarTheme };
export default GitHubCalendar;
