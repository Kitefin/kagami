 
 
	export const isEmpty = (val) => {
		return val === '' || val === null || val === undefined;
	}
 
	
	export const isAddress = (address_) => {
		const ok1 = address_.length > 2 && address_.substr(0, 2) === "0x";
		if(!ok1) return false;
		address_ = address_.substr(2, address_.length - 2);
		for(var i in address_)
		{
			const code = address_.charCodeAt(i);
			if( (code > 47 && code < 58) /*0~9*/ || (code > 64 && code < 71) /*A~F*/ || (code > 96 && code < 103) /*a~f*/ )
				continue;
			else return false;
		}
		return true;
	}

    export const isEmail = (input) => { 
		var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
		if (input.match(validRegex)) { 
		  return true; 
		}
		else {
		  return false; 
		} 
	  }
 
     