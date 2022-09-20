import React, { useState, useEffect } from 'react'; 
import { Button, TextField, Dialog, DialogContent, DialogTitle, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import CloseIcon from '@mui/icons-material/Close';
import GroupDiv from "../common/GroupDiv";
import axios from 'axios';   
import {GET_USER_ADDRESS, GET_USER_EMAIL} from "../../util/localStore"; 
import {NODE_URL} from "../../config";
import {isEmpty, isAddress, isEmail} from "../../util/valid";

function CreateCluster({open, dlgClose}) {
	const [name, set_Name] = useState('');
	const [nameError, set_NameError] = useState('');
	const [descError, set_DescError] = useState('');
	const [addressError, set_AddressError] = useState('');
	const [emailError, set_EmailError] = useState('');
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
		set_Address_Display(null) ;
		set_NameError('');
		set_DescError('');
		set_AddressError('');
		set_EmailError('');
		set_Desc('');   
		set_Email(null); 
		dlgClose();
	}


	const isEmptyCluster = (cluster) => { 
		const {name, desc, addresses, userAddress, email} = cluster;
		const isNameEmpty = isEmpty(name);
		const isDescEmpty = isEmpty(desc); 
		const isAddressesEmpty = addresses.length === 0;
		const isUserAddressEmpty = isEmpty(userAddress);
		const isEmailEmpty = isEmpty(email); 
		if(isNameEmpty) 
		{
			set_NameError("Cluster name is empty!"); 
			return false;
		}
		if(isDescEmpty) 
		{
			set_DescError("Cluster description is empty!"); 
			return false;
		}
		if(isAddressesEmpty) {
			set_AddressError("Wallet Addresses is empty!"); 
			return false;
		}
		if(isEmailEmpty) {
			set_EmailError("Email is empty!"); 
			return false;
		}
        if(isUserAddressEmpty) { 
			return false;
		}
		return true;
	}

	const checkCluster = () => {    
		if(nameError !== '')  
			return false; 
		if(descError !== '')  
			return false; 
		if(emailError !== '') 
			return false;          
		return true;
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
		let ok = isEmptyCluster(cluster);
		if(!ok) return;
		ok = checkCluster();
		if(!ok) return;
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
		// const email_ = GET_USER_EMAIL();
		// set_Email(email_);  
		}, []); 

	
	const setName = (val) => {
		if(val.length > 30)
			set_NameError('Cluster Name must be less than 30 charactors.')
		else 
		{
			set_NameError('')
			set_Name(val);
		}
	} 

	const ClusterName = (   
		<>
			<TextField 
				id="standard-basic" 
				label="" 
				variant="standard"  
				onChange={(e) => { setName(e.target.value); }}	
				value={name}
			/>
			<p className='mt-3 mb-0 text-red'>{nameError}</p> 
		</>
	);  
  
	const setDesc = (val) => {
		if(val.length > 30)
			set_DescError('Cluster Description must be less than 30 charactors.');
		else 
		{
			set_DescError('');
			set_Desc(val);
		}
	}
 
	const ClusterDesc = (   
		<>
			<TextField 
				id="standard-basic" 
				label="" 
				variant="standard"  
				onChange={ e => { setDesc(e.target.value); }}	
				value={desc}
			/>  
			<p className='mt-3 mb-0 text-red'>{descError}</p> 
		</>
	);

	

    const add_Address = () => {
		const ok = isAddress(address);
		if(!ok) 
		{
			set_AddressError('Wallet Address type error');
			return;
		} 
		set_AddressError('');
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
  
	const setAddress = (val) => {
		if(val.length > 42 )
		{ 
			set_AddressError('Wallet Address must be less than 30 charactors.');  
		}
		else 
		{
			set_AddressError('');
			set_Address(val)
		}
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
				onChange={ e => { setAddress(e.target.value) }}	
				className='px-2'
				value={address}
			/>	
			<IconButton aria-label="add" size="medium" onClick={() => { add_Address() }}>
				<AddIcon />
			</IconButton>	 
			<p className='mt-3 mb-0 text-red'>{addressError}</p> 
			
		</div>
	);

	const setEmail = (val) => {
		if(isEmail(val))
		{
			set_Email(val);
			set_EmailError('');
		}
		else
			set_EmailError('Valied Email failure!');
	}

	const YourEmail = (   
		<>
			<TextField 
				id="standard-basic" 
				label="" 
				variant="standard"
				value={email}
				onChange={ e => { setEmail(e.target.value); }}	
			/>  
			<p className='mt-3 mb-0 text-red'>{emailError}</p> 
		</>
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
						<div className="mt-4">
							<GroupDiv title='Notification Email' comp={YourEmail} /> 
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