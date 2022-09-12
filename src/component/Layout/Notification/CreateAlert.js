import { makeStyles } from '@mui/styles';
import React, {useEffect, useState} from 'react';   
import { Button, Grid, Chip, TextField, Dialog, DialogContent, DialogTitle, Autocomplete } from '@mui/material';
import GroupDiv from "../../common/GroupDiv";
import ComingSoon from "../../common/ComingSoon";
import axios from 'axios'; 
const NODE_URL = "http://localhost:5000"; 

	const useStyles = makeStyles(() => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center', 
	}
  	})); 

  	const TYPE_LIMITS = 1;
	const TYPE_ALLOW_LISTS = 2;
	const TYPE_EXCLUSION_LISTS = 3;  

	const types = [
		{ title: 'Limits', id: TYPE_LIMITS },
		{ title: 'Allow-lists', id: TYPE_ALLOW_LISTS },
		{ title: 'Exclusion-lists', id: TYPE_EXCLUSION_LISTS }
	]; 

	const DESC_MIN = 1;
	const DESC_MAX = 2;
	
	const minMaxs = [
		{ title: 'Minimum', id: DESC_MIN },
		{ title: 'Maximum', id: DESC_MAX },
	];

	const DESC_PER_TRANSACTION = 1;
	const DESC_PER_DAY = 2;
	const DESC_PER_WEEK = 3;
	const DESC_PER_MONTH = 4;

	const pers = [
		{ title: 'Transaction', id: DESC_PER_TRANSACTION },
		{ title: 'Day', id: DESC_PER_DAY },
		{ title: 'Week', id: DESC_PER_WEEK },
		{ title: 'Month', id: DESC_PER_MONTH },
	];  

