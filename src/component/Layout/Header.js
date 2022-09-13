import React from 'react';
import { useMoralis } from 'react-moralis';
import { Button, AppBar, Toolbar, Grid } from '@mui/material'; 
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import axios from 'axios';  
import {NODE_URL} from "../../config/config"; 
 

function Header() { 
	const get_Email = async (userAddress) => {
		const url = NODE_URL + `/api/cluster/${userAddress}`;
		try { 
			const res = await axios.post(url, userAddress); 
			const userInfo = {address: userAddress, email: res.data.email};  
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
			startIcon={<LinkIcon fontSize="small" className='text-black' />}
		>
			<b>CONNECT</b>
		</Button>
	);
  
	const disconnectBtn = (
		<Button variant="contained" className="header-disconnect-btn " onClick={() => logout()}  startIcon={<LinkOffIcon fontSize="small" className='text-black' /> }>
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
