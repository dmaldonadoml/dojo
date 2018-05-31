const expect = require('chai').expect;

const FoundElements = require('../my-app/src/src/FoundElements');
const CustomFoundElements = require('../my-app/src/src/CustomFoundElements');
const TeacherWelcomeMessage = require('../my-app/src/src/TeacherWelcomeMessage');
const Teacher = require('../my-app/src/src/Teacher');
const RoomsList = require('../my-app/src/src/RoomList');
const EmptyRoomList = require('../my-app/src/src/EmptyRoomList');
const Room = require('../my-app/src/src/Room');
const Label = require('../my-app/src/src/Label');

const ComputersRequest = require('../my-app/src/src/requests/Computers');
const CapacityRequest = require('../my-app/src/src/requests/Capacity');
const AreaRequest = require('../my-app/src/src/requests/Area');

const rooms = [
    new Room('Lab A', 5, 10),
    new Room('Lab B', 15, 19),
    new Room('Lab C', 15, 20),
    new Room('Lab D', 15, 20, 5),
    new Room('Lab E', 15, 30, 1),
    new Room('Lab F', 5, 20, 5)
];

describe("Iterable List", () => {
    it('should iterate over a list of rooms', () => {
        const list = new RoomsList(rooms)
        .filter(new CapacityRequest(10));

        let loops = 0;

        list.iterate(room => {
            loops++;
        });

        expect(loops).to.eql(4);
        expect(list.count()).to.eql(4);
    });
    it('should iterate over an empty list of rooms', () => {
        const list = new RoomsList(rooms)
        .filter(new CapacityRequest(60));

        let loops = 0;

        list.iterate(room => {
            loops++;
        });

        expect(loops).to.eql(0);
        expect(list.count()).to.eql(0);
    });
});

describe("Renders", () => {
    it("should render welcome message to the teachers", () => {
        
        const message = new TeacherWelcomeMessage();

        expect(
            message.render(new Teacher('Julio'))
        ).to.eql('Welcome to the Unified Center, Julio.');
        
        expect(
            message.render(new Teacher('Esther Díaz'))
        ).to.eql('Welcome to the Unified Center, Esther Díaz.');
    });
    
    it("[FoundElements] should render the found elements", () => {
        
        const list = new RoomsList(rooms)
        .filter(new CapacityRequest(10));

        const room = list.pickFirst();
        
        const view = new FoundElements();

        expect(room instanceof Room).to.eql(true);
        expect(room.getName()).to.eql('Lab B');
        expect(view.render(list)).to.eql('Found 4 rooms');
    });
    
    it("[CustomFoundElements] should render the found elements", () => {
        
        const list = new RoomsList(rooms)
        .filter(new CapacityRequest(10));

        const room = list.pickFirst();
        
        const view = new CustomFoundElements();

        expect(room instanceof Room).to.eql(true);
        expect(room.getName()).to.eql('Lab B');
        expect(view.render(list)).to.eql('Found 4 rooms');
    });
    
    it("[FoundElements] should render the no found elements", () => {
        
        const list = new RoomsList(rooms)
        .filter(new CapacityRequest(100));

        const view = new FoundElements();

        expect(view.render(list)).to.eql('Found 0 rooms');
    });
    
    it('[CustomFoundElements] should render "Sorry, no rooms for your needs" when we got no results', () => {
        
        const list = new RoomsList(rooms)
        .filter(new CapacityRequest(100));

        const view = new CustomFoundElements();

        expect(view.render(list)).to.eql('Sorry, no rooms for your needs');
    });
});

describe("RoomList filters", () => {

    it('should filter for capacity of 10 students and pick a room', () => {

        const room = new RoomsList(rooms)
        .filter(new CapacityRequest(10))
        .pickFirst();

        expect(room instanceof Room).to.eql(true);
        expect(room.getName()).to.eql('Lab B');
    });
    
    it("should filter for capacity of 30 students and get an empty list", () => {

        const list = new RoomsList(rooms)
        .filter(new CapacityRequest(30));

        expect(list instanceof EmptyRoomList).to.eql(true);
    });

    it("should filter for an area of 20m2 and pick a room", () => {

        const room = new RoomsList(rooms)
        .filter(new AreaRequest(20))
        .pickFirst();

        expect(room instanceof Room).to.eql(true);
        expect(room.getName()).to.eql('Lab C');
    });

    it("should filter for a room with 5 computers and pick one", () => {

        const room = new RoomsList(rooms)
        .filter(new ComputersRequest(5))
        .pickFirst();

        expect(room instanceof Room).to.eql(true);
        expect(room.getName()).to.eql('Lab D');
    });

    it("should filter for a room with 1 computers, an area of 30 m2 and pick one", () => {

        const room = new RoomsList(rooms)
        .filter(new ComputersRequest(1))
        .filter(new AreaRequest(30))
        .pickFirst();

        expect(room instanceof Room).to.eql(true);
        expect(room.getName()).to.eql('Lab E');
    });

    it("should filter for a room with 5 computers an area of 20 m2 and for 5 students and pick one", () => {

        const students = 5;
        const area = 20;
        const computers = 5;

        const room = new RoomsList(rooms)
        .filter(new CapacityRequest(students))
        .filter(new ComputersRequest(computers))
        .filter(new AreaRequest(area))
        .pickSecond();

        expect(room instanceof Room).to.eql(true);
        expect(room.getName()).to.eql('Lab F');
    });
    
    it("should filter for a room with 35 computers an area of 120 m2 and for 35 students and get an empty list", () => {

        const students = 35;
        const area = 120;
        const computers = 35;

        const list = new RoomsList(rooms)
        .filter(new CapacityRequest(students))
        .filter(new ComputersRequest(computers))
        .filter(new AreaRequest(area))

        //I dont check for a room here, because it doesnt have sense since
        //The user is not able to pick one.
        expect(list instanceof EmptyRoomList).to.eql(true);
    });
});

describe("Room booking", () => {

    it('should get a booking after book a room', () => {

        const teacher = new Teacher('Esther');
        const booking = teacher.book(new Room('Lab A'));

        const label = booking.getLabel();

        expect(label instanceof Label).be.eql(true);
        expect(label.toText()).be.eql('Lab A');
        expect(label.toBraille()).be.eql('⠇⠁⠃⠀⠁');
    });
});