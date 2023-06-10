import React from 'react';
import UseCallbackTest from './useCallback';
import UseContextTest from './useContext';

export default function Hooks() {
	return (
		<>
			<div>Hooks Test</div>
			<UseCallbackTest />
			<hr />
			<div
				style={{ width: '100%', height: '30px', backgroundColor: 'pink' }}
			></div>
			<UseContextTest />
		</>
	);
}
