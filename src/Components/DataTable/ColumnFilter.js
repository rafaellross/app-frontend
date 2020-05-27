import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterList from '@material-ui/icons/FilterList';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';



export default function ColumnFilter(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <FilterList onClick={handleClick}/>
      <Menu        
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant="selectedMenu"
        >
            
          {props.columns && (props.columns.map(column =>
            <MenuItem key={column.field}>
                <FormControlLabel
                    control={<Checkbox checked={!column.hidden} onChange={async (e) =>  props.handleToggle(e.target.name)} name={column.field} />}
                    label={column.title}
                />          
                </MenuItem>
          ))}
        
      </Menu>
    </div>
  );
}