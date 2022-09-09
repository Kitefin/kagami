import React, {useState} from 'react';   
import {Button, TextField, Dialog, DialogContent, DialogTitle, IconButton, Grid } from '@material-ui/core'; 
import AddIcon from '@material-ui/icons/Add';
import GroupDiv from "../common/GroupDiv";
import axios from 'axios'; 
import { makeStyles } from '@material-ui/core/styles'; 
const NODE_URL = "http://localhost:5000"; 
import './layout.css';

const useStyles = makeStyles((theme) => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center', 
	} 
  }));

function CreateCluster({open, dlgClose}) { 
	const classes = useStyles();
	const [name, set_Name] = useState('');
	const [desc, set_Desc] = useState('');   
	const [address, set_Address] = useState('');   
	const [addresses, set_Addresses] = useState([]);   

	const create_Cluster = () => {		 
		const cluster = {
			name: name,
			desc: desc,
			addresses: addresses,
			userAddress: localStorage.userAddress
		}
		console.log(cluster);
		create(cluster); 
		dlgClose();
    }

	const create = async (cluster) => {   

		const url = NODE_URL + "/api/cluster/";
		try{
			// console.log(url);
			// console.log(cluster);
			const res = await axios.post(url, cluster);  
			// alert(JSON.stringify( res.data )); 
		}
		catch(err) {
			console.log(err) 
		} 
	  }
	

	const ClusterName = (   
		<TextField 
			id="standard-basic" 
		  label="" 
		  variant="standard"  
		  onChange={(e) => { set_Name(e.target.value); }}	
		  /> 
	);  
  
	const ClusterDesc = (   
		<TextField 
		id="standard-basic" 
		label="" 
		variant="standard"  
		onChange={ e => { set_Desc(e.target.value); }}	
		/>  
	);
	
   const addAddress = ( ) => {
	addresses.push(address);
	set_Addresses(addresses);
	console.log(addresses);
	set_Address('')
   }
        
	const addressesDisplay = () => {
		let ps = [];
		ps.push(<p>{address}</p>)
		 
		for(let i in addresses)
		{
			const address_ = addresses[i];
			const p = <p>{address_}</p>; 
			ps.push(p)
		}
		return ps;
	}
 
	const AddWalletAddress = ( 
		<div className='px-4'>
			
			<div> 
				{ addressesDisplay() }
			</div>	

			<TextField 
				id="standard-basic" 
				label="" 
				variant="standard"  
				onChange={ e => { set_Address(e.target.value); }}	
				className='px-2'
			/>	
			<IconButton aria-label="delete" size="medium" onClick={() => { addAddress() }}>
				<AddIcon />
			</IconButton>
				
		</div>
	);

	return (
		<Dialog  
			className={classes.modal}
			open={open}
			onClose={dlgClose}
			scroll={'paper'}    
		> 
		<DialogTitle className="alert_title">Create Cluster</DialogTitle>
		<DialogContent dividers={true}> 
			<div className="text-center px-5 pr-5">    
				<div className="px-3 pr-3">
					<GroupDiv title='Cluster Name' comp={ClusterName} />
					<div className='mt-4'>
						<GroupDiv title='Cluster Description' comp={ClusterDesc} />
					</div>  
					<div className="mt-4">
						<GroupDiv title='Add Wallet Address' comp={AddWalletAddress} /> 
					</div> 
				</div>
			</div>
		</DialogContent> 
			<div className="text-center p-2">
				<Grid justifyContent="space-between"  
					container
					spacing={0}>
					<Grid item xs={2}></Grid>
					<Grid item> 
						<Button variant="contained" className="header-createalert-btn" onClick={ dlgClose }>
							<b className="text-white">Cancel</b>
						</Button> 
					</Grid>
					<Grid item>
						<Button variant="contained" className="header-createalert-btn" onClick={() => create_Cluster()}>
							<b className="text-white">Create</b>
						</Button> 
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</div> 
		</Dialog> 
	);
}

export default CreateCluster;