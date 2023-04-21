import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NoSsr, TextField, Grid, Button,
} from '@mui/material';
import ReactSelectWrapper from './ReactSelectWrapper'


class GrafanaConfigComponent extends Component {
  render = () => {
    const {
      grafanaURL, grafanaAPIKey, urlError, handleChange, handleGrafanaConfigure, options, handleChangeApiKey
    } = this.props;
    return (
      <NoSsr>
        <React.Fragment>
          <div>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <div>
                  <ReactSelectWrapper
                    onChange={(select) => handleChange('grafanaURL')(select ? select.value : '')}
                    options={options}
                    value={grafanaURL}
                    label="Grafana Base URL"
                    error={urlError}
                    placeholder="Address of Grafana Server"
                    noOptionsMessage="No Grafana servers discovered"
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="grafanaAPIKey"
                  name="grafanaAPIKey"
                  label="API Key"
                  fullWidth
                  value={grafanaAPIKey}
                  margin="normal"
                  variant="outlined"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      handleGrafanaConfigure();
                    }
                  }}
                  onChange={handleChangeApiKey}
                />
              </Grid>
            </Grid>
            <div >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGrafanaConfigure}
              >
                Submit
              </Button>
            </div>
          </div>
        </React.Fragment>
      </NoSsr>
    );
  }
}

GrafanaConfigComponent.propTypes = {
  grafanaURL: PropTypes.object.isRequired,
  grafanaAPIKey: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleGrafanaConfigure: PropTypes.func.isRequired,
};

export default GrafanaConfigComponent;
