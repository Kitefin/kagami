import { makeStyles } from '@mui/styles';
import React, {useEffect, useState} from 'react';   
import { Button, Grid, Chip, TextField, Dialog, DialogContent, DialogTitle, Autocomplete } from '@mui/material';
import GroupDiv from "../../common/GroupDiv";
import ComingSoon from "../../common/ComingSoon";
 
const useStyles = makeStyles(() => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center', 
	}
  }));

function CreateAlert({open, dlgClose, clusters}) {  

	let portfolios = [];
	
	if(clusters && Object(clusters).length > 0) {
		for(var i in clusters)
		{
			const cluster = clusters[i];
			const portfolio = {
				title: cluster.name,
				id: cluster._id
			}
			portfolios.push(portfolio);
		}  
	}
	  
	const classes = useStyles();

	const create_Alert = () => { 
		dlgClose();
		handleClickOpen2();
   } 

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
		freeSolo
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
			freeSolo
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
			freeSolo
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
				freeSolo
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
							justifyContent="space-between"
							container
							spacing={0} //48
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
				options={portfolios} 
				getOptionLabel={(option) => option.title} 
				renderInput={(params) => <TextField {...params} label="" variant="standard" />}
				style={{width: '80%', marginLeft: '10%'}}
			/>
	);
    
	const HookRecipients = (
		<Autocomplete
		  multiple
		  id="tags-filled"
		  options={availableRecipients.map((option) => option.title)}
		  defaultValue={[availableRecipients[0].title]}
		  freeSolo 
		//   disableCloseOnSelect
		//   getOptionLabel={(option) => option.title}
		//   renderOption={(option, { selected }) => (
		// 	<React.Fragment>
		// 	  <Checkbox
		// 		icon={icon}
		// 		checkedIcon={checkedIcon}
		// 		style={{ marginRight: 8 }}
		// 		checked={selected}
		// 	  />
		// 	  {option.title}
		// 	</React.Fragment>
		//   )} 
		renderTags={(value, getTagProps) =>
			value.map((option, index) => (
			  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
			))
		  }
		  renderInput={(params) => (
			<TextField {...params} variant="filled" label="" placeholder="" />
		  )}
		  style={{width: '80%', marginLeft: '10%'}}
		/>
	); 

	const [open2, setOpen2] = useState(false); 
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
				<Button variant="contained" className="header-createalert-btn" onClick={ dlgClose }>
					<b className="text-white">Cancel</b>
				</Button>
				</Grid>
				<Grid item xs={2}>
				<Button variant="contained" className="header-createalert-btn" onClick={() => create_Alert()}>
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

 
