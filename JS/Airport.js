const PassengerPlane = require('./planes/PassengerPlane');
const MilitaryPlane = require('./planes/MilitaryPlane');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

const MILITARY_TYPES = require('./models/militaryTypes');

class Airport {

  constructor(planes) {
    this.planes = planes;
  }

  get planes() {
    return this._planes;
  }

  set planes(value) {
    this._planes = value;
  }

  getPlanesByInstance = (instanceName) => this.planes.filter((plane) => plane instanceof instanceName);

  getPassengerPlanes = () => this.getPlanesByInstance(PassengerPlane);
  getMilitaryPlanes = () => this.getPlanesByInstance(MilitaryPlane);
  getExperimentalPlanes = () => this.getPlanesByInstance(ExperimentalPlane);

  getPassengerPlaneWithMaxPassengersCapacity() {
    const passengerPlanes = this.getPassengerPlanes();

    return passengerPlanes.reduce(
      (planeWithMaxCapacity, item) => planeWithMaxCapacity.passengersCapacity < item.passengersCapacity ?
        item : planeWithMaxCapacity, passengerPlanes[0]
    );
  }

  getMilitaryPlanesByType = (type) => this.getMilitaryPlanes().filter((plane) => plane.militaryType === type);

  getTransportMilitaryPlanes = () => this.getMilitaryPlanesByType(MILITARY_TYPES.TRANSPORT);
  getBomberMilitaryPlanes = () => this.getMilitaryPlanesByType(MILITARY_TYPES.BOMBER);

  sortByMaxDistance() {
    this.planes.sort((a, b) => a.maxFlightDistance - b.maxFlightDistance);

    return this;
  }

  sortByMaxSpeed() {
    this.planes.sort((a, b) => a.maxSpeed - b.maxSpeed);

    return this;
  }

  sortByMaxLoadCapacity() {
    this.planes.sort((a, b) => a.maxLoadCapacity - b.maxLoadCapacity);

    return this;
  }

  static print = (planes) => JSON.stringify(planes);
}

module.exports = Airport;