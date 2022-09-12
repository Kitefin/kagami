import React from 'react';
import dashboard from '../../assets/img/dashboard.png'; 
import circle from '../../assets/img/circle.png'; 
import dash1 from '../../assets/img/dash1.png'; 
import dash2 from '../../assets/img/dash2.png'; 
import dash3 from '../../assets/img/dash3.png'; 
import { Button, Table, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'; 
import { CardActionArea } from '@mui/material';

function Dashboard() { 
 
	return (
		<>  
			{/* <div className="content-center"> 
				<img src={dashboard} alt="main image" height="100%" width="100%" />
			</div> */}  
			<div className='dash_bg'>
			</div>

			<img src={circle} alt="main image" className='dash_img' />
			<div className='dash_title'>
				<Typography variant="h3" gutterBottom>
					<b className='text-white'>Monitoring</b>
				</Typography> 
				<Typography variant="h3" gutterBottom>
					<b className='text-white'>Cluster of</b>
				</Typography> 
				<Typography variant="h3" gutterBottom>
					<b className='text_bg' >Wallets	</b>
				</Typography>					
			</div>  

			<div className='dash_cards' >  
				<Grid 
					justifyContent="space-between"
					container
					spacing={2}
				>
					<Grid item></Grid>
					<Grid item xs={3}>
						<div className='card text-center p-5'>
							<img 
								height="140"
								src={dash1}
								alt="green iguana"
							/> 
							<Typography gutterBottom variant="h5" component="div">
								<b className='text_bg'>Nominate a Cluster</b>
							</Typography> 
						</div>
					</Grid>

					<Grid item xs={3}>
						<div className='card text-center p-5'>
							<img 
								height="140"
								src={dash2}
								alt="green iguana"
							/> 
							<Typography gutterBottom variant="h5" component="div">
								<b className='text_bg'>Set Policies and limits</b>
							</Typography> 
						</div>
					</Grid>

					<Grid item xs={3}>
						<div className='card text-center p-5'>
							<img 
								height="140"
								src={dash3}
								alt="green iguana"
							/> 
							<Typography gutterBottom variant="h5" component="div">
								<b className='text_bg'>Notify when these are exceeded</b>
							</Typography> 
						</div>
					</Grid>
					<Grid item></Grid>

				</Grid> 
			</div>
		</>
	);
}

export default Dashboard;
