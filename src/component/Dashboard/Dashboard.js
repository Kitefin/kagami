import React from 'react';
import dashboard from '../../assets/img/dashboard.png';
import circleImg from '../../assets/img/circle.png'; 
import { Button, Table, Grid, Modal, Backdrop, Fade } from '@material-ui/core';

function Dashboard() {
	var w = window.innerWidth;
	return (
		<> 
			{/* <div className="bg_normal text-center"> 
				<Grid
					justify="space-between"
					container
					spacing={24}
				>
					<Grid item xs={2}> </Grid>
					<Grid item className="pt-5">  
						<div>
							<h1 className="text-white">Monitoring</h1>
							<h1 className="text-white">Cluster of</h1>
							<h1 className="text_bg">Wallets</h1>
						</div>
					</Grid>
					 
					<Grid item className="pt-5 mt-5"> 
						<img src={circleImg} alt="circle image" height="300px" width="300px" />
					</Grid>
					<Grid item xs={2}> </Grid>
				</Grid> 
			</div> */}
			<div className="content-center"> 
				<img src={dashboard} alt="main image" height="100%" width="100%" />
			</div>
		</>
	);
}

export default Dashboard;
