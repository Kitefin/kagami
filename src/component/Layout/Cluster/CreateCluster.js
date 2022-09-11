import React, {useState} from 'react'; 
import { Button, TextField, Dialog, DialogContent, DialogTitle, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CloseIcon from '@mui/icons-material/Close';
import GroupDiv from "../../common/GroupDiv";
import axios from 'axios';  
const NODE_URL = "http://localhost:5000";  
  
function CreateCluster({open, dlgClose}) {  
	const [name, set_Name] = useState('');
	const [desc, set_Desc] = useState('');   
	const [address, set_Address] = useState('');   
	const [addresses, set_Addresses] = useState([]);   
 
	const create_Cluster = async () => {    
		const cluster = {
			name: name,
			desc: desc,
			addresses: addresses,
			userAddress: localStorage.userAddress
		} 
		const url = NODE_URL + "/api/cluster/";
		try { 
			await axios.post(url, cluster);   
		}
		catch(err) {
			console.log(err) 
		} 
		dlgClose();
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
	
    const addAddress = () => {
		const index = addresses.indexOf(address);
		console.log(index)
		if(index === -1)
		{
			addresses.push(address);
			set_Addresses(addresses);
		} 
	}

	const deleteAddress = (address_) => { 
		var index = addresses.indexOf(address_);
		addresses.splice(index, 1); 
		set_Addresses(addresses);  
	}
        
	const addressesDisplay = () => {
		let ps = [];	 
		for(let i in addresses)
		{
			const address_ = addresses[i];
			const div = (
			<div key={Number(i) + 1}>
				<span >{address_}</span> 
				<IconButton aria-label="delete" size="medium" onClick={() => { deleteAddress(address_) }}>
					<CloseIcon />
				</IconButton>
				<br/>
			</div>); 
			ps.push(div)
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
			<IconButton aria-label="add" size="medium" onClick={() => { addAddress() }}>
				<AddIcon />
			</IconButton>				
		</div>
	);

	return (
		<Dialog   
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