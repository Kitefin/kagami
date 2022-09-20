import TableScrollbar from 'react-table-scrollbar'; 
import React, {useEffect, useState} from 'react';   
import { Button, Table, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
 
import CreateAlert from '../Alert/CreateAlert';
import EditAlert from '../Alert/EditAlert';
import CreateCluster from '../Cluster/CreateCluster';
import EditCluster from '../Cluster/EditCluster';
import axios from 'axios'; 
import {GET_USER_ADDRESS, GET_USER_EMAIL} from "../../util/localStore"; 
import {NODE_URL} from "../../config";

import {  
	TYPE_DESC_MINMAX_AMOUNT_PER ,
   	TPYE_DESC_2 ,
   	TPYE_DESC_3 ,
   	TPYE_DESC_4,   
	GET_DESC_TITLE_BY_ID
 } from '../Alert/util';

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
	  
	const [loading, setLoading] = useState(false);

	const getClusters = async() => {	
		setLoading(true); 
		const url = NODE_URL + "/api/cluster/"; 
		const userAddress = GET_USER_ADDRESS(); 
		try{ 
			const res = await axios.get(url, {userAddress: userAddress});  
			getClustersTbl(res.data); 
		}
		catch(err) {
			console.log(err) 
			setLoading(false);
		}  
	}
	  
	const getAlerts = async() => {
		setLoading(true);
		const url = NODE_URL + "/api/alert/all/";  
		const address = GET_USER_ADDRESS();  
		if(address !== undefined)
		{	
			try{  
				const res = await axios.post(url, {address: address} );			 
				getAlertsTbl(res.data); 
			}
			catch(err) {
				console.log(err);
				setLoading(false);
			}
		}  
		else 	setLoading(false);
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
			<b>CREATE POLICY</b>
		</Button>
	);

	const openCreateClusterBtn = (
		<Button variant="contained" className="create_cluster_open_btn" onClick={()=>handleClickOpen2()}>
			<b>CREATE CLUSTER</b>
		</Button>
	);
 

	const get_alert_count = async(cluster_name) => {
		const url = NODE_URL + "/api/alert/getCount/"; 
		try{ 
			const res = await axios.post(url, {clusterName: cluster_name});   
			return res.data;
		}
		catch(err) {
			console.log(err)
			return 0; 
		} 
	}

	const getClustersTbl = async(clusters) => {
		setLoading(true)
		set_clusters(clusters);
		let trs = [];
		for(var i in clusters)
		{
			const cluster = clusters[i];
			const {name, description, addresses, _id} = cluster;
			const alertsCnt = await get_alert_count(name);
			const tr = (
			<tr key={Number(i)}>
				<td>{name}</td>
				<td>{description}</td>
				<td>{addresses.length}</td>
				<td>{alertsCnt} Alerts  </td>
				<td style={{ minWidth: '140px',  color: 'white', textAlign: 'center' }}>					
					<Button variant="contained" size="small" color="primary" startIcon={<EditIcon fontSize="small" />} onClick={() => onEditCluster(_id)}>
						<b>Edit</b>
					</Button>
				</td>
			</tr>);
			trs.push(tr);
		}
		setClusterTrs(trs);
		setLoading(false);
	}
	
	const getAlertsTbl = (alerts) => {
		setLoading(true)
		set_alerts(alerts);
		let trs = [];
	 
		const email = GET_USER_EMAIL();
		for(var i in alerts)
		{
			const alert = alerts[i];
			// console.log(alert)
			const {type, description, clusterName, recipients, _id} = alert;
			let desc;
			if(description.id === TYPE_DESC_MINMAX_AMOUNT_PER || description.id === TPYE_DESC_4)
				desc = description.minMax + " of " + description.amount + " ETH per " + description.per;
			else { 
					desc = GET_DESC_TITLE_BY_ID(description.id);
			}
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
		setLoading(false);
	}

	const handleClose = () => {
		setLoading(false);
	  };
	
	return (
		<div className="layout-back p-5"> 
			<CreateAlert open={open1} dlgClose={handleClose1} clusters={clusters} />
			<EditAlert open={open4} dlgClose={handleClose4} clusters={clusters} id={edit_alert_id}/>
			
			<CreateCluster open={open2} dlgClose={handleClose2} />
			<EditCluster open={open3} dlgClose={handleClose3} id={edit_cluster_id}/>
			
			<Backdrop
       			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        		open={loading} 
				onClick={handleClose}
      		>
        		<CircularProgress color="inherit" />
      		</Backdrop>

			
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
							<th style={{ minWidth: '200px' }}>Cluster Name</th>
							<th style={{ minWidth: '300px' }}>Cluster Description</th>
							<th style={{ minWidth: '150px' }}>Wallets Count</th>
							<th style={{ minWidth: '150px' }}>Alerts Count</th>
							<th style={{ minWidth: '140px' }} />
						</tr>
					</thead>
					<tbody>
						{clusterTrs}	 
					</tbody>
				</Table>
				</TableScrollbar>
			</div>
			<div className="m-5">
				<h3>YOUR POLICIES</h3>
				<TableScrollbar>
					<Table>
					<thead>
						<tr>
							<th style={{ minWidth: '120px' }}>Type</th>
							<th style={{ minWidth: '250px' }}>Description</th>
							<th style={{ minWidth: '200px' }}>Cluster Name</th>
							<th style={{ minWidth: '200px' }}>Notification Recipients</th>
							<th style={{ minWidth: '100px' }} />
						</tr>
					</thead>
					<tbody>
						{alertTrs} 
					</tbody>
					</Table>
				</TableScrollbar>
			</div>
		</div>
	);
}

export default Layout;
