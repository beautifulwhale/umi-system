import { useNavigate } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

export default function PageNotFound() {
	const navigate = useNavigate();
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button onClick={() => navigate(-1)} type="primary">
					Back Home
				</Button>
			}
		/>
	);
}
