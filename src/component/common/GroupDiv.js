import React from 'react'; 
 
function GroupDiv({title, comp}) { 
	return (
        <div className="group">
            <div className='group_title'><b className='px-3 pr-3'> {title} </b> </div>
            <div>{comp}</div>
        </div> 
	);
}

export default GroupDiv;
