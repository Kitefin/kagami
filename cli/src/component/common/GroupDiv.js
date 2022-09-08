import React from 'react'; 
 
function GroupDiv({title, comp}) { 
	return (
        <div className="group">
            <div className='group_title'><b>&nbsp;&nbsp;{title}&nbsp;&nbsp;</b> </div>
            <div>{comp}</div>
        </div> 
	);
}

export default GroupDiv;
