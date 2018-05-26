import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HomeView from './src/HomeView';
import SearchView from './src/SearchView';
import HeaderView from './src/HeaderView';
import Teacher from './src/Teacher';
import Room from './src/Room';
import Label from './src/Label';
import RoomsListView from './src/RoomListView';
import RoomsList from './src/RoomList';
import CapacityFilter from './src/requests/Capacity';
import AreaFilter from './src/requests/Area';
import ComputersFilter from './src/requests/Computers';

const rooms = [
    new Room(new Label('Lab A'), 5, 10),
    new Room(new Label('Lab B'), 15, 19),
    new Room(new Label('Lab C'), 15, 20),
    new Room(new Label('Lab D'), 15, 20, 5),
    new Room(new Label('Lab E'), 15, 30, 1),
    new Room(new Label('Lab F'), 5, 20, 5)
];

const map = {
	capacity: CapacityFilter,
	computers: ComputersFilter,
	area: AreaFilter
};

function RoomFilterFactory(key, value) {
	return new map[key](value);
}

function _getInitialFilters() {
	return {
		capacity: RoomFilterFactory('capacity', 0),
		computers: RoomFilterFactory('computers', 0),
		area: RoomFilterFactory('area', 0)
	};
}

const WelcomeMessage = ({view}) => (
	<div>
		<p>{view.render()}</p>
	</div>
)
const Filters = ({onChange}) => (
	<div>
		<p>Filters:</p>
		<p>Capacity: <input 
			type="text"
			name="capacity"
			onChange={onChange} /></p>
		<p>Área: <input 
			type="text"
			name="area"
			onChange={onChange} /></p>
		<p>Computers: <input 
			type="text"
			name="computers"
			onChange={onChange} /></p>
	</div>
)
const ClearFilters = ({onClick}) => (
	<div>
		<input type="button" value="Clear filters" onClick={onClick} />
	</div>
)
const ResultMessage = ({view}) => (
	<div>{view.render()}</div>
)
const Close = ({onClick}) => (
	<input
		type="button" 
		onClick={onClick} 
		value="x" />
)
const RoomView = ({title}) => (
	<div className="room-card">
		<div>{title}</div>
		<div><input value="reservar" type="button" /></div>
	</div>
)
const Searcher = ({list,onClear,onClose,onFilterChange}) => (
	<div className="searcher">
		<div>
			<Close className="closer" onClick={onClose} />
			<ClearFilters onClick={onClear} />
		</div>
		<Filters onChange={onFilterChange} />
		<ResultMessage view={list} />

		{list.iterate((room, i) => {
			return <RoomView key={i} title={room.getLabelAsText()} />
		})}
	</div>
)
const NewSearch = ({onClick}) => (
	<input
		type="button" 
		onClick={onClick} 
		value="new search!" />
)

class App extends Component {
	constructor() {
		super();
		this.state = {
			searching: false,
			filters: _getInitialFilters()
		};

		this.handleChange = this.handleChange.bind(this);
		this.clearFilters = this.clearFilters.bind(this);
		this.initialState = this.initialState.bind(this);
		this.searchingState = this.searchingState.bind(this);
	}

	handleChange(e) {

		const value = e.target.value;
		const key = e.target.name;

		this.setState(state => {

			state.filters[key] = RoomFilterFactory(key, value);
			return state;
		});
	}

	clearFilters() {
		this.setState(state => {
			state.filters = [];
			return state;
		})
	}

	initialState() {
		this.setState(state => {
			state.searching = false;
			state.filters = _getInitialFilters();
			return state;
		});
	}

	searchingState() {
		this.setState(state => {
			state.searching = true;
			return state;
		});
	}

	render() {
		
		const view = new RoomsListView(new RoomsList(rooms))

		const teacher = new Teacher('Julio');
		const headerView = new HeaderView(teacher);
		
		const homeView = new HomeView();
		const searchView = Object.values(this.state.filters).reduce((a,b) => {
			return a.search(b)
		}, new SearchView(view));

		return (
			<div className="App">

				<WelcomeMessage view={headerView} />

				{this.state.searching ? 
				<Searcher
					list={searchView} 
					onClear={this.clearFilters} 
					onClose={this.initialState} 
					onFilterChange={this.handleChange} /> : 
				<NewSearch onClick={this.searchingState} />}

			</div>
		);
	}
}

export default App;
