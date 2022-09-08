import React from 'react';     
import imgWelcome from '../../assets/img/welcome.png';
import './layout.css';  
import { Button, Table, Grid, Modal, Backdrop, Fade } from '@material-ui/core';
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
		<Modal 
			className={classes.modal}
			open={welcomeOpen}
			onClose={wcClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
			timeout: 500,
		}}
	>
		<Fade in={welcomeOpen}>
			  <div className={classes.paper2}> 
			  <div className="text-center">   
			<h1 className="p-4">Welcome to KAGAMI</h1>
			<div className="p-2">
				<div className="pt-3" ><img src={imgWelcome} /></div>
				<div className="p-5">Let's add wallets to create clusters and alerts</div> 
				<div className="mt-3 pb-5">
					<div>
						{cancelBtn} 
					</div>
				</div>
			</div>
		</div> 
			  </div>
		</Fade>
	  </Modal>  
	);
	else return <Layout/>
}

export default Welcome;

 
