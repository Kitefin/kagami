import React from 'react';   
import {Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';  
import './layout.css';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
  });
  
const useStyles = makeStyles((theme) => ({
	modal: { 
		position: 'fixed',
		top: '0',
	  	display: 'flex',
	  	// alignItems: 'top',
	  	justifyContent: 'right', 
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
			// scroll={'paper'}    
		> 
		<DialogTitle className="_alert_title">{title}</DialogTitle>
		<DialogContent dividers={true}> 
			<div className="text-center px-1 pr-1">    
				<div className="p-3">  
					{content} 
				</div>
			</div>
		</DialogContent> 
			<div className="text-right p-2"> 
						<Button variant="contained" className="header-createalert-btn" onClick={ dlgClose }>
							<b className="text-white">{btnText}</b>
						</Button>  
			</div> 
		</Dialog> 
	);
}

export default ComingSoon;