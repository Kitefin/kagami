

import { makeStyles } from '@material-ui/core/styles'; 
import React, {useState} from 'react';   
import {Button, Grid, Checkbox, TextField, Dialog, DialogContent, DialogTitle } from '@material-ui/core'; 
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CheckBoxOutlineBlank, CheckBox, Group} from '@material-ui/icons';  
import GroupDiv from "../common/GroupDiv";
import './layout.css'; 

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />; 
 
const useStyles = makeStyles((theme) => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center', 
	},
	paper: {
		backgroundColor: theme.palette.background.paper,	 
		borderRadius: '10px',
		boxShadow: theme.shadows[5],	   
		width: '100%'
	  },

	 
  }));

function CreateAlert({open, dlgClose}) { 
	 const classes = useStyles();
	 
	const create_Alert = () => {
		//console.log(type)
   } 

	const TYPE_LIMITS = 1;
	const TYPE_ALLOW_LISTS = 2;
	const TYPE_EXCLUSION_LISTS = 3;  

	const types = [
		{ title: 'Limits', id: TYPE_LIMITS },
		{ title: 'Allow-lists', id: TYPE_ALLOW_LISTS },
		{ title: 'Exclusion-lists', id: TYPE_EXCLUSION_LISTS }
	];

	const CLUSTER_ALL_PROJECT_WALLETS = 1;
	const CLUSTER_EXECUTIVE_CONTROLLED = 2;
	const CLUSTER_JUNIOR_TRADERS = 3;
	const CLUSTER_PROTFOLIO_MANAGERS = 4;
	const CLUSTER_ACCOUTS_TEAMS = 5;

	const portfolios = [
		{ title: 'All Project Wallets', id: CLUSTER_ALL_PROJECT_WALLETS },
		{ title: 'Executive Controlled', id: CLUSTER_EXECUTIVE_CONTROLLED },
		{ title: 'Junior Traders', id: CLUSTER_JUNIOR_TRADERS },     
		{ title: 'Portfolio Managers', id: CLUSTER_PROTFOLIO_MANAGERS },     
		{ title: 'Accounts Team', id: CLUSTER_ACCOUTS_TEAMS },     
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

	const availableRecipients = [
		{ title: 'You', id: 1 },
		{ title: '@rogerTHAT', id: 2 },
		{ title: '@hana', id: 3 },
		{ title: '@raggedJ', id: 4 },
		{ title: '@grosveynor', id: 5 },
		{ title: "@seasonH", id: 6 }
	];

	const [type, set_Type] = useState(null);
	const [desc, set_Desc] = useState(null);
	const [descs, set_Descs] = useState(null);   
	const [minMax, set_MinMax] = useState(null);
	const [amount, set_Amount] = useState(null);
	const [per, set_Per] = useState(null);
	const [descDetail, set_DescDetail] = useState(false);
 
	const setDesc = (desc) => {
		console.log(desc);
		set_Desc(desc);
		if(desc.id === TYPE_DESC_MINMAX_AMOUNT_PER || desc.id === TPYE_DESC_4)
			set_DescDetail(true);
		else set_DescDetail(false);
	}

	const TYPE_DESC_MINMAX_AMOUNT_PER = 1;
	const TPYE_DESC_2 = 2;
	const TPYE_DESC_3 = 3;
	const TPYE_DESC_4 = 4;

	const setType = (type) => {
		set_Type(type);
		if(type.id === TYPE_LIMITS)
		{
			var descs_ = [
				{ title: '<Min/Max> of <Amount> ETH per <transaction/time>', id: TYPE_DESC_MINMAX_AMOUNT_PER }, 
				{ title: 'Notifications if value of total assets in wallets exceeds a threshold', id: TPYE_DESC_2 }
			];
			set_Descs(descs_);
		}
		else if(type.id === TYPE_ALLOW_LISTS)
		{
			var descs_ = [
				{ title: 'Approved counterparts and smart contracts', id: TPYE_DESC_3 }, 
			];
			set_Descs(descs_);
		}		
		else if(type.id === TYPE_EXCLUSION_LISTS)
		{
			var descs_ = [
				{ title: 'Minimum of 20 ETH per month (team wages)', id: TPYE_DESC_4 },  
			];
			set_Descs(descs_);
		} 
	}
 

    const ComboType = (  
		<Autocomplete
        options = {types}
    	getOptionLabel = {(option) => option.title}
        id="controlled-demo"
        value={type}
        onChange={(event, newValue) => { setType(newValue); }}
        renderInput={(params) => (
          <TextField {...params} label="" variant="standard" />
        )}
		style={{width: '80%', marginLeft: '10%'}}
      />

   	); 
	 
	const ComboDescMinMax = (
		<Autocomplete
			id="combo-box-demo"
			options={minMaxs}			 
			getOptionLabel={(option) => option.title} 
			// style={{width: '20%'}}
			renderInput={(params) => <TextField {...params} label="Min or Max" variant="standard" />}
			onChange={(event, value) => set_MinMax(value)} 
		/>
	);

	const ComboDescPer = (
		<Autocomplete
			id="combo-box-demo"
			options={pers}			 
			getOptionLabel={(option) => option.title}  
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
				id="disabled-options-demo"
				options={descs} 
				getOptionLabel={(option) => option.title} 
				renderInput={(params) => <TextField {...params} label="" variant="standard" />}
				onChange={(event, value) => setDesc(value)} 
				// defaultValue={descs[0]}
				style={{width: '80%', marginLeft: '10%'}}
			/>
			{descDetail ? (
				<div className="p-3">
					<GroupDiv title="Detail Setting" comp={
						<div className="px-1 pr-1">
						<Grid
							justify="space-between"
							container
							spacing={48}
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
				id="combo-box-demo"
				options={portfolios}
				// defaultValue={portfolios[0]}
				getOptionLabel={(option) => option.title}
				// style={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="" variant="standard" />}
				style={{width: '80%', marginLeft: '10%'}}
			/>
	);
    
	const HookRecipients = (
		<Autocomplete
		  multiple
		  id="checkboxes-tags-demo"
		  options={availableRecipients} 
		  disableCloseOnSelect
		  getOptionLabel={(option) => option.title}
		  renderOption={(option, { selected }) => (
			<React.Fragment>
			  <Checkbox
				icon={icon}
				checkedIcon={checkedIcon}
				style={{ marginRight: 8 }}
				checked={selected}
			  />
			  {option.title}
			</React.Fragment>
		  )} 
		  renderInput={(params) => (
			<TextField {...params} variant="standard" label="" placeholder="" />
		  )}
		  style={{width: '80%', marginLeft: '10%'}}
		/>
	); 

	return (
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
				<Button variant="contained" className="header-createalert-btn" onClick={ dlgClose }>
					<b className="text-white">Cancel</b>
				</Button> &nbsp;&nbsp;&nbsp;&nbsp;
				<Button variant="contained" className="header-createalert-btn" onClick={() => create_Alert()}>
					<b className="text-white">Create</b>
				</Button> 
			</div>   
		</Dialog> 
	);
}

export default CreateAlert;

 
