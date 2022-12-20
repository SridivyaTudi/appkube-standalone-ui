import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select';
import { Typography, NoSsr, TextField, Paper, Chip, MenuItem } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputProps={{
        inputComponent,
        inputProps: {
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected
          ? 500
          : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class ReactSelectWrapper extends React.Component {
  render() {
    const {
      theme, label, placeholder, onChange, onInputChange, value, options, error, noOptionsMessage = "No Options"
    } = this.props;

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': { font: 'inherit', },
      }),
    };

    return (
      <div>
        <NoSsr>
          <CreatableSelect
            styles={selectStyles}
            textFieldProps={{
              label,
              InputLabelProps: { shrink: true, },
              error,
            }}
            options={options}
            components={components}
            value={value}
            onChange={onChange}
            onInputChange={onInputChange}
            placeholder={placeholder}
            isClearable
            noOptionsMessage={() => noOptionsMessage}
          />
        </NoSsr>
      </div>
    );
  }
}

ReactSelectWrapper.propTypes = {
  theme: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  noOptionsMessage: PropTypes.string
};

export default ReactSelectWrapper;
