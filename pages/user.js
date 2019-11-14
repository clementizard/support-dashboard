import React from 'react';

import LayoutFull from '../components/common/layouts/LayoutFull';

const User = () => {
	return (
		<>
			The User page
		</>
	);
};
User.Layout = LayoutFull;
User.getLayout = page => (
	<LayoutFull>{page}</LayoutFull>
);

export default User;

