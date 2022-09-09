import React from 'react';
import dashboard from '../../assets/img/dashboard.png'; 

function Dashboard() { 
	return (
		<>  
			<div className="content-center"> 
				<img src={dashboard} alt="main image" height="100%" width="100%" />
			</div>
		</>
	);
}

export default Dashboard;
