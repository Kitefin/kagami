
const TYPE_WHITE_LISTS = 1;
const TYPE_LIMITS = 2;
const TYPE_EXCLUSION_LISTS = 3;  

export const TYPES = [
    { title: 'Whitelist', id: TYPE_WHITE_LISTS }, 
    { title: 'Limits', id: TYPE_LIMITS },
    { title: 'Exclusion-lists', id: TYPE_EXCLUSION_LISTS }
];

const DESC_MIN = 1;
const DESC_MAX = 2;

export const minMaxs = [
    { title: 'Minimum', id: DESC_MIN },
    { title: 'Maximum', id: DESC_MAX },
];

const DESC_PER_TRANSACTION = 1;
const DESC_PER_DAY = 2;
const DESC_PER_WEEK = 3;
const DESC_PER_MONTH = 4;

export const pers = [
    { title: 'Transaction', id: DESC_PER_TRANSACTION },
    { title: 'Day', id: DESC_PER_DAY },
    { title: 'Week', id: DESC_PER_WEEK },
    { title: 'Month', id: DESC_PER_MONTH },
]; 

const TYPE_DESC_MINMAX_AMOUNT_PER = 1;
const TYPE_DESC_2 = 2;
const TYPE_DESC_3 = 3;
const TYPE_DESC_4 = 4;

export const DESCS = [ 
	{ title: '<Min/Max> of <Amount> ETH per <transaction/time>', id: TYPE_DESC_MINMAX_AMOUNT_PER }, 
	{ title: 'Notifications if value of total assets in wallets exceeds a threshold', id: TYPE_DESC_2 },		
	{ title: 'Approved counterparts and smart contracts', id: TYPE_DESC_3 },		
	{ title: 'Minimum of 20 ETH per month (team wages)', id: TYPE_DESC_4 }
];

export const GET_DESC_TITLE_BY_ID = (id) => {
    for(var i in DESCS)
    {
        if(DESCS[i].id === id)
        {
            return DESCS[i].title; 
        }
    }
}

export const GET_DESC_ID_BY_TITLE = (title) => {
    for(var i in DESCS)
    {
        if(DESCS[i].title === title)
        {
            return DESCS[i].id; 
        }
    }
}

export const GET_TYPE_ID_BY_TITLE = (title) => {
    for(var i in TYPES)
    {
        if(TYPES[i].title === title)
        {
            return TYPES[i].id; 
        }
    }
}

export const NEED_DESC_DETAIL = (id) => {
    return id === TYPE_DESC_MINMAX_AMOUNT_PER || id === TYPE_DESC_4; 
}

export const GET_DESCS_BY_TYPE_ID = (type) => {
    const id = GET_TYPE_ID_BY_TITLE(type); 
    switch(id)
    {
        case TYPE_LIMITS:          return [ DESCS[0], DESCS[1] ];  
        case TYPE_WHITE_LISTS:     return [ DESCS[2] ]; 
		case TYPE_EXCLUSION_LISTS: return [ DESCS[3] ];   
    }  
}




