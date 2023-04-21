import React, {Component} from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import { sortAs } from 'react-pivottable/Utilities';
import Plot from 'react-plotly.js';
import dummyData from './dummyData';
const createPlotlyRenderers = require('react-pivottable/PlotlyRenderers');
const PlotlyRenderers = createPlotlyRenderers(Plot);

class PivotTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pivotState: {
				mode: 'demo',
				data: dummyData,
				rows: [ 'Payer Gender' ],
				cols: [ 'Party Size' ],
				aggregatorName: 'Sum over Sum',
				vals: [ 'Tip', 'Total Bill' ],
				rendererName: 'Grouped Column Chart',
				plotlyOptions: { width: 500, height: 500 },
				plotlyConfig: {},
				sorters: {
					Meal: sortAs([ 'Lunch', 'Dinner' ]),
					'Day of Week': sortAs([ 'Thursday', 'Friday', 'Saturday', 'Sunday' ])
				},
				tableOptions: {
					clickCallback: function(e, value, filters, pivotData) {
						var names = [];
						pivotData.forEachMatchingRecord(filters, function(record) {
							names.push(record.Meal);
						});
						alert(names.join('\n'));
					}
				}
			},
			savedData: ''
		};
	}

	onChangeTable = (s) => {
        console.log(s);
		this.setState({
			pivotState: s
		});
		console.log(s);
		let savedData = {
			rows: s.rows,
			cols: s.cols,
			vals: s.vals
		};
		this.setState({
			savedData: JSON.stringify(savedData)
		});
	};

	handleStateChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	applyData = (e) => {
		const { savedData, pivotState } = this.state;
		console.log(savedData, pivotState);
		this.setState({
			pivotState: {
				...pivotState,
				...JSON.parse(savedData)
			}
		});
	};

	render() {
		return (
			<React.Fragment>
				<textarea value={this.state.savedData} name="savedData" onChange={this.handleStateChange} />
				<br />
				<button className="btn btn-success" onClick={this.applyData}>
					Apply Data
				</button>
				<br />
				<PivotTableUI
					renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
					{...this.state.pivotState}
					onChange={this.onChangeTable}
					unusedOrientationCutoff={Infinity}
				/>
			</React.Fragment>
		);
	}
}
export default PivotTable;
