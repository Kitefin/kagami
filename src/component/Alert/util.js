export const TYPE_LIMITS = 1;
export const TYPE_WHITE_LISTS = 2;
export const TYPE_EXCLUSION_LISTS = 3;  

export const types = [
    { title: 'Limits', id: TYPE_LIMITS },
    { title: 'Whitelist', id: TYPE_WHITE_LISTS },
    { title: 'Exclusion-lists', id: TYPE_EXCLUSION_LISTS }
]; 

export const DESC_MIN = 1;
export const DESC_MAX = 2;

export const minMaxs = [
    { title: 'Minimum', id: DESC_MIN },
    { title: 'Maximum', id: DESC_MAX },
];

export const DESC_PER_TRANSACTION = 1;
export const DESC_PER_DAY = 2;
export const DESC_PER_WEEK = 3;
export const DESC_PER_MONTH = 4;

export const pers = [
    { title: 'Transaction', id: DESC_PER_TRANSACTION },
    { title: 'Day', id: DESC_PER_DAY },
    { title: 'Week', id: DESC_PER_WEEK },
    { title: 'Month', id: DESC_PER_MONTH },
]; 

export const TYPE_DESC_MINMAX_AMOUNT_PER = 1;
export const TPYE_DESC_2 = 2;
export const TPYE_DESC_3 = 3;
export const TPYE_DESC_4 = 4;

export const descs_con = [ 
	{ title: '<Min/Max> of <Amount> ETH per <transaction/time>', id: TYPE_DESC_MINMAX_AMOUNT_PER }, 
	{ title: 'Notifications if value of total assets in wallets exceeds a threshold', id: TPYE_DESC_2 },		
	{ title: 'Approved counterparts and smart contracts', id: TPYE_DESC_3 },		
	{ title: 'Minimum of 20 ETH per month (team wages)', id: TPYE_DESC_4 }
];

