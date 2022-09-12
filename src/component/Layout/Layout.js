import TableScrollbar from 'react-table-scrollbar'; 
import React, {useEffect, useState} from 'react';   
import { Button, Table, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CreateAlert from './Alert/CreateAlert';
import EditAlert from './Alert/EditAlert';
import CreateCluster from './Cluster/CreateCluster';
import EditCluster from './Cluster/EditCluster';
import axios from 'axios'; 
const NODE_URL = "http://localhost:5000"; 
  
function Layout() {  
	const [open1, setOpen1] = useState(false); 
	const [open2, setOpen2] = useState(false); 
	const [open3, setOpen3] = useState(false); 
	const [open4, setOpen4] = useState(false); 
	const [clusters, set_clusters] = useState([]);
	const [alerts, set_alerts] = useState([]);
	const [clusterTrs, setClusterTrs] = useState(undefined);
	const [alertTrs, setAlertTrs] = useState(undefined);
	const [edit_cluster_id, set_edit_cluster_id] = useState('');
	const [edit_alert_id, set_edit_alert_id] = useState('');
	
  
	const getClusters = async() => {
		const url = NODE_URL + "/api/cluster/";
		const {userInfo} = localStorage;
		const userAddress = JSON.parse(userInfo).address; 
		try{ 
			const res = await axios.get(url, {userAddress: userAddress});  
			getClustersTbl(res.data); 
		}
		catch(err) {
			console.log(err) 
		} 
	}
	  
	const getAlerts = async() => {
		const url = NODE_URL + "/api/alert/all/";
		const {userInfo} = localStorage;
		const email = JSON.parse(userInfo).email; 
		
		try{  
			const res = await axios.post(url, {email: email} );  
			 
			getAlertsTbl(res.data); 
		}
		catch(err) {
			console.log(err) 
		} 
	}
	  

  useEffect(() => {  
    getClusters();	
	getAlerts();
	}, [open1, open2, open3, open4]); 

	const handleClickOpen1 = () => {
		setOpen1(true); 
	  };
	
	  const handleClose1 = () => {
		setOpen1(false);
	  };

	  const handleClickOpen2 = () => {
		setOpen2(true); 
	  };
	
	  const handleClose2 = () => {
		setOpen2(false);
	  };

	  const handleClose3 = () => {
		getClusters();	
		setOpen3(false); 
	  }; 

	  const handleClose4 = () => {
		getAlerts();	
		setOpen4(false); 
	  }; 

	  const onEditCluster = (_id) => {
		set_edit_cluster_id(_id);
		setOpen3(true);
	  }

	  const onEditAlert = (_id) => {
		set_edit_alert_id(_id);
		setOpen4(true);
	  }
  

	  const openCreateAlertBtn = (
		<Button variant="contained" className="create_alert_open_btn" onClick={() =>handleClickOpen1()}>
			<b>CREATE NOTIFICATION</b>
		</Button>
	);

	const openCreateClusterBtn = (
		<Button variant="contained" className="create_cluster_open_btn" onClick={()=>handleClickOpen2()}>
			<b>CREATE CLUSTER</b>
		</Button>
	);

	const getClustersTbl = (clusters) => {
		set_clusters(clusters);
		let trs = [];
		for(var i in clusters)
		{
			const cluster = clusters[i];
			const {name, description, addresses, _id} = cluster;
			const tr = (
			<tr key={Number(i)}>
				<td>{name}</td>
				<td>{description}</td>
				<td>{addresses.length}</td>
				<td>7 Alerts (need to work)</td>
				<td style={{ minWidth: '140px',  color: 'white', textAlign: 'center' }}>					
					<Button variant="contained" size="small" color="primary" startIcon={<EditIcon fontSize="small" />} onClick={() => onEditCluster(_id)}>
						<b>Edit</b>
					</Button>
				</td>
			</tr>);
			trs.push(tr);
		}
		setClusterTrs(trs);
	}
	
	const getAlertsTbl = (alerts) => {
		set_alerts(alerts);
		let trs = [];
		const {userInfo} = localStorage;
		const email = JSON.parse(userInfo).email; 
		for(var i in alerts)
		{
			const alert = alerts[i];
			// console.log(alert)
			const {type, description, clusterName, recipients, _id} = alert;
			const desc = description.minMax + " of " + description.amount + " ETH per " + description.per;
			let recipientsStr = '';
			for(var j in recipients)
			{
				let recipient = recipients[j];
				if(recipient === email)  recipient = "@You"; 
				recipientsStr += recipient ;
				if(j < recipients.length - 1)
					recipientsStr +=  ", ";
			}
			const tr = (
			<tr key={Number(i)}>
				<td>{type}</td>
				<td>{ desc }</td>
				<td>{clusterName}</td>
				<td>{recipientsStr}</td>
				<td style={{ minWidth: '140px',  color: 'white', textAlign: 'center' }}>					
					<Button variant="contained" size="small" color="primary" startIcon={<EditIcon fontSize="small" />} onClick={() => onEditAlert(_id)}>
						<b>Edit</b>
					</Button>
				</td>
			</tr>);
			trs.push(tr);
		}
		setAlertTrs(trs);
	}

	
	
	return (
		<div className="layout-back p-5"> 
			<CreateAlert open={open1} dlgClose={handleClose1} clusters={clusters} />
			<EditAlert open={open4} dlgClose={handleClose4} clusters={clusters} id={edit_alert_id}/>
			
			<CreateCluster open={open2} dlgClose={handleClose2} />
			<EditCluster open={open3} dlgClose={handleClose3} id={edit_cluster_id}/>
			
			
			<Grid
				justifyContent="space-between"
				container
				spacing={0}
			>
				<Grid item xs={2}> </Grid>
				<Grid item> 
				 { openCreateClusterBtn } 				
				</Grid>				
				<Grid item>
					 { openCreateAlertBtn } 
				</Grid>				
				<Grid item xs={2}> </Grid>
			</Grid>
			 
			<div className="m-5">
				<h2>YOUR CLUSTERS</h2>
				<TableScrollbar>
				<Table>
				<thead>
						<tr>
							<th style={{ minWidth: '200px' }}>Cluser Name</th>
							<th style={{ minWidth: '300px' }}>Cluster Description</th>
							<th style={{ minWidth: '150px' }}>Wallets Count</th>
							<th style={{ minWidth: '150px' }}>Alerts Count</th>
							<th style={{ minWidth: '140px' }} />
						</tr>
					</thead>
					<tbody>
						{clusterTrs}						
						{/* <tr>
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
						</tr> */}
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
						{alertTrs}
						{/* <tr>
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
						</tr> */}
					</tbody>
					</Table>
				</TableScrollbar>
			</div>
		</div>
	);
}

export default Layout;
