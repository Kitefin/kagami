import { TextField, Autocomplete } from '@mui/material';
import ErrorDiv from './ErrorDiv';

const ComboBox = ({label = '', options, value, onChange, style = null, error = '' }) => {
    return ( 
        <>
            <Autocomplete
                freeSolo 
                options={options} 
                value={value}
                onChange={(event, newValue) => { onChange(newValue); }}
                renderInput={(params) => (
                    <TextField {...params} 
                        label={label}
                        variant="standard" 
                    />
                )} 
                style={style} 
                label=""
                id="demo"
            />   
            <ErrorDiv error={error}/>
        </>
    )
}

export default ComboBox;