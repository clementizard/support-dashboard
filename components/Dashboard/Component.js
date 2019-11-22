import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useWeather from 'Services/Weather/hook';
import Card from './Card';
import { Container } from './Styles';
import { propTypes, defaultProps } from './Props';

const Dashboard = () => {
  const { status, data } = useWeather();

  return (
    <Container>
      {status === 'success' && data.map((metric, id) => (
        <Card
          key={id}
          title={metric.title}
          description={metric.description}
          status={{
            string: `${metric.status.valid}/${metric.status.total}`,
            ok: metric.status.ok,
          }}
          onServices={metric.onServices}
          offServices={metric.offServices}
        />
      ))}
      {status === 'loading' && <CircularProgress />}
      {status === 'error' && <div>{data}</div>}
    </Container>
  );
};
Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
Dashboard.whyDidYouRender = true;

export default Dashboard;

