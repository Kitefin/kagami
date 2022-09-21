import React, {useEffect, useState} from 'react';   
import {Button,Grid,Dialog,DialogContent,DialogTitle,IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import CloseIcon from '@mui/icons-material/Close';
import GroupDiv from "../common/GroupDiv"; 
import ErrorDiv from '../common/ErrorDiv';
import ComboBox from '../common/ComboBox';
import ComboList from '../common/ComboList';
import TextBox from '../common/TextBox';
import axios from 'axios'; 
import {GET_USER_ADDRESS, GET_USER_EMAIL} from "../../util/localStore"; 
import {NODE_URL} from "../../config";
import { 
	TYPES,	 
	minMaxs,  
   	pers,
   	GET_DESC_TITLE_BY_ID,
   	GET_DESC_ID_BY_TITLE,
	   LIMIT_AMOUNT_PER ,
	   LIMIT_TOTAL_ASSETS ,
	 WHITELIST_APPROVE ,
	 EXCLUSION_LIST,
	GET_DESCS_BY_TYPE_ID
 } from './util';
 
import {isEmpty, isAddress, isEmail} from "../../util/valid";

function EditAlert({open, dlgClose, clusters, id}) {  
	const [type, set_Type] = useState('');
	const [desc, set_Desc] = useState('');
	const [descs, set_Descs] = useState([]);   
	const [descId, set_DescId] = useState(0);
	const [emails, set_Emails] = useState([]);   
	const [minMax, set_MinMax] = useState(null);
	const [per, set_Per] = useState(null);
	const [amount, set_Amount] = useState('');
	const [portFolio, set_PortFolio] = useState(null);
	const [recipients, set_Recipients] = useState([]);	 	
	const [amountError, set_AmountError] = useState('');
	const [clusterNameError, set_ClusterNameError] = useState('');
	const [recipientsError, set_RecipientsError] = useState('');	
	const [minMaxError, set_MinMaxError] = useState('');
	const [perError, set_PerError] = useState('');
	const [error, set_Error] = useState('');
	const [addressError, set_AddressError] = useState('');
	const [address, set_Address] = useState('');   
	const [addresses, set_Addresses] = useState([]);   
	const [address_Display, set_Address_Display] = useState(null);

	const dlg_Close = () => {
		set_Address('');   
		set_Addresses([]);   
		set_Address_Display(null);
		set_Type ('');
		set_Desc('');
		set_Descs([]);   
		set_DescId(0);  
		set_MinMax(null);
		set_Per(null);
		set_Amount("");
		set_PortFolio(null);
		set_Recipients([]); //"@You"
		set_AddressError('');
		set_AmountError('');
		set_ClusterNameError('');
		set_RecipientsError('');	
		set_MinMaxError('');
		set_PerError('');
		set_Error('');
		dlgClose();
	}

	const isEmptyAlert = (alert) => {
		let ok = true;
	   const {clusterName, description, recipients} = alert;	   
	   const isAddressesEmpty = addresses.length === 0;
	   if(isAddressesEmpty) {
		   set_AddressError("Wallet Addresses is empty!"); 
		   ok = false;
	   }
	   if(isEmpty(clusterName))
	   {
		   set_ClusterNameError("cluster name is empty!")
		   ok = false;
	   }
	   if(recipients.length === 0)
	   {
		   set_RecipientsError("Recipients is empty!")
		   ok = false;
	   }
	   if(description)
	   {
		   if(  description.id === LIMIT_AMOUNT_PER ||  description.id === EXCLUSION_LIST )
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

	const getAlertById = async() => {
		if(id === undefined || id === '') return;
		const url = NODE_URL + `/api/alert/${id}`;  
		try { 
			const res = await axios.get(url);
			const { type, description, clusterName, recipients } = res.data; 		 
			setType(type);
			set_PortFolio(clusterName);
			let recipients_ = [];			 
			const email = GET_USER_EMAIL(); 
			for(var i in recipients)
			{
				let recipient = recipients[i];
				if(recipient === email)
					recipient = "@You";
				recipients_.push(recipient);
			}
			set_Recipients(recipients_);
			const desc_Id = description.id;
			set_Desc( GET_DESC_TITLE_BY_ID(desc_Id) ); 			
			if( description.id === LIMIT_AMOUNT_PER ||  description.id === EXCLUSION_LIST )
			{
				set_MinMax(description.minMax);
				set_Amount(description.amount);
				set_Per(description.per);
			}
			else if(description.id === WHITELIST_APPROVE)
			{
				set_Addresses(description.addresses)				 
				const addresses_display = get_addresses_display(description.addresses);
				set_Address_Display(addresses_display); 
			}
			else { 
				set_MinMax(null);
				set_Amount('');
				set_Per(null);
			} 
			set_DescId( desc_Id );
		}
		catch(err) {
			console.log(err)  
			set_Error(err.response.data.msg);
		} 
	} 
		  
	useEffect(() => {		
			getAlertById();	
		},[id]); 
		
	useEffect(()=>{
		getEmails();  
	}, []);

	const edit_Alert = async () => { 
		let recipients_ = [];
		for(var i in recipients)
		{
			let recipient = recipients[i];
			if(recipient === '@You') recipient = GET_USER_EMAIL(); 
			recipients_.push(recipient);
		}
		let description = {};		
		if(descId === LIMIT_AMOUNT_PER || descId === EXCLUSION_LIST)
		{    
			description = {
				id: descId,
				minMax: minMax,
				amount: amount,
				per: per
			};	
		}
		else if(descId === WHITELIST_APPROVE)
			description = {
				id: descId, 
				addresses: addresses
			};	

		else 
			description = { id: descId }; 
	 
		const alert = {
			type: type,
			description: description,
			clusterName: portFolio,
			recipients: recipients_,
			id: id
		}   
		const ok = isEmptyAlert(alert);
		console.log(ok)
		if(!ok) return;
		const url = NODE_URL + `/api/alert/edit/`;
		try { 
			await axios.post(url, alert); 	
			dlg_Close();   
		}
		catch(err) {
			console.log(err) 
		} 	
	}
	
	const delete_Alert = async () => {		
		if( !confirm(`Really Delete ${id}'s Policy?`) ) return;		 
		const url = NODE_URL + `/api/alert/${id}`;
		try{ 
			await axios.delete(url, id);		  
		}
		catch(err) { } 
		dlg_Close();
	}

	const getEmails = async() => { 
		const url = NODE_URL + "/api/email/"; 
		try {  
			const res = await axios.get(url); 
			set_Emails(res.data);
		}
		catch(err) {
			console.log(err) 
		} 
	}

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
	}

	const setType = (type_) => {  
		set_Type(type_); 
		var descs_ = GET_DESCS_BY_TYPE_ID(type_);
		set_Descs(descs_);
		setDesc(descs_[0].title);
	}
   
	const setAmount = (val) => {
		if(val.length > 30)
			set_AmountError('Amount must be less than 30 charactors')
		else 
		{
			set_AmountError('')
			set_Amount(val);
		} 
	}
	 
	const setMinMax = (val) => {
		if(val !== null) 
		{
			set_MinMaxError("");
			set_MinMax(val);
		}
		else  
			set_MinMaxError("Select min or max")
	}

		const ComboDescMinMax = ( 
				<ComboBox
					label="min or max" 
					options={minMaxs.map((option) => option.title)}
					value={minMax}
					onChange={setMinMax}
					error={minMaxError}
				/>  
		);

		const setPer = (val) => {
			if(val !== null)
			{
				set_Per(val);
				set_PerError('');
			}
			else set_PerError("Select case of per")
		}

		const ComboDescPer = ( 
				<ComboBox
					label="per"
					options={pers.map((option) => option.title)}
					value={per}
					onChange={setPer}
					error={perError}
				/>  
		);

		const InputAmount = (  
			<TextBox
				label="Amount"  
				value={amount}
				onChange={ setAmount } 
				error={amountError}
			/> 
		);

		const add_Address = () => {
			const ok = isAddress(address);
			if(!ok) 
			{
				set_Address('');
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
				set_AddressError('Wallet Address must be less than 42 charactors.');  
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
				<TextBox 
					label=""  
					onChange={ setAddress }	
					className='px-2'
					value={address} 
				/>	
				<IconButton aria-label="add" size="medium" onClick={() => { add_Address() }}>
					<AddIcon />
				</IconButton>	 
				<ErrorDiv error={addressError}/> 
				
			</div>
		);

		const ComboDesc = (
		<>
			{descId === 0 && null }
			{descId === LIMIT_AMOUNT_PER && (
				<>
					<ComboBox
						options={descs.map((option) => option.title)} 
						value={desc}
						onChange={setDesc}
						style={{width: '80%', marginLeft: '10%'}}
					/>
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
				</>
			) }
			{descId === LIMIT_TOTAL_ASSETS && (
				<>
					<ComboBox
						options={descs.map((option) => option.title)} 
						value={desc}
						onChange={setDesc}
						style={{width: '80%', marginLeft: '10%'}}
					/>
				</>
			) }
			{descId === WHITELIST_APPROVE && (
				<>
					<p className='px-5 pr-5'>{desc}</p> 
					<div className="p-3">
						 
						<div className="px-1 pr-1">
							
							<div className="mt-4">
								<GroupDiv title='Add Wallet Address' comp={AddWalletAddress} /> 
							</div>   
						</div>
						 
					</div>
				</>
			) }
			{descId === EXCLUSION_LIST && (
				<>
					<p className='px-5 pr-5'>{desc}</p> 
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
				</>
			) }

		</>
	);


	const ComboType = ( 
		<>
			<ComboBox
				options={TYPES.map((option) => option.title)}
				value={type} 
				onChange={setType}
				style={{width: '80%', marginLeft: '10%'}}
			/> 
		</>  
	); 

	const ComboType_Desc = (
		<>
			<div className='mt-2'>
				<GroupDiv title='Notification Type' comp={ComboType} />
			</div>
			{
				descId !== 0 && (<div className='mt-4'>
					<GroupDiv title='Select Notification Description' comp={ComboDesc} />
				</div>)
			}
		</>
	)

 
	const setClusterName = (val) => {
		if(val !== null) 
		{
			set_PortFolio(val);
			set_ClusterNameError("");
		}
		else set_ClusterNameError("cluster name is empty!")
	}

	const ComboCluster = ( 
		<ComboBox 
			options={portfolios.map((option) => option.title)}
			style={{width: '80%', marginLeft: '10%'}}
			value={portFolio}			 
			onChange={setClusterName}
			error={clusterNameError}
		/>  
	);
    
	const setRecipients = (val) => {
		if(val.length > 0)
		{
			set_Recipients(val);
			set_RecipientsError("");
		}
	}

	const HookRecipients = ( 
		<ComboList  
			options={availableRecipients}
			getOptionLabel={(option) => option} 
			value={recipients} 
			onChange={setRecipients}
			style={{width: '80%', marginLeft: '10%'}}
			error={recipientsError}
		/>  
	); 
	 
	return (
		<> 
			<Dialog  
				open={open}
				onClose={dlg_Close}
				scroll={'paper'}  
			>
			<DialogTitle className="alert_title"> 
				<Grid container spacing={2}>
					<Grid item xs={5}>
						<span>Set Policies for</span>
					</Grid>
					<Grid item xs={5} style={{marginLeft: '-3%'}}>
						{ComboCluster} 
					</Grid>
					<Grid item xs={2}>
						<span>Cluster</span>
					</Grid>
				</Grid>
				<ErrorDiv error={error}/>
			</DialogTitle>

				<DialogContent dividers={true}> 
					<div className="text-center  px-5 pr-5">    
						<div className="px-3 pr-3 ">
							{ComboType_Desc}
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
							<Button variant="contained" className="create_alert_btn" onClick={ dlg_Close }>
								<b className="text-white">Cancel</b>
							</Button>
						</Grid>

						<Grid item>
							<Button variant="contained" className="create_alert_btn" onClick={() => delete_Alert()}>
								<b className="text-white">Delete</b>
							</Button> 
						</Grid>

						<Grid item xs={2}>
							<Button variant="contained" className="create_alert_btn" onClick={() => edit_Alert()}>
								<b className="text-white">Save</b>
							</Button> 
						</Grid>
						<Grid item xs={2}></Grid>
					</Grid>
				</div>   
			</Dialog> 
		</>
	);
}

export default EditAlert;

 
