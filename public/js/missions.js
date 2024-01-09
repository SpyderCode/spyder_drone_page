function fetchDroneData() {
    $.get('/api/drone-data', function (data) {

      displayDroneData(data);
    });
  }

  function fetchMissionModels() {
    $.get('/api/completed-missions', function (data) {

      displayMissionModels(data);
    });
  }

function displayDroneData(data) {
    const droneDataContainer = $('#droneDataContainer');

    droneDataContainer.empty();

    const scrollContainer = $('<div class="scroll-container"></div>');

    const flexContainer = $('<div class="d-flex flex-nowrap"></div>');

    data.forEach(drone => {
      const card = $(`
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body" style="color: black;>
              <h5 class="card-title">${drone.model}</h5>
              <p class="card-text">Size: ${drone.size.x} x ${drone.size.y} x ${drone.size.z}</p>
              <p class="card-text">Maker: ${drone.maker}</p>
              <p class="card-text">${drone.description}</p>
            </div>
          </div>
        </div>
      `);

      flexContainer.append(card);
    });

    scrollContainer.append(flexContainer);
    droneDataContainer.append(scrollContainer);
  }

  function displayMissionModels(data) {
    const missionModelContainer = $('#missionModelContainer');

    missionModelContainer.empty();

    data.forEach(model => {
      const card = $(`
        <div class="col-md-4 mb-3">
        <a href="/3dModel">
          <div class="card" style="color: black;">
            <div class="card-body" style="color: black;">
              <h5 class="card-title" style="color: black;">${model.name}</h5>
              <p class="card-text" style="color: black;">Date: ${model.date}</p>
              <p class="card-text" style="color: black;">Location: ${model.location}</p>
            </div>
          </div>
        </a>
        </div>
      `);

      missionModelContainer.append(card);
    });
  }

  $('#loadMoreDrones').click(function () {
    fetchDroneData();
  });

  $('#loadMoreModels').click(function () {
    fetchMissionModels();
  });

  fetchDroneData();
  fetchMissionModels();