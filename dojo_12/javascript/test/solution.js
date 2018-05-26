const expect = require('chai').expect;

const HomeView = require('../my-app/src/src/HomeView');
const SearchView = require('../my-app/src/src/SearchView');
const HeaderView = require('../my-app/src/src/HeaderView');
const Teacher = require('../my-app/src/src/Teacher');
const RoomsListView = require('../my-app/src/src/RoomListView');
const RoomsList = require('../my-app/src/src/RoomList');
const Room = require('../my-app/src/src/Room');
const Label = require('../my-app/src/src/Label');

const ComputersRequest = require('../my-app/src/src/requests/Computers');
const CapacityRequest = require('../my-app/src/src/requests/Capacity');
const AreaRequest = require('../my-app/src/src/requests/Area');

const rooms = [
    new Room(new Label('Lab A'), 5, 10),
    new Room(new Label('Lab B'), 15, 19),
    new Room(new Label('Lab C'), 15, 20),
    new Room(new Label('Lab D'), 15, 20, 5),
    new Room(new Label('Lab E'), 15, 30, 1),
    new Room(new Label('Lab F'), 5, 20, 5)
];

describe("List Iterable", () => {
    it('should iterate over a list of rooms', () => {
        const view = new RoomsListView(new RoomsList(rooms))
        .search(new CapacityRequest(10));

        let loops = 0;

        view.iterate(room => {
            loops++;
        });

        expect(loops).to.eql(4);
    });
    it('should iterate over a list of rooms', () => {
        const view = new RoomsListView(new RoomsList(rooms))
        .search(new CapacityRequest(60));

        let loops = 0;

        view.iterate(room => {
            loops++;
        });

        expect(loops).to.eql(0);
    });
    it('should can filter and empty list', () => {
        const view = new RoomsListView(new RoomsList(rooms))
        .search(new CapacityRequest(60))
        .search(new AreaRequest(20));

        expect(view.render()).to.eql('No rooms for you');
    });
});

describe("Renders", () => {
    it("should render a welcome message to the teacher", () => {
        
        const headerView = new HeaderView(new Teacher('Julio'));
        
        expect(headerView.render()).to.eql('Welcome to the Unified Center, Julio.');
    });
    
    it("should init a room search, search and render the results", () => {
        
        const view = new RoomsListView(new RoomsList(rooms))
        
        const homeView = new HomeView();
        
        const searchView = homeView.initSearch(new SearchView(view));
        
        searchView.search(new CapacityRequest(10));
        
        const room = searchView.pickFirst();
        
        expect(room instanceof Room).to.eql(true);
        expect(room.getLabelAsText()).to.eql('Lab B');
        expect(searchView.render()).to.eql('Found 4 rooms');
    });
});

describe("Filters", () => {
    it("should search for rooms with capacity for 10 students and pick one", () => {

        const view = new RoomsListView(new RoomsList(rooms))
        .search(new CapacityRequest(10));

        const room = view.pickFirst();

        expect(room instanceof Room).to.eql(true);
        expect(room.getLabelAsText()).to.eql('Lab B');
        expect(view.render()).to.eql('Found 4 rooms');
    });
    
    it("should search for rooms with capacity for 30 students and found zero", () => {

        const view = new RoomsListView(new RoomsList(rooms))
        .search(new CapacityRequest(30));

        expect(view.render()).to.eql('No rooms for you');
    });

    it("should search a room with 20 m2 of area and pick one", () => {

        const area = 20;

        const room = new RoomsList(rooms)
        .filter(new AreaRequest(area))
        .pickFirst();

        expect(room instanceof Room).to.eql(true);
        expect(room.getLabelAsText()).to.eql('Lab C');
    });

    it("should search a room with 5 computers and pick one", () => {

        const computers = 5;

        const room = new RoomsList(rooms)
        .filter(new ComputersRequest(computers))
        .pickFirst();

        expect(room instanceof Room).to.eql(true);
        expect(room.getLabelAsText()).to.eql('Lab D');
    });

    it("should search a room with 1 computers and 30 m2 and pick one", () => {

        const area = 30;
        const computers = 1;

        const room = new RoomsList(rooms)
        .filter(new ComputersRequest(computers))
        .filter(new AreaRequest(area))
        .pickFirst();

        expect(room instanceof Room).to.eql(true);
        expect(room.getLabelAsText()).to.eql('Lab E');
    });

    it("should search a room with 5 computers, 20 m2 of area for 5 students and pick one", () => {

        const students = 5;
        const area = 20;
        const computers = 5;

        const room = new RoomsList(rooms)
        .filter(new CapacityRequest(students))
        .filter(new ComputersRequest(computers))
        .filter(new AreaRequest(area))
        .pickSecond();

        expect(room instanceof Room).to.eql(true);
        expect(room.getLabelAsBraille()).to.eql('⠇⠁⠃⠀⠋')
        expect(room.getLabelAsText()).to.eql('Lab F');
    });
});
