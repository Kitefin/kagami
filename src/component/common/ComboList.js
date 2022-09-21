import { TextField, Autocomplete, Chip } from '@mui/material';
import ErrorDiv from './ErrorDiv';

const ComboList = ({label = '', getOptionLabel, options, value, onChange, style = null, error = '' }) => {
    return (<> 
        <Autocomplete
            multiple 
            freeSolo
            options={options} 
            getOptionLabel={getOptionLabel}
            value={value}
            onChange={(event, newValue) => { onChange(newValue); }}            
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
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

export default ComboList;