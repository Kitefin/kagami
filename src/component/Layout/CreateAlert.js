import React, {useState} from 'react';   
import { Button, Checkbox, TextField } from '@material-ui/core'; 
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CheckBoxOutlineBlank, CheckBox} from '@material-ui/icons';
import './layout.css';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />; 
 
function CreateAlert({alertClose}) { 
	const types = [
		{ title: 'Limits', id: 1 },
		{ title: 'Allow-lists', id: 2 },
		{ title: 'Exclusion-lists', id: 3 },     
	];

	const descs = [
		{ title: 'Maximum of 500 ETH per transaction', id: 1 },
		{ title: 'Maximum of 5000 ETH per day', id: 2 },
		{ title: 'Alerts if value of total assets in wallets exceeds a threshold', id: 3 }, 
		{ title: 'Approved counterparts and smart contracts', id: 4 }, 
		{ title: 'Minimum of 20 ETH per month (team wages)', id: 5 },  
	];	 

	const [type, set_Type] = useState(types[0]);
	const [desc, set_Desc] = useState(descs[0]);
 
	console.log(descs);

	const create_Alert = () => {
		 console.log(type)
	}

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

    const ComboType = (
		<Autocomplete
			id="combo-box-demo"
			options={types}
			getOptionLabel={(option) => option.title}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Alert Type" variant="outlined" />}
			onChange={(event, value) => set_Type(value)} 
		/>
   	);
	
	// function set_Descs (type) {
	// 	var typeId = type.id;
	// 	switch(typeId)
	// 	{
	// 		case 1: return 
	// 			[
	// 				{title: 'Maximum of 500 ETH per transaction', id: 1},
	// 				{title: 'Alerts if value of total assets in wallets exceeds a threshold', id: 2}
	// 			];
	// 		case 2: return [{title: 'Approved counterparts and smart contracts', id: 1}];
	// 		case 3: return [{title: 'Minimum of 20 ETH per month (team wages)', id: 1}];
	// 	}
	// }
	
	// var descs = getDescriptionByType(type);
	
	const ComboDesc = (
		<Autocomplete
			id="combo-box-demo"
			options={descs}
			getOptionLabel={(option) => option.title}
			style={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Alert Description" variant="outlined" />}
			onChange={(event, value) => set_Desc(value)} 
		/>
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
				getOptionLabel={(option) => option.title}
				style={{ width: 300 }}
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
			<TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
		  )}
		/>
	);
  
	return (
		<div className="text-center">   
			<h2 className="alert_title">Set email alert for [pipe: cluster_name] Cluster</h2>
			<div className="pt-2" >{ComboType}</div>
			<div className="mt-3">{ComboDesc}</div>
			<div className="mt-3">{ComboPort}</div>
			<div className="mt-3">{HookRecipients}</div>
			<div className="mt-3">
				<div>
					{cancelBtn}&nbsp;
					{createAlertBtn}
				</div>
			</div>
		</div> 
	);
}

export default CreateAlert;

 
