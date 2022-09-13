import React, { useState, useEffect } from 'react'; 
import { Button, TextField, Dialog, DialogContent, DialogTitle, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import CloseIcon from '@mui/icons-material/Close';
import GroupDiv from "../common/GroupDiv";
import axios from 'axios';   
import {GET_USER_ADDRESS, GET_USER_EMAIL} from "../../util/localStore"; 
import {NODE_URL} from "../../config";

function CreateCluster({open, dlgClose}) {  

	const [name, set_Name] = useState('');
	const [desc, set_Desc] = useState('');   
	const [email, set_Email] = useState(null);   
	const [address, set_Address] = useState('');   
	const [addresses, set_Addresses] = useState([]);   
	const [address_Display, set_Address_Display] = useState(null);
 
	const dlg_close = () => {
		set_Name('');
		set_Desc('');
		set_Address('');   
		set_Addresses([]);    
		dlgClose();
	}

	const create_Cluster = async () => {  
	 
		const userAddress = GET_USER_ADDRESS();  
		const cluster = {
			name: name,
			desc: desc,
			addresses: addresses,
			userAddress: userAddress,
			email: email
		}  
		const url = NODE_URL + "/api/cluster/";
		try { 
			await axios.post(url, cluster);   
		}
		catch(err) {
			console.log(err) 
		} 
		dlg_close();
	}  

	useEffect(() => {  
		const email_ = GET_USER_EMAIL();
		set_Email(email_);  
		}, []); 

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
	
    const add_Address = () => {
		const index = addresses.indexOf(address); 
		if(index === -1)
		{
			addresses.push(address);
			set_Addresses(addresses);
			set_Address('');
			const addresses_display = get_addresses_display(addresses);
			set_Address_Display(addresses_display);
		} 
	}

	const delete_Address = (address_) => {  
		var index = addresses.indexOf(address_);
		addresses.splice(index, 1); 
		set_Addresses(addresses);
		set_Address(''); 
		const addresses_display = get_addresses_display(addresses);
		set_Address_Display(addresses_display);
	}
        
	const get_addresses_display = (addresses_) => { 
		let ps = [];	 
		for(let i in addresses_)
		{
			const address_ = addresses_[i];
			const div = (
			<div key={i}>
				<span >{address_}</span> 
				<IconButton aria-label="delete" size="medium" onClick={() => { delete_Address(address_) }}>
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
				{ address_Display  }
			</div> 
			<TextField 
				id="standard-basic" 
				label="" 
				variant="standard"  
				onChange={ e => { set_Address(e.target.value) }}	
				className='px-2'
				value={address}
			/>	
			<IconButton aria-label="add" size="medium" onClick={() => { add_Address() }}>
				<AddIcon />
			</IconButton>	 
		</div>
	);

	const YourEmail = (   
		<TextField 
			id="standard-basic" 
			label="" 
			variant="standard"  
			onChange={ e => { set_Email(e.target.value); }}	
		/>  
	);

	return (
		<Dialog   
			open={open}
			onClose={dlg_close}
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
						{
							email === null ? 
							(
								<div className="mt-4">
									<GroupDiv title='Your Email' comp={YourEmail} /> 
								</div> 
							) : null
						}
					</div>
				</div>
			</DialogContent> 
			<div className="text-center p-2">
				<Grid justifyContent="space-between"  
					container
					spacing={0}>
					<Grid item xs={2}></Grid>
					<Grid item> 
						<Button variant="contained" className="create_alert_btn" onClick={ dlg_close }>
							<b className="text-white">Cancel</b>
						</Button> 
					</Grid>
					<Grid item>
						<Button variant="contained" className="create_alert_btn" onClick={() => create_Cluster()}>
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