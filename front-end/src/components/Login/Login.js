import React from 'react';

export default function Login() {

	return <>
	<form>
		<input name='login' id='login' type='text' placeholder='email' />
		<input name='password' id='password' type='password' placeholder='password' />
		<button type='submit'>Login</button>
	</form>
	</>
}
