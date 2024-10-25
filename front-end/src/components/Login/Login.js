import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/uiActionCreators';

export default function Login() {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.ui.get('isLoading'));

	function handleSubmit(event) {
		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.password.value;

		dispatch(login(email, password));
	}

	return <>
	<form onSubmit={handleSubmit}>
		<input name='email' id='email' type='text' placeholder='email' />
		<input name='password' id='password' type='password' placeholder='password' />
		<button type='submit' disabled={isLoading}>Login</button>
	</form>
	</>
}
