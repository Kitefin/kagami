import React from 'react';
import { useMoralis } from 'react-moralis';
import { Button, AppBar, Toolbar, Grid } from '@material-ui/core';

import './layout.css';

var userAddress;
function Header() {
	const { authenticate, isAuthenticated, user, logout } = useMoralis();
	if (isAuthenticated) {
		userAddress = user.get('ethAddress');
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
			<b>DISCONNECT</b>
		</Button>
	);

	return (
		<AppBar position="static" className="header-bar">
			<Toolbar>
				<Grid
					justify="space-between" // Add it here :)
					container
					spacing={24}
				>
					<Grid item>
						<span className="navbar-start logo-title">KAGAMI</span>
					</Grid>

					<Grid item>
						<div className="header-btn">{isAuthenticated ? disconnectBtn : connectBtn}</div>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
