import React from 'react'; 
import { Button, Table, Grid, Modal, Backdrop, Fade } from '@material-ui/core';
import TableScrollbar from 'react-table-scrollbar';
import { makeStyles } from '@material-ui/core/styles'; 
import CreateAlert from './CreateAlert';
import './layout.css';

const useStyles = makeStyles((theme) => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center', 
	},
	paper: {
	  backgroundColor: theme.palette.background.paper,	 
	  borderRadius: '10px',
	  boxShadow: theme.shadows[5],	   
	  width: '80%'
	},
  }));

function Layout() { 
	const classes = useStyles();
	const [alertOpen, setAlertOpen] = React.useState(false);

	const create_Alert = () => {
		 setAlertOpen(true);
	}

	const alertClose = () => {
		setAlertOpen(false);
	};

	const createAlertBtn = (
		<Button variant="contained" className="header-createalertopen-btn" onClick={() => create_Alert()}>
			<b>CREATE NOTIFICATION</b>
		</Button>
	);

	return (
		<div className="layout-back p-5">
			 
			 <Modal
        		// aria-labelledby="transition-modal-title"
				// aria-describedby="transition-modal-description"
				className={classes.modal}
				open={alertOpen}
				onClose={alertClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
				timeout: 500,
				}}
			>
        		<Fade in={alertOpen}>
          			<div className={classes.paper}> 
						<CreateAlert alertClose={()=>alertClose()}></CreateAlert>
          			</div>
        		</Fade>
      		</Modal>

			
			<Grid
				justify="space-between" // Add it here :)
				container
				spacing={24}
			>
				<Grid item> </Grid>
				<Grid item>
					<div className="header-alert-btn">{ createAlertBtn }</div>				 
				</Grid>
				<Grid item> </Grid>
			</Grid>
			
			 
			<div className="m-5">
				<h2>YOUR CLUSTERS</h2>
				<TableScrollbar>
				<Table>
					<tbody>
						<tr>
							<td style={{ minWidth: '200px' }}>All Project Wallets</td>
							<td style={{ minWidth: '300px' }}>All wallets controlled by our company</td>
							<td style={{ minWidth: '150px' }}>125 wallets</td>
							<td style={{ minWidth: '150px' }}>7 alerts</td>
							<td style={{ minWidth: '140px', backgroundColor: 'rgb(9, 154, 0)', color: 'white' }}>
								Edit cluster
							</td>
						</tr>
						<tr>
							<td>All Team Vesting</td>
							<td>All wallets that the team hold their personal reward tokens in</td>
							<td>32 wallets</td>
							<td>1 alerts</td>
							<td style={{ minWidth: '140px', backgroundColor: 'rgb(9, 154, 0)', color: 'white' }}>
								Edit cluster
							</td>
						</tr>
						<tr>
							<td>Founder Vesting</td>
							<td>All wallets that the founders hold their personal reward tokens in</td>
							<td>10 wallets</td>
							<td>1 alerts</td>
							<td style={{ minWidth: '140px', backgroundColor: 'rgb(9, 154, 0)', color: 'white' }}>
								Edit cluster
							</td>
						</tr>
						<tr>
							<td>Executive Controlled</td>
							<td>All wallets that are controlled by executive team on behalf of the company</td>
							<td>125 wallets</td>
							<td>5 alerts</td>
							<td style={{ minWidth: '140px', backgroundColor: 'rgb(9, 154, 0)', color: 'white' }}>
								Edit cluster
							</td>
						</tr>
						<tr>
							<td>Portfolio Managers</td>
							<td>All wallets that are controlled by portfolio managers</td>
							<td>20 wallets</td>
							<td>10 alerts</td>
							<td style={{ minWidth: '140px', backgroundColor: 'rgb(9, 154, 0)', color: 'white' }}>
								Edit cluster
							</td>
						</tr>
						<tr>
							<td>Junior Traders</td>
							<td>All wallets that are controlled by junior traders</td>
							<td>10 wallets</td>
							<td>35 alerts</td>
							<td style={{ minWidth: '140px', backgroundColor: 'rgb(9, 154, 0)', color: 'white' }}>
								Edit cluster
							</td>
						</tr>
						<tr>
							<td>Accounting</td>
							<td>All wallets that are controlled by accounts team</td>
							<td>25 wallets</td>
							<td>15 alerts</td>
							<td style={{ minWidth: '140px', backgroundColor: 'rgb(9, 154, 0)', color: 'white' }}>
								Edit cluster
							</td>
						</tr>
					</tbody>
				</Table>
				</TableScrollbar>
			</div>
			<div className="m-5">
				<h3>YOUR NOTIFICATIONS</h3>
				<TableScrollbar>
					<Table>
					<thead>
						<tr>
							<th style={{ minWidth: '120px' }}>Type</th>
							<th style={{ minWidth: '250px' }}>Description</th>
							<th style={{ minWidth: '200px' }}>Portfolio Name</th>
							<th style={{ minWidth: '200px' }}>Alert Recipients</th>
							<th style={{ minWidth: '100px' }} />
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Limits</td>
							<td>Maximum of 500 ETH per transaction</td>
							<td>All Project Wallets</td>
							<td>You, @rogerTHAT, @hana</td>
							<td style={{ backgroundColor: '#00ff30' }}>Edit Notification</td>
						</tr>
						<tr>
							<td>Limits</td>
							<td>Maximum of 5000 ETH per day</td>
							<td>All Project Wallets</td>
							<td>You, @rogerTHAT, @risk404</td>
							<td style={{ backgroundColor: '#00ff30' }}>Edit Notification</td>
						</tr>
						<tr>
							<td>Limits</td>
							<td>Maximum of 2500 ETH per day</td>
							<td>Executive Controlled</td>
							<td>You, @rogerTHAT, @raggedJ</td>
							<td style={{ backgroundColor: '#00ff30' }}>Edit Notification</td>
						</tr>
						<tr>
							<td>Limits</td>
							<td>Alerts if value of total assets in wallets exceeds a threshold</td>
							<td>Junior Traders</td>
							<td>You, @rogerTHAT</td>
							<td style={{ backgroundColor: '#00ff30' }}>Edit Notification</td>
						</tr>
						<tr>
							<td>Allow-lists</td>
							<td>Approved counterparts and smart contracts</td>
							<td>Portfolio Managers</td>
							<td>You, @grosveynor</td>
							<td style={{ backgroundColor: '#00ff30' }}>Edit Notification</td>
						</tr>
						<tr>
							<td>Exclusion-lists</td>
							<td>Minimum of 20 ETH per month (team wages)</td>
							<td>Accounts Team</td>
							<td>You, @seasonH</td>
							<td style={{ backgroundColor: '#00ff30' }}>Edit Notification</td>
						</tr>
					</tbody>
					</Table>
				</TableScrollbar>
			</div>
		</div>
	);
}

export default Layout;
