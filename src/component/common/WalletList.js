import { TextField } from '@mui/material';
import ErrorDiv from './ErrorDiv';
import { useState } from 'react';
import TextBox from './TextBox';
import {Button,Grid,Dialog,DialogContent,DialogTitle,IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import CloseIcon from '@mui/icons-material/Close';
import {isEmpty, isAddress, isEmail} from '../../util/valid';

const WalletList = ({className = '', label, value, onChange, error = '' }) => {
    const [address_Display, set_Address_Display] = useState(null);
    const [address, set_Address] = useState('');   
    const [addressError, set_AddressError] = useState('');

    const setAddress = (val) => {
		if(val.length > 42 )
		{ 
			set_AddressError('Wallet Address must be less than 42 charactors.');  
		}
		else 
		{
			set_AddressError('');
			set_Address(val)
		}
	}

    const add_Address = () => {
		const ok = isAddress(address);
		if(!ok) 
		{
			set_Address('');
			set_AddressError('Wallet Address type error');
			return;
		} 
		set_AddressError('');
		const index = addresses.indexOf(address); 
		if(index === -1)
		{
			addresses.push(address);
			set_Addresses(addresses);
			set_Address('');
			const addresses_display = get_addresses_display(addresses);
			set_Address_Display(addresses_display);
		} 
	}

	const delete_Address = (address_) => {  
		var index = addresses.indexOf(address_);
		addresses.splice(index, 1); 
		set_Addresses(addresses);
		set_Address(''); 
		const addresses_display = get_addresses_display(addresses);
		set_Address_Display(addresses_display);
	}
        
	const get_addresses_display = (addresses_) => {  
		let ps = [];
		for(let i in addresses_)
		{
			const address_ = addresses_[i];
			const div = (
			<div key={i}>
				<span >{address_}</span> 
				<IconButton aria-label="delete" size="medium" onClick={() => { delete_Address(address_) }}>
					<CloseIcon />
				</IconButton>
				<br/>
			</div>); 
			ps.push(div)
		}
		return ps;
	}

    const AddWalletAddress = ( 
		<div className='px-4'>	
			<div>  
				{ address_Display  }
			</div> 
			
			<TextBox 
				label=""  
				onChange={setAddress}	
				className='px-2'
				value={address} 
			/>	
			<IconButton aria-label="add" size="medium" onClick={() => { add_Address() }}>
				<AddIcon />
			</IconButton>	  
			<ErrorDiv error={addressError} /> 
			
		</div>
	);

    return (
        <>  
            { AddWalletAddress }
        </>
    )
}

export default WalletList;