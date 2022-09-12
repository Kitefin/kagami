import React from 'react';
import { useMoralis } from 'react-moralis';
import { Button, AppBar, Toolbar, Grid } from '@mui/material'; 
import axios from 'axios';  
const NODE_URL = "http://localhost:5000";  

function Header() { 
	const get_Email = async (userAddress) => {
		const url = NODE_URL + `/api/cluster/${userAddress}`;
		try { 
			const res = await axios.post(url, userAddress);
			// console.log(res.data)
			const userInfo = {address: userAddress, email: res.data.email}; 
			// console.log(userInfo)
			localStorage.userInfo = JSON.stringify( userInfo );
		}
		catch(err) {
			console.log(err) 
		} 
	}

	const { authenticate, isAuthenticated, user, logout } = useMoralis();
	if (isAuthenticated) {
		var userAddress = user.get('ethAddress'); 
		get_Email(userAddress);
	}

	

	const connectBtn = (
		<Button
			variant="contained"
			className="header-connect-btn"
			onClick={() => authenticate({ signingMessage: 'Connect to Kagami' })}
		>
			<b>CONNECT</b>
		</Button>
	);

	const disconnectBtn = (
		<Button variant="contained" className="header-disconnect-btn " onClick={() => logout()}>
			<b className='text-black'>DISCONNECT</b>
		</Button>
	);

	return (
		<AppBar position="static" className="header-bar">
			<Toolbar>
				<Grid
					justifyContent="space-between" // Add it here :)
					container
					spacing={0} //24
				>
					<Grid item>
						<span className="navbar-start logo-title">KAGAMI</span>
					</Grid>

					<Grid item>
						<div className="mt-2">{isAuthenticated ? disconnectBtn : connectBtn}</div>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
