import React from 'react';
import {Button, Dialog, DialogContent, DialogTitle, Slide } from '@mui/material'; 
import { makeStyles } from '@mui/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
  });
  
const useStyles = makeStyles((theme) => ({
	modal: { 
		position: 'fixed',
		top: '0',
	  	display: 'inline-block', 
	  	justifyContent: 'right', 
		verticalAlign: 'top'
	} 
  }));

function ComingSoon({open, dlgClose, title, content, btnText}) { 
	const classes = useStyles();  

	return ( 
		<Dialog  
		className={classes.modal}
		open={open}
		onClose={dlgClose}
		TransitionComponent={Transition}
		keepMounted	
		scroll={'paper'}    
		> 
			<DialogTitle className="_alert_title">{title}</DialogTitle>
			<DialogContent dividers={false}> 
				<div className="text-center px-1 pr-1">    
					<div className="p-3">  
						{content} 
					</div>
				</div>
			</DialogContent> 
			<div className="text-right p-2"> 
				<Button variant="contained" className="create_alert_btn" onClick={ dlgClose }>
					<b className="text-white">{btnText}</b>
				</Button>  
			</div> 
		</Dialog>		 
	);
}

export default ComingSoon;