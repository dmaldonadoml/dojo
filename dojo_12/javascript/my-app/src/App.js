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
	<div className="filters-box">
		<div className="filter-title">
			<h2>Filtros</h2>
		</div>
		<div className="capacity-filter">Capacity: <input 
			type="text"
			name="capacity"
			onChange={onChange} /></div>
		<div className="area-filter">Área: <input 
			type="text"
			name="area"
			onChange={onChange} /></div>
		<div className="computers-filter">Computers: <input 
			type="text"
			name="computers"
			onChange={onChange} /></div>
	</div>
)
const ClearFilters = ({onClick}) => (
	<div className="clear-filters-box">
		<input type="button" value="Limpiar filtros" onClick={onClick} />
	</div>
)
const ResultMessage = ({view, list}) => (
	<div>{view.render(list)}</div>
)
const Close = ({onClick}) => (
	<div className="close-box">
		<input
			type="button" 
			onClick={onClick} 
			value="Terminar búsqueda" />
	</div>
)

const BookedRoom = ({text,braille}) => (
	<div>
		<label>Booked</label>
		<div className="booked-room-button">
			<input type="button" value="Imprimir" onClick={() => {
				alert(text)
			}} />
		</div>

		<div className="booked-room-button">
			<input type="button" value="Imprimir Braille" onClick={() => {
				alert(braille)
			}} />
		</div>
	</div>
)

class RoomView extends Component {
	constructor(props) {
		super(props);
		this.book = this.book.bind(this);

		this.state = {
			booked: false,
			booking: {}
		};
	}

	book() {
		this.setState(state => {
			state.booked = true;
			state.booking = this.props.onBook(this.props.room);
			return state;
		});
	}

	render() {
		const {room} = this.props;
		return (
			<div className="room-card">
				<h3>{room.getName()}</h3>

				{this.state.booked ?
					<BookedRoom
					text={this.state.booking.getLabel().toText()}
					braille={this.state.booking.getLabel().toBraille()} /> :
					<div><input value="reservar" type="button" onClick={this.book} /></div>
				}
			</div>
		)
	}
}

const Searcher = ({list,onClear,onClose,onFilterChange,onBook}) => {

	return (
		<div className="searcher">
			<div>
				<Close className="closer" onClick={onClose} />
				<ClearFilters onClick={onClear} />
			</div>
			<Filters onChange={onFilterChange} />
			<ResultMessage view={new CustomFoundElements()} list={list} />
	
			{list.iterate((room, i) => {
				return <RoomView key={i} room={room} onBook={onBook} />
			})}
		</div>
	)
}
const NewSearch = ({onClick}) => (
	<input
		type="button" 
		onClick={onClick} 
		value="Nueva búsqueda" />
)

class App extends Component {
	constructor() {
		super();
		this.state = {
			searching: false,
			filters: _getInitialFilters()
		};

		this.rooms = [
			new Room('Lab A', 5, 10),
			new Room('Lab B', 15, 19),
			new Room('Lab C', 15, 20),
			new Room('Lab D', 15, 20, 5),
			new Room('Lab E', 15, 30, 1),
			new Room('Lab F', 5, 20, 5)
		];

		this.teacher = new Teacher('Julio');

		this.handleChange = this.handleChange.bind(this);
		this.clearFilters = this.clearFilters.bind(this);
		this.initialState = this.initialState.bind(this);
		this.searchingState = this.searchingState.bind(this);
		this.bookRoom = this.bookRoom.bind(this);
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

	bookRoom(room) {
		return this.teacher.book(room);
	}

	render() {
		const teacher = this.teacher;
		const message = new TeacherWelcomeMessage();
		
		const list = Object.values(this.state.filters).reduce((a,b) => {
			return a.filter(b)
		}, new RoomsList(this.rooms));

		return (
			<div className="App">

				<WelcomeMessage message={message} teacher={teacher} />

				{this.state.searching ? 
				//real world app Searcher does not have so many responsabilities!!!
				<Searcher
					list={list} 
					onClear={this.clearFilters}
					onClose={this.initialState}
					onFilterChange={this.handleChange} 
					onBook={this.bookRoom} /> : 
				<NewSearch onClick={this.searchingState} />}

			</div>
		);
	}
}

export default App;
