import { createContext, useContext, useState, useCallback, useMemo } from 'react';

import { i18n } from 'Tools/i18n';
import defaultState from './default';

const SettingsStateContext = createContext();

export const SettingsProvider = ({ children }) => {
	const defState = process.browser && localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : defaultState;
	const [state, setState] = useState(defState);
	
	const handleStateChange = useCallback((changes) => {
		const newState = {
			...state,
			...changes,
		};
		i18n.changeLanguage(newState.lang);
		setState(newState);
		if (process.browser) localStorage.setItem('settings', JSON.stringify(newState));
	}, []);
	
	const values = useMemo(() => ({
		onChange: handleStateChange,
		data: state,
	}), [handleStateChange, state]);

	return (
		<SettingsStateContext.Provider value={values}>
			{children}
		</SettingsStateContext.Provider>
	);
};

export const useSettings = () => {
	const context = useContext(SettingsStateContext);
	if (context === undefined) throw new Error('useSettings must be used within a SettingsProvider');
	return context;
};
