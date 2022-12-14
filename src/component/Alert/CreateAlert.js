
import React, {useEffect, useState} from 'react';   
import { Button, Grid, Chip, TextField, Dialog, DialogContent, DialogTitle, Autocomplete } from '@mui/material';
import GroupDiv from "../common/GroupDiv"; 
import axios from 'axios'; 
import {GET_USER_ADDRESS, GET_USER_EMAIL} from "../../util/localStore"; 
import {NODE_URL} from "../../config";
import {
	TYPES,  
   minMaxs,  
  	pers,  
	GET_DESC_ID_BY_TITLE, 
	NEED_DESC_DETAIL,
	GET_DESCS_BY_TYPE_ID 
} from './util';
import {isEmpty} from "../../util/valid"

function CreateAlert({open, dlgClose, clusters}) {     
	const [type, set_Type] = useState(TYPES[0].title);
	const [desc, set_Desc] = useState('');
	const [descs, set_Descs] = useState([]);   
	const [descId, set_DescId] = useState(0);   
	 
	const [emails, set_Emails] = useState([]);   
	const [minMax, set_MinMax] = useState(null);
	const [per, set_Per] = useState(null);
	const [amount, set_Amount] = useState(null);
	const [portFolio, set_PortFolio] = useState(null);
	const [recipients, set_Recipients] = useState(["@You"]); 
	const [descDetail, set_DescDetail] = useState(false);  

	const [amountError, set_AmountError] = useState('');
	const [clusterNameError, set_ClusterNameError] = useState('');
	const [recipientsError, set_RecipientsError] = useState('');	
	const [minMaxError, set_MinMaxError] = useState('');
	const [perError, set_PerError] = useState('');
 
	const dlg_close = () => { 
		set_Type (TYPES[0].title);
		set_Desc('');
		set_Descs([]);   
		set_DescId(0);
		// set_Emails([]);   
		set_MinMax(null);
		set_Per(null);
		set_Amount(null);
		set_PortFolio(null);
		set_Recipients(["@You"]); 
		set_DescDetail(false);
		dlgClose();
	}

	const isEmptyAlert = (alert) => {
		 let ok = false;
		const {clusterName, description, recipients} = alert;
		if(isEmpty(clusterName))
		{
			set_ClusterNameError("cluster name is empty!")
			ok = false;
		}
		if(availableRecipients.length === 0)
		{
			set_RecipientsError("Recipients is empty!")
			ok = false;
		}
		if(description)
		{
			if( NEED_DESC_DETAIL( description.id) )
			{
				const {minMax, amount, per} = description;
				if(isEmpty(minMax)) 
				{
					set_MinMaxError("Select min or max")
					ok = false;
				}
				if(isEmpty(amount)) 
				{
					set_AmountError("Type amount value")
					ok = false;
				}
				if(isEmpty(per)) 
				{
					set_PerError("Select case of per")
					ok = false;
				}
			}  
		} 
		return ok;
	}

	const create_Alert = async () => {
		let recipients_ = [];
		for(var i in recipients) {
			let recipient = recipients[i];
			if(recipient === '@You') recipient = GET_USER_EMAIL(); 
			recipients_.push(recipient);
		}
		let description = {};
		if(descDetail)
		{    
			description = {
				id: descId,
				minMax: minMax,
				amount: amount,
				per: per
			};	
		}
		else 
			description = {
				id: descId
			};	

		const alert = {
			type: type,
			description: description,
			clusterName: portFolio,
			recipients: recipients_ 
		}  

		const ok = isEmptyAlert(alert);
		  
		if(!ok) return;

		const url = NODE_URL + "/api/alert/";
		try { 
			await axios.post(url, alert);   
		}
		catch(err) {
			console.log(err) 
		}  		
		dlg_close(); 

	}  
  
	const getEmails = async() => { 
		const url = NODE_URL + "/api/email/"; 
		try{ 
			const res = await axios.get(url); 
			set_Emails(res.data);
		}
		catch(err) {
			console.log(err) 
		} 
	}

	useEffect(()=>{
		getEmails();  
	}, []);

	useEffect(()=>{
		setType(type)
	}, [type])

	useEffect(()=>{
		setDesc(desc)
	}, [desc])

	let portfolios = [];
	
	if(clusters && Object(clusters).length > 0) {
		for(var i in clusters)
		{
			const cluster = clusters[i];
			const portfolio_ = {
				title: cluster.name,
				id: cluster._id
			}
			portfolios.push(portfolio_);
		}  
	}  
 
	let availableRecipients = [ "@You" ];
	 
	if( emails ) 
	{ 
		const userAddress = GET_USER_ADDRESS();
		for(var i in emails)
		{
			const email = emails[i];
			if(email.address !== userAddress)
				availableRecipients.push(email.email);
		}
	} 
	
	const setDesc = (desc_) => {  
		set_Desc(desc_);  
		const id = GET_DESC_ID_BY_TITLE(desc_); 
		set_DescId(id); 
		set_DescDetail(NEED_DESC_DETAIL(id)); 
	}  

	const setType = (type_) => { 
		set_Type(type_); 
		const descs_ = GET_DESCS_BY_TYPE_ID(type_);
		set_Descs(descs_);
		setDesc(descs_[0].title); 
	}
   
    const ComboType = (  
		<Autocomplete
		freeSolo 
		options={TYPES.map((option) => option.title)}
        id="controlled-demo"
		defaultValue={TYPES[0].title} 
		value={type}
        onChange={(event, newValue) => { setType(newValue); }}
        renderInput={(params) => (
          <TextField {...params} label="" variant="standard" />
        )}
		style={{width: '80%', marginLeft: '10%'}}
      /> 
   	); 
	 
	const ComboDescMinMax = (
		<>
		<Autocomplete
			freeSolo
			id="combo-box-demo" 	
			options={minMaxs.map((option) => option.title)}	  
			renderInput={(params) => <TextField {...params} label="Min or Max" variant="standard" />}
			value={minMax}
			onChange=
			{
				(event, value) => 
				{ 
					if(value !== null) 
					{
						set_MinMaxError("");
						set_MinMax(value) ;
					}
					else  
						set_MinMaxError("Select min or max")
				}
			} 
		/>
		<p className='mt-3 mb-0 text-red'>{minMaxError}</p>
		</>
	);

	const ComboDescPer = (
		<>
		<Autocomplete
			freeSolo
			id="combo-box-demo" 
			options={pers.map((option) => option.title)}
			renderInput={(params) => <TextField {...params} label="Per" variant="standard" />}
			value={per}
			onChange=
			{
				(event, value) => 
				{
					if(value !== null)
					{
						set_Per(value)
						set_PerError('');
					}
					else set_PerError("Select case of per")
				}
			} 
		/>
		<p className='mt-3 mb-0 text-red'>{perError}</p>
		</>
	);

	const setAmount = (val) => {
		if(val.length > 30)
			set_AmountError('Amount must be less than 30 charactors')
		else 
		{
			set_AmountError('')
			set_Amount(val);
		} 
	}

	const InputAmount = ( 
		<>
			<TextField  
				label="Amount" 
				variant="standard" 
				defaultValue={amount} 
				value={amount}
				onChange={(e) => setAmount(e.target.value) }
			/>
			<p className='mt-3 mb-0 text-red'>{amountError}</p>
		</>
	);

	const ComboDesc = (
		<>
			<Autocomplete
				freeSolo
				id="combo-box-demo" 
				options={descs.map((option) => option.title)} 
				value={desc}
				renderInput={(params) => <TextField {...params} label="" variant="standard" />}
				onChange={(event, value) => setDesc(value)}
				style={{width: '80%', marginLeft: '10%'}}
			/>
			{descDetail ? (
				<div className="p-3">
					<GroupDiv title="Detail Setting" comp={
						<div className="px-1 pr-1">
						<Grid
							justifyContent="space-between"
							container
							spacing={0}
						>
							<Grid item xs={3}> {ComboDescMinMax} </Grid>
							<Grid item className="mt-4"> of </Grid>
							<Grid item xs={2}> {InputAmount} </Grid>
							<Grid item className="mt-4"> ETH per </Grid>
							<Grid item xs={3}> {ComboDescPer} </Grid>
						</Grid> 
						</div>
					} /> 
				</div>
			)
			: null}
		</>
	);
 
	const ComboPort = (
		<>
			<Autocomplete
				freeSolo
				id="combo-box-demo" 
				options={portfolios.map((option) => option.title)}
				renderInput={(params) => 
					<TextField 
						{...params} 
						label="" 
						variant="standard" 
						style={{color: 'white', textAlign: 'center'}}  
					/>
				} 
				style={{color: 'white', textAlign: 'center'}} 
				value={portFolio}	 
				onChange=
				{
					(event, value) => 
					{ 
						if(value !== null) 
						{
							set_PortFolio(value);
							set_ClusterNameError("");
						}
						else set_ClusterNameError("cluster name is empty!")
					}
				}
			/>
			<p className='mt-3 mb-0 text-red'>{clusterNameError}</p>
		</>
	);
    
	const HookRecipients = (
		<>
		<Autocomplete
		  	multiple
		  	id="tags-filled"
			options={availableRecipients}
			getOptionLabel={(option) => option}
		  	// options={availableRecipients.map((option) => option.title)}
		   	defaultValue={[availableRecipients[0]]}
		  	freeSolo  
			renderTags={(value, getTagProps) =>
			value.map((option, index) => (
			  	<Chip variant="outlined" label={option} {...getTagProps({ index })} />
				))
		  	}
		  	renderInput={(params) => (
				<TextField {...params} variant="filled" label="" placeholder="" />
		  	)}
		  	style={{width: '80%', marginLeft: '10%'}}
			onChange=
			{
				(e, val) => 
				{
					if(val.length > 0)
					{
						set_Recipients(val);
						set_RecipientsError("");
					}
					// else set_RecipientsError("Recipients is empty!")
				}
			}
		/>
		<p className='mt-3 mb-0 text-red'>{recipientsError}</p>
		</>
	); 
 	 
	return (
		<> 
			<Dialog  
				open={open}
				onClose={dlg_close}
				scroll={'paper'}  
			> 
		<DialogTitle className="alert_title"> 
			<Grid container spacing={2}>
				<Grid item xs={5}>
					<span>Set Policies for</span>
				</Grid>
				<Grid item xs={5} style={{marginLeft: '-3%'}}>
					{ComboPort} 
				</Grid>
				<Grid item xs={2}>
					<span>Cluster</span>
				</Grid>
			</Grid>
		</DialogTitle>
		
		<DialogContent dividers={true}> 
			<div className="text-center px-5 pr-5">    
				<div className="px-3 pr-3">
					<GroupDiv title='Select Notification Type' comp={ComboType} />
					<div className='mt-4'>
						<GroupDiv title='Select Notification Description' comp={ComboDesc} />
					</div>
					<div className="mt-4">
						<GroupDiv title='Select Notification Recipients' comp={HookRecipients} /> 
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
				<Grid item xs={2}>
				<Button variant="contained" className="create_alert_btn" onClick={() => create_Alert()}>
					<b className="text-white">Create</b>
				</Button> 
				</Grid>
				<Grid item xs={2}></Grid>
				</Grid>
			</div>   
			</Dialog> 
		</>
	);
}

export default CreateAlert;

 
