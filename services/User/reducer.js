export default (state, {
	type,
	payload: {
		installId,
		userId,
		error,
		data,
	}
}) => {
	switch (type) {
		case 'deviceUpdateStart':
			return {
				...state,
				status: {
					...state.status,
					installations: {
						[`${userId}/${installId}`]: 'loading',
					},
				},
			};
		case 'deviceUpdateFail':
			return {
				status: {
					...state.status,
					installations: {
						[`${userId}/${installId}`]: 'error',
					},
				},
				data: {
					...state.data,
					[userId]: {
						...state.data[userId],
						installations: {
							...state.data[userId].installations,
							[installId]: {
								...state.data[userId].installations[installId],
								devices: error,
							}
						}
					}
				}
			};
		case 'deviceUpdateSuccess':
			return {
				status: {
					...state.status,
					installations: {
						[`${userId}/${installId}`]: 'success',
					},
				},
				data: {
					...state.data,
					[userId]: {
						...state.data[userId],
						installations: {
							...state.data[userId].installations,
							[installId]: {
								...state.data[userId].installations[installId],
								devices: data,
							}
						}
					}
				}
			};
		case 'userUpdateStart':
			return {
				...state,
				status: {
					...state.status,
					users: {
						...state.status.users,
						[userId]: 'loading',
					},
				},
			};
		case 'userUpdateSuccess':
			return {
				status: {
					...state.status,
					users: {
						...state.status.user,
						[userId]: 'success',
					},
				},
				data: {
					...state.data,
					[userId]: data,
				},
			};
		case 'userUpdateFail':
			return {
				status: {
					...state.status,
					users: {
						...state.status.user,
						[userId]: 'error',
					},
				},
				data: {
					...state.data,
					[userId]: error,
				},
			};
		default: {
			throw new Error(`Unhandled action type: ${type}`);
		}
	}
};
