import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chip, NoSsr } from '@mui/material';
import MUIDataTable from 'mui-datatables';

class GrafanaDisplaySelection extends Component {
  render() {
    const { boardPanelConfigs, deleteSelectedBoardPanelConfig } = this.props;
    const selectedValsForDisplay = [];
    boardPanelConfigs.forEach((cf) => {
      selectedValsForDisplay.push({
        board: cf.board && cf.board.title
          ? cf.board.title
          : '',
        panels: cf.panels.map((panel, ind) => <Chip key={`${panel.id}_-_${ind}`} label={panel.title} />),
        template_variables: cf.templateVars ? cf.templateVars.map((tv, ind) => {
          if (tv && tv !== '') {
            return (
              <Chip key={`${tv}-_-${ind}`} label={tv} />
            );
          }
          return null;
        })
          : [],
      });
    });


    const columns = [
      {
        name: 'board',
        label: 'Board',
      },
      {
        name: 'panels',
        label: 'Panels',
      },
      {
        name: 'template_variables',
        label: 'Template Variables',
      },
    ];
    const options = {
      filter: false,
      sort: false,
      search: false,
      filterType: 'textField',
      responsive: 'stacked',
      count: selectedValsForDisplay.length,
      print: false,
      download: false,
      pagination: false,
      viewColumns: false,
      onRowsDelete: (rowsDeleted) => {
        const delRows = rowsDeleted.data.map(({ dataIndex }) => dataIndex);
        deleteSelectedBoardPanelConfig(delRows);
        return false;
      },
    };
    return (
      <NoSsr>

        <MUIDataTable key={`gds_${new Date().getTime()}`} title="Meshery Results" data={selectedValsForDisplay} columns={columns} options={options} />

      </NoSsr>
    );
  }
}

GrafanaDisplaySelection.propTypes = {
  boardPanelConfigs: PropTypes.array.isRequired,
  deleteSelectedBoardPanelConfig: PropTypes.func.isRequired,
};

export default GrafanaDisplaySelection;