function CreateAlert({open, dlgClose, clusters}) {    
	const classes = useStyles();
	const [type, set_Type] = useState(types[0].title);
	const [desc, set_Desc] = useState('');
	const [descs, set_Descs] = useState([]);   
	const [emails, set_Emails] = useState([]);   
	const [minMax, set_MinMax] = useState(null);
	const [per, set_Per] = useState(null);
	const [amount, set_Amount] = useState(null);
	const [portFolio, set_PortFolio] = useState(null);
	const [recipients, set_Recipients] = useState(["@You"]);
	 
	const [descDetail, set_DescDetail] = useState(false); 
	const [open2, setOpen2] = useState(false); 

	const create_Alert = () => { 
		console.log(type)
		console.log(desc)
		console.log(portFolio)
		console.log(recipients)
		// console.log(descDetail)
		if(descDetail)
		{
			console.log(per)
			console.log(amount)
			console.log(minMax)
		}
		 
		// dlgClose();
		// handleClickOpen2();
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


 
	let availableRecipients = [{title: "@You", id: 1}];
	
	if(emails)
	{
		const {userInfo} = localStorage;
		const userAddress = JSON.parse(userInfo).address;   
		for(var i in emails)
		{
			const email = emails[i];
			if(email.address !== userAddress){
				const recipient = {
					title: email.email,
					id: email._id
				}
				availableRecipients.push(recipient);
			}
			else availableRecipients[0].id = email._id;
		}
	} 
	
	const setDesc = (desc_) => {  
		set_Desc(desc_);  
		let id = -1;
		for(var i in descs)
		{
			if(descs[i].title === desc_)
			{
				id = descs[i].id;
				break;
			}
		}
		// console.log(desc_)
		// console.log(id)

		if(id === TYPE_DESC_MINMAX_AMOUNT_PER || id === TPYE_DESC_4)
			set_DescDetail(true);
		else set_DescDetail(false);
	}

	const TYPE_DESC_MINMAX_AMOUNT_PER = 1;
	const TPYE_DESC_2 = 2;
	const TPYE_DESC_3 = 3;
	const TPYE_DESC_4 = 4;

	const setType = (type_) => { 
		set_Type(type_);
		let id = 0;
		for(var i in types)
		{
			if(types[i].title === type_)
			{
				id = types[i].id;
				break;
			}
		} 
		if(id === TYPE_LIMITS)
		{
			var descs_ = [
				{ title: '<Min/Max> of <Amount> ETH per <transaction/time>', id: TYPE_DESC_MINMAX_AMOUNT_PER }, 
				{ title: 'Notifications if value of total assets in wallets exceeds a threshold', id: TPYE_DESC_2 }
			];
			set_Descs(descs_);
			setDesc(descs_[0].title);
		}
		else if(id === TYPE_ALLOW_LISTS)
		{
			var descs_ = [
				{ title: 'Approved counterparts and smart contracts', id: TPYE_DESC_3 }, 
			];
			set_Descs(descs_);
			setDesc(descs_[0].title);
		}		
		else if(id === TYPE_EXCLUSION_LISTS)
		{
			var descs_ = [
				{ title: 'Minimum of 20 ETH per month (team wages)', id: TPYE_DESC_4 },  
			];
			set_Descs(descs_);
			setDesc(descs_[0].title);
		} 
	}
   
    const ComboType = (  
		<Autocomplete
		freeSolo 
		options={types.map((option) => option.title)}
        id="controlled-demo"
		defaultValue={types[0].title} 
        onChange={(event, newValue) => { setType(newValue); }}
        renderInput={(params) => (
          <TextField {...params} label="" variant="standard" />
        )}
		style={{width: '80%', marginLeft: '10%'}}
      /> 
   	); 
	 
	const ComboDescMinMax = (
		<Autocomplete
			freeSolo
			id="combo-box-demo" 	
			options={minMaxs.map((option) => option.title)}	  
			renderInput={(params) => <TextField {...params} label="Min or Max" variant="standard" />}
			onChange={(event, value) => set_MinMax(value)} 
		/>
	);

	const ComboDescPer = (
		<Autocomplete
			freeSolo
			id="combo-box-demo" 
			options={pers.map((option) => option.title)}
			renderInput={(params) => <TextField {...params} label="Per" variant="standard" />}
			onChange={(event, value) => set_Per(value)} 
		/>
	);

	const InputAmount = ( 
		<TextField 
			id="outlined-basic" 
			label="Amount" 
			variant="standard" value={amount} 
			onChange={(event, value) => set_Amount(value)} />
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
		<Autocomplete
			freeSolo
			id="combo-box-demo" 
			options={portfolios.map((option) => option.title)}
			renderInput={(params) => <TextField {...params} label="" variant="standard" />}
			style={{width: '80%', marginLeft: '10%'}}
			 
			onChange={(event, value) => set_PortFolio(value)}
		/>
	);
    
	const HookRecipients = (
		<Autocomplete
		  	multiple
		  	id="tags-filled"
		  	options={availableRecipients.map((option) => option.title)}
		   	defaultValue={[availableRecipients[0].title]}
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
			onChange={(e, val) => set_Recipients(val)}
		/>
	); 

	const handleClickOpen2 = () => {
		setOpen2(true); 
	};
	
	const dlgClose2 = () => {
		setOpen2(false);
	};

	return (
		<>
			<ComingSoon open={open2} dlgClose={dlgClose2} title="Coming Soon!" content="it wiil be added code after database completed " btnText="OK" />
			<Dialog 
				className={classes.modal}
				open={open}
				onClose={dlgClose}
				scroll={'paper'}  
			>
		<DialogTitle className="alert_title">Set email Notification for [pipe: cluster_name] Cluster</DialogTitle>
		<DialogContent dividers={true}> 
			<div className="text-center">    
				<div className="px-3 pr-3">
					<GroupDiv title='Select Notification Type' comp={ComboType} />
					<div className='mt-4'>
						<GroupDiv title='Select Notification Description' comp={ComboDesc} />
					</div>  
					<div className="mt-4">
						<GroupDiv title='Select Notification Portfolio Name' comp={ComboPort} /> 
					</div>
					<div className="mt-4">
						<GroupDiv title='Select Notification Recipients' comp={HookRecipients} /> 
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

 
