import { TextField } from '@mui/material';
import ErrorDiv from './ErrorDiv';

const TextBox = ({className = '', label, value, onChange, error = '' }) => {
    return (<>  
        <TextField  
			label={label}
			variant="standard"  
			value={value}
			onChange={(e) => onChange(e.target.value) } 
            className={className}
		/> 
        {error ? <ErrorDiv error={error} /> : null } 
        </>
    )
}

export default TextBox;