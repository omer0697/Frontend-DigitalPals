import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export default function SelectField({ label, value, onChange, options }) {
    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            label={label}
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
    )
    }