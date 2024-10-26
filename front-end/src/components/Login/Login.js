import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formLogin, googleLogin, loginFailure } from '../../redux/actions/uiActionCreators';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.ui.get('isLoading'));

	function handleSubmit(event) {
		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.password.value;

		dispatch(formLogin(email, password));
	}

	function handleGoogleLoginSuccess(response) {
		dispatch(googleLogin(response.credential));
	}

	function handleGoogleLoginFailure(error) {
		dispatch(loginFailure('Google login failure!'));
		console.error(error);
	}

	return <>
	<form onSubmit={handleSubmit}>
		<input name='email' id='email' type='text' placeholder='email' />
		<input name='password' id='password' type='password' placeholder='password' />
		<button type='submit' disabled={isLoading}>Login</button>
	</form>

	<GoogleLogin
  onSuccess={handleGoogleLoginSuccess}
  onError={handleGoogleLoginFailure}
  theme="filled_blue"
  size="large"
  shape="circle"
  text="signin_with"
	buttonText="Continue with Google"
  logo_alignment="left"
  width="300"                // Width of the button in pixels (optional)
/>
	</>
}
