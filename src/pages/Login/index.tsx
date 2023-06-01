import React, { useEffect, useState } from 'react';
import { connect, useNavigate } from '@umijs/max';
import {
	LockOutlined,
	UserOutlined,
	VerifiedOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd';
import Cookies from 'js-cookie';
import styles from './index.less';
import { captcha, login } from '@/services/login';

// dva user连接
const Login: React.FC<any> = (props) => {
	const { dispatch } = props;
	const loginClassName = `login-name ${styles.login}`;
	const [captchaUrl, setCaptchaUrl] = useState('');
	const [verifyKey, setVerifyKey] = useState('');
	const navigate = useNavigate();

	const onFinish = async (values: any) => {
		const params = Object.assign(values, { verifyKey });
		const res = await login(params);

		if (res.code === 50) {
			message.warning(res.message);
		} else {
			dispatch({
				type: 'user/getUserInfo',
				payload: res.data.userInfo,
			});
			dispatch({
				type: 'user/getToken',
				payload: res.data.token,
			});
			dispatch({
				type: 'user/getMenuList',
				payload: res.data.menuList,
			});
			Cookies.set('token', res.data.token);
			Cookies.set('userInfo', JSON.stringify(res.data.userInfo));
			navigate('/home');
			message.success('登录成功');
		}
	};

	const getNewCaptcha = () => {
		captcha().then((res) => {
			setCaptchaUrl(res.data.img);
			setVerifyKey(res.data.key);
		});
	};
	useEffect(() => {
		getNewCaptcha();
	}, []);

	return (
		<div className={styles.content}>
			<Form
				name="normal_login"
				className={loginClassName}
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					rules={[{ required: true, message: 'Please input your Username!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item name="verifyCode">
					<Row>
						<Col span={18}>
							<Input prefix={<VerifiedOutlined />} placeholder="请输入验证码" />
						</Col>
						<Col span={4} offset={2}>
							<img
								src={captchaUrl}
								width={130}
								height={40}
								onClick={getNewCaptcha}
							/>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item>
					<Form.Item valuePropName="checked" noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<a className="login-form-forgot" href="">
						Forgot password
					</a>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className={styles.loginBtn}>
						Log in
					</Button>
					Or <a href="">register now!</a>
				</Form.Item>
			</Form>
		</div>
	);
};

export default connect(({ user }: any) => {
	return user;
})(Login);
