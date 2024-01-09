const express = require('express');
const router = express.Router();

router.get('/mission-stats', (req, res) => {
  const totalMissions = getRandomInt(50, 100);
  const completedMissions = getRandomInt(20, 50);
  const inProgressMissions = getRandomInt(10, 30);
  const pendingMissions = totalMissions - completedMissions - inProgressMissions;

  res.json({
    totalMissions,
    completedMissions,
    inProgressMissions,
    pendingMissions,
  });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

router.get('/completed-missions', (req, res) => {
    const completedMissions = generateCompletedMissions(5); 
    res.json(completedMissions);
  });

  function generateCompletedMissions(count) {
    const missions = [];
    for (let i = 0; i < count; i++) {
      const mission = {
        name: generateRandomName(),
        date: generateRandomDate(),
        location: generateRandomLocation(),
      };
      missions.push(mission);
    }
    return missions;
  }

  function generateRandomName() {
    const names = ['Mission Alpha', 'Operation Beta', 'Project Gamma', 'Task Delta'];
    return getRandomItem(names);
  }

  function generateRandomDate() {
    const startDate = new Date(2022, 0, 1); 
    const endDate = new Date(); 
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toDateString();
  }

  function generateRandomLocation() {
    const locations = ['City A', 'City B', 'City C', 'City D'];
    return getRandomItem(locations);
  }

  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  router.get('/in-progress-missions', (req, res) => {
    const inProgressMissions = generateInProgressMissions(5); 
    res.json(inProgressMissions);
  });

  function generateInProgressMissions(count) {
    const missions = [];
    for (let i = 0; i < count; i++) {
      const mission = {
        name: generateRandomName(),
        status: generateRandomStatus(),
      };
      missions.push(mission);
    }
    return missions;
  }

  function generateRandomStatus() {
    const statuses = ['Planning', 'Out on the Field', 'Scanning', 'Backend Processing'];
    return getRandomItem(statuses);
  }
  router.get('/pending-missions', (req, res) => {
    const pendingMissions = generatePendingMissions(20); 
    res.json(pendingMissions);
  });

  function generatePendingMissions(count) {
    const missions = [];
    for (let i = 0; i < count; i++) {
      const mission = {
        name: generateRandomName(),
        client: generateRandomClient(),
        coordinates: generateRandomCoordinates(),
        description: generateRandomDescription(),
      };
      missions.push(mission);
    }
    return missions;
  }

  function generateRandomName() {
    const names = ['Mission A', 'Mission B', 'Mission C', 'Mission D', 'Mission E'];
    return getRandomItem(names);
  }

  function generateRandomClient() {
    const firstNames = ['John', 'Jane', 'Michael', 'Emma', 'Chris'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Yellow', 'Taylor'];
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    return `${firstName} ${lastName}`;
  }

  function generateRandomCoordinates() {
    const latitude = getRandomFloat(-90, 90);
    const longitude = getRandomFloat(-180, 180);
    return `(${latitude.toFixed(6)}, ${longitude.toFixed(6)})`;
  }

  function generateRandomDescription() {
    const descriptions = [
      'Survey the area for potential obstacles.',
      'Capture high-resolution images of the landscape.',
      'Collect environmental data for analysis.',
      'Inspect critical infrastructure for maintenance needs.',
      'Create a 3D model of the specified region.',
    ];
    return getRandomItem(descriptions);
  }

  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  router.get('/drone-data', (req, res) => {
    const droneData = generateDroneData(10); 
    res.json(droneData);
});

function generateDroneData(count) {
    const drones = [];
    for (let i = 0; i < count; i++) {
        const drone = {
            model: generateRandomDroneModel(),
            size: generateRandomDroneSize(),
            maker: generateRandomDroneMaker(),
            description: generateRandomDroneDescription(),
        };
        drones.push(drone);
    }
    return drones;
}

function generateRandomDroneModel() {
    const models = ['Model X', 'Model Y', 'Model Z', 'Drone A', 'Drone B'];
    return getRandomItem(models);
}

function generateRandomDroneSize() {
    const size = {
        x: getRandomFloat(1, 10),
        y: getRandomFloat(1, 10),
        z: getRandomFloat(1, 10),
    };
    return size;
}

function generateRandomDroneMaker() {
    const makers = ['Maker X', 'Maker Y', 'Maker Z', 'DroneCo', 'SkyTech'];
    return getRandomItem(makers);
}

function generateRandomDroneDescription() {
    const descriptions = [
        'Quadcopter for aerial photography.',
        'Hexacopter with advanced stabilization.',
        'Compact drone for indoor navigation.',
        'High-altitude drone for research purposes.',
        'Autonomous drone for surveillance.',
    ];
    return getRandomItem(descriptions);
}

module.exports = router;