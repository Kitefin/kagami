import React, {useState, useEffect} from 'react';  
import { Button, TextField, Dialog, DialogContent, DialogTitle, IconButton, Grid } from '@mui/material'; 
import { makeStyles } from '@mui/styles'; 
import AddIcon from '@mui/icons-material/Add';

import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; 
import GroupDiv from "../../common/GroupDiv";
const NODE_URL = "http://localhost:5000";  

const useStyles = makeStyles((theme) => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center', 
	} 
  }));
 
function EditAlert({open, dlgClose, id}) { 
	
	const getAlertById = async() => {
		const url = NODE_URL + `/api/alert/${id}`;  
		try{ 
			const res = await axios.get(url); 
			console.log(res.data)
			const { type, description, clusterName, recipients } = res.data;			 
			set_Type(type);
			set_Desc(description);
			set_ClusterName(clusterName);
			set_Recipients(recipients);
		}
		catch(err) {
			console.log(err) 
		} 
	} 
	  
  useEffect(() => {  
	if(id !== undefined && id !== '')
	{ 
    	getAlertById();	
	}
	},[id]); 

	const classes = useStyles();
	const [type, set_Type] = useState('');
	const [desc, set_Desc] = useState({});   
	const [clusterName, set_ClusterName] = useState('');   
	const [recipients, set_Recipients] = useState([]);

	const edit_Alert = async () => { 
		const {userInfo} = localStorage;
		const userAddress = JSON.parse(userInfo).address;
		const alert = {
			id: id,
			name: name,
			desc: desc,
			addresses: addresses,
			userAddress: userAddress
		} 		
		const url = NODE_URL + "/api/alert/edit";
		try{ 
			await axios.post(url, alert);		
		}
		catch(err) {
			console.log(err) 
		}
		dlgClose(); 
	}
  
	const delete_Alert = async () => {    
		const url = NODE_URL + `/api/alert/${id}`;
		try{ 
			await axios.delete(url, id);		  
		}
		catch(err) { } 
		dlgClose();
	}

	const AlertType = (   
		<TextField 
			id="standard-basic" 
			label="" 
		  	variant="standard"
		  	value={type}
		  	onChange={(e) => { set_Type(e.target.value); }}	
		  /> 
	);  
  
	const AlertDesc = (   
		<TextField 
			id="standard-basic" 
			label="" 
			variant="standard"
			value={desc}
			onChange={ e => { set_Desc(e.target.value); }}	
		/>  
	);
	
    const add_recipients = () => {
		const index = recipients.indexOf(recipient);
		console.log(index)
		if(index === -1)
		{
			recipients.push(recipient);
			set_Recipients(recipients);
		} 
	}

	const delete_recipient = (recipient_) => { 
		var index = recipients.indexOf(recipient_);
		recipients.splice(index, 1); 
		set_Recipients(recipients);
	}
        
	const recipientsDisplay = () => {
		let ps = [];	 
		for(let i in recipients)
		{
			const recipient_ = recipients[i];
			const div = (
			<div key={Number(i) + 1}>
				<span >{recipient_}</span> 
				<IconButton aria-label="delete" size="medium" onClick={() => { delete_recipient(recipient_) }}>
					<CloseIcon />
				</IconButton>
				<br/>
			</div>); 
			ps.push(div)
		}
		return ps;
	}
        
	const RecipientsDiv = ( 
		<div className='px-4'>			
			<div> 
				{ recipientsDisplay() }
			</div>
			<TextField 
				id="standard-basic" 
				label="" 
				variant="standard"  
				onChange={ e => { set_Recipient(e.target.value); }}	
				className='px-2'
			/>	
			<IconButton aria-label="delete" size="medium" onClick={() => { add_recipient() }}>
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
		<DialogTitle className="alert_title">Edit Notification</DialogTitle>
		<DialogContent dividers={true}> 
			<div className="text-center px-5 pr-5">    
				<div className="px-3 pr-3">
					<GroupDiv title='Cluster Name' comp={AlertType} />
					<div className='mt-4'>
						<GroupDiv title='Cluster Description' comp={AlertDesc} />
					</div>  
					<div className="mt-4">
						<GroupDiv title='Add Wallet Address' comp={RecipientsDiv} /> 
					</div> 
				</div>
			</div>
		</DialogContent> 
			<div className="text-center p-2">
				<Grid justifyContent="space-between" // Add it here :)
				container
				spacing={0}>
					<Grid item xs={2}></Grid>
					<Grid item>
						<Button variant="contained" className="create_alert_btn" onClick={ dlgClose }>
							<b className="text-white">Cancel</b>
						</Button>
					</Grid>
					<Grid item>
						<Button variant="contained" className="create_alert_btn" onClick={() => edit_Cluster()}>
							<b className="text-white">Edit</b>
						</Button> 
					</Grid>
					<Grid item> 
						<Button variant="contained" className="create_alert_btn" onClick={() => delete_Cluster()}>
							<b className="text-white">Delete</b>
						</Button> 
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</div> 
		</Dialog> 
	);
}

export default EditAlert;