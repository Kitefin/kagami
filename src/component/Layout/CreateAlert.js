import React, {useState} from 'react';   
import { Button, Checkbox, TextField, Grid, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core'; 
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CheckBoxOutlineBlank, CheckBox} from '@material-ui/icons';
import './layout.css';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />; 
 
function CreateAlert({alertClose}) { 
	
	const createAlertBtn = (
		<Button variant="contained" className="header-createalert-btn" onClick={() => create_Alert()}>
			<b className="text-white">Create</b>
		</Button>
	);  

	const cancelBtn = (
		<Button variant="contained" className="header-createalert-btn" onClick={ alertClose}>
			<b className="text-white">Cancel</b>
		</Button>
	); 

	const types = [
		{ title: 'Limits', id: 1 },
		{ title: 'Allow-lists', id: 2 },
		{ title: 'Exclusion-lists', id: 3 },     
	];

	const minMaxs = [
		{ title: 'Minimum', id: 1 },
		{ title: 'Maximum', id: 2 },
	];

	const pers = [
		{ title: 'Transaction', id: 1 },
		{ title: 'Day', id: 2 },
		{ title: 'Week', id: 3 },
		{ title: 'Month', id: 4 },
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
		if(desc.id === 1)
			set_DescDetail(true);
	}

	const setType = (type) => {
		set_Type(type);
		if(type.id === 1)
		{
			var descs_ = [
				{ title: '<Min/Max> of <Amount> ETH per <transaction/time>', id: 1 },
				// { title: 'Maximum of 5000 ETH per day', id: 2 },
				{ title: 'Alerts if value of total assets in wallets exceeds a threshold', id: 2 }
			];
			set_Descs(descs_);
		}
		else if(type.id === 2)
		{
			var descs_ = [
				{ title: 'Approved counterparts and smart contracts', id: 4 }, 
			];
			set_Descs(descs_);
		}
		
		else if(type.id === 3)
		{
			var descs_ = [
				{ title: 'Minimum of 20 ETH per month (team wages)', id: 5 },  
			];
			set_Descs(descs_);
		} 
	}

	const create_Alert = () => {
		 //console.log(type)
	} 

    const ComboType = (
		<Autocomplete
			id="combo-box-demo"
			options={types}
			// defaultValue={types[0]}
			getOptionLabel={(option) => option.title} 
			renderInput={(params) => <TextField {...params} label="Alert Type" variant="outlined" />}
			onChange={(event, value) => setType(value)} 
		/>
   	); 
	 
	   const ComboDescMinMax = (
		<Autocomplete
			id="combo-box-demo"
			options={minMaxs}			 
			getOptionLabel={(option) => option.title} 
			// style={{width: '20%'}}
			renderInput={(params) => <TextField {...params} label="Min or Max" variant="outlined" />}
			onChange={(event, value) => set_MinMax(value)} 
		/>
	);

	const ComboDescPer = (
		<Autocomplete
			id="combo-box-demo"
			options={pers}			 
			getOptionLabel={(option) => option.title}  
			renderInput={(params) => <TextField {...params} label="Per" variant="outlined" />}
			onChange={(event, value) => set_Per(value)} 
		/>
	);

	const InputAmount = ( 
		<TextField 
			id="outlined-basic" 
			label="Amount" 
			variant="outlined" value={amount} 
			onChange={(event, value) => set_Amount(value)} />
	);

	const ComboDesc = (
		<>
			<Autocomplete
				id="disabled-options-demo"
				options={descs} 
				getOptionLabel={(option) => option.title} 
				renderInput={(params) => <TextField {...params} label="Alert Description" variant="outlined" />}
				onChange={(event, value) => setDesc(value)} 
				// defaultValue={descs[0]}
			/>
			{descDetail ? (
				<div className="p-3">
					<h2>Detail Setting</h2>
					<div className="px-5 pr-5">
					<Grid
						justify="space-between"
						container
						spacing={24}
					>
						<Grid item xs={2}> {ComboDescMinMax} </Grid>
						<Grid item className="mt-3"> of </Grid>
						<Grid item xs={2}> {InputAmount} </Grid>
						<Grid item className="mt-3"> ETH per </Grid>
						<Grid item xs={3}> {ComboDescPer} </Grid>
					</Grid> 
					</div>
				</div>
			)
			: null}
		</>
	);

	const portfolios = [
		{ title: 'All Project Wallets', id: 1 },
		{ title: 'Executive Controlled', id: 2 },
		{ title: 'Junior Traders', id: 3 },     
		{ title: 'Portfolio Managers', id: 4 },     
		{ title: 'Accounts Team', id: 5 },     
	];
	   
	const ComboPort = (
			<Autocomplete
				id="combo-box-demo"
				options={portfolios}
				// defaultValue={portfolios[0]}
				getOptionLabel={(option) => option.title}
				// style={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="Alert Portfoloio Name" variant="outlined" />}
			/>
	);
   
	const availableRecipients = [
		{ title: 'You', id: 1 },
		{ title: '@rogerTHAT', id: 2 },
		{ title: '@hana', id: 3 },
		{ title: '@raggedJ', id: 4 },
		{ title: '@grosveynor', id: 5 },
		{ title: "@seasonH", id: 6 }
	];

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
			<TextField {...params} variant="outlined" label="Recipients" placeholder="Favorites" />
		  )}
		/>
	);
  
	return (
		<div className="text-center">   
			<h4 className="alert_title">Set email alert for [pipe: cluster_name] Cluster</h4>
			<div className="p-5">
				<div className="pt-3" >{ComboType}</div>
				<div className="mt-3">{ComboDesc}</div>
				<div className="mt-3">{ComboPort}</div>
				<div className="mt-3">{HookRecipients}</div>
				<div className="mt-3 pb-3">
					<div>
						{cancelBtn}&nbsp;&nbsp;&nbsp;&nbsp;
						{createAlertBtn}
					</div>
				</div>
			</div>
		</div> 
	);
}

export default CreateAlert;

 
