import React from 'react';     
import imgWelcome from '../../assets/img/welcome.png';
import './layout.css';
import { Dialog, Button } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles'; 
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center', 
	}, 
	  paper2: {
		backgroundColor: theme.palette.background.paper,	 
		borderRadius: '10px',
		boxShadow: theme.shadows[5],	   
		width: '50%',
	  }, 
  }));

function Welcome() {  
	const classes = useStyles();
	const [welcomeOpen, setWelcomeOpen] = React.useState(true);

	const wcClose = () => {
		setWelcomeOpen(false);
	};

	const cancelBtn = (
		<Button variant="contained" className="header-createalert-btn" onClick={ wcClose}>
			<b className="text-white">Continue</b>
		</Button>
	);  
  
	if(welcomeOpen)
	return (
		<Dialog 
			className={classes.modal}
			open={welcomeOpen}
			onClose={wcClose}
		>  
			<div className='text-center p-5'>
				<h1>Welcome to KAGAMI</h1>
				<div className="pt-3" ><img src={imgWelcome} /></div>
				<div className="p-5">Let's add wallets to create clusters and alerts</div> 
				{cancelBtn} 
			</div> 
	  </Dialog>  
	);
	else return <Layout/>
}

export default Welcome;

 
