import React, { useMemo } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withTranslation } from 'Tools/i18n';
import { getLayout } from 'Layouts/LayoutFull';
import useWeather from 'Services/Weather/hook';
import Card from 'Components/Card';
import { PageTitle } from 'Components/Card/Styles';
import { Container } from './Styles';
import { propTypes, defaultProps } from './Props';

const Dashboard = ({ t }) => {
	const { status, data } = useWeather();

	return useMemo(() => ([
		<PageTitle key="title" data-cy="dashboard-title">{t('dashboard:title')}</PageTitle>,
		<Container key="content">
			{status === 'success' && data.map(metric => (
				<Card
					key={metric.title}
					title={metric.title}
					status={metric.status}
					onServices={metric.onServices}
					offServices={metric.offServices}
				/>
			))}
			{status === 'loading' && <CircularProgress />}
			{status === 'error' && <div />}
		</Container>,
	]), [status]);
};
Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
Dashboard.whyDidYouRender = true;
Dashboard.getInitialProps = async () => ({ namespacesRequired: ['dashboard'] });
Dashboard.getLayout = getLayout;

export default withTranslation('dashboard')(Dashboard);
