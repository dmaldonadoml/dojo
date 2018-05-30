import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Teacher from './src/Teacher';
import Room from './src/Room';
import RoomsList from './src/RoomList';
import TeacherWelcomeMessage from './src/TeacherWelcomeMessage';
import CustomFoundElements from './src/CustomFoundElements';

import CapacityFilter from './src/requests/Capacity';
import AreaFilter from './src/requests/Area';
import ComputersFilter from './src/requests/Computers';

const rooms = [
    new Room('Lab A', 5, 10),
    new Room('Lab B', 15, 19),
    new Room('Lab C', 15, 20),
    new Room('Lab D', 15, 20, 5),
    new Room('Lab E', 15, 30, 1),
    new Room('Lab F', 5, 20, 5)
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

const WelcomeMessage = ({message, teacher}) => (
	<div>
		<p>{message.render(teacher)}</p>
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
const ResultMessage = ({view, list}) => (
	<div>{view.render(list)}</div>
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
const Searcher = ({list,onClear,onClose,onFilterChange}) => {

	return (
		<div className="searcher">
			<div>
				<Close className="closer" onClick={onClose} />
				<ClearFilters onClick={onClear} />
			</div>
			<Filters onChange={onFilterChange} />
			<ResultMessage view={new CustomFoundElements()} list={list} />
	
			{list.iterate((room, i) => {
				return <RoomView key={i} title={room.getName()} />
			})}
		</div>
	)
}
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
		const teacher = new Teacher('Julio');
		const message = new TeacherWelcomeMessage();
		
		const list = Object.values(this.state.filters).reduce((a,b) => {
			return a.filter(b)
		}, new RoomsList(rooms));

		return (
			<div className="App">

				<WelcomeMessage message={message} teacher={teacher} />

				{this.state.searching ? 
				<Searcher
					list={list} 
					onClear={this.clearFilters} 
					onClose={this.initialState} 
					onFilterChange={this.handleChange} /> : 
				<NewSearch onClick={this.searchingState} />}

			</div>
		);
	}
}

export default App;
