async function fetchMissionStats() {
  try {
    const response = await fetch('/api/mission-stats');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener datos del backend:', error);
    return null;
  }
}

async function updateDashboard() {
  const missionStats = await fetchMissionStats();

  if (missionStats) {

    const totalMissionsElement = document.getElementById('totalMissions');

    if (
      totalMissionsElement 
    ) {

      totalMissionsElement.innerText = missionStats.totalMissions;

      var pieChartData = [missionStats.completedMissions, missionStats.inProgressMissions, missionStats.pendingMissions];
      var pieChartLabels = ['Completadas', 'En Progreso', 'Pendientes'];

      var ctx = document.getElementById('missionsPieChart').getContext('2d');
      console.log(ctx);
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: pieChartLabels,
          datasets: [{
            data: pieChartData,
            backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
          }]
        }
      });
    }
  }
}

async function fetchCompletedMissions() {
  try {
    const response = await fetch('/api/completed-missions');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos de misiones completadas:', error);
    return null;
  }
}

async function updateCompletedMissions() {
  const completedMissions = await fetchCompletedMissions();

  if (completedMissions) {
    const completedMissionsList = document.getElementById('completedMissionsList');
    completedMissionsList.innerHTML = ''; 

    completedMissions.forEach(mission => {
      const listItem = document.createElement('li');
      listItem.textContent = `${mission.name} - ${mission.date} - ${mission.location}`;
      completedMissionsList.appendChild(listItem);
    });
  }
}

async function fetchInProgressMissions() {
  try {
    const response = await fetch('/api/in-progress-missions');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos de misiones en progreso:', error);
    return null;
  }
}

async function updateInProgressMissions() {
  const inProgressMissions = await fetchInProgressMissions();

  if (inProgressMissions) {
    const inProgressMissionsList = document.getElementById('inProgressMissionsList');
    inProgressMissionsList.innerHTML = ''; 

    inProgressMissions.forEach(mission => {
      const listItem = document.createElement('li');

      const widthPercentage = getStatusWidthPercentage(mission.status);

      listItem.innerHTML = `
        <span>${mission.name}</span>
        <div class="progress">
          <div class="progress-bar ${getStatusColorClass(mission.status)}" role="progressbar" style="width: ${widthPercentage}%; min-width: 10%;">
            ${mission.status}
          </div>
        </div>
      `;

      inProgressMissionsList.appendChild(listItem);
    });
  }
}

function getStatusWidthPercentage(status) {
  switch (status) {
    case 'Planning':
      return 25; 
    case 'Out on the Field':
      return 50; 
    case 'Scanning':
      return 75; 
    case 'Backend Processing':
      return 100; 
    default:
      return 0; 
  }
}

function getStatusColorClass(status) {
  switch (status) {
    case 'Planning':
      return 'bg-danger'; 
    case 'Out on the Field':
      return 'bg-warning'; 
    case 'Scanning':
      return 'bg-info'; 
    case 'Backend Processing':
      return 'bg-success'; 
    default:
      return 'bg-secondary'; 
  }
}
async function fetchPendingMissions() {
  try {
    const response = await fetch('/api/pending-missions');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos de misiones pendientes:', error);
    return null;
  }
}

async function updatePendingMissions() {
  const pendingMissions = await fetchPendingMissions();

  if (pendingMissions) {
    const pendingMissionsList = document.getElementById('pendingMissionsList');
    pendingMissionsList.innerHTML = ''; 

    for (let i = 0; i < pendingMissions.length; i += 2) {
      const pageContainer = document.createElement('li');
      pageContainer.classList.add('page-item');

      const pageLink = document.createElement('a');
      pageLink.classList.add('page-link');
      pageLink.href = '#';
      pageLink.innerHTML = i / 2 + 1; 

      pageLink.addEventListener('click', () => showPage(i, pendingMissions));

      pageContainer.appendChild(pageLink);

      pendingMissionsList.appendChild(pageContainer);
    }

    showPage(0, pendingMissions);
  }
}

function showPage(pageIndex, missions) {
  const pendingMissionsList = document.getElementById('pendingMissionsList');
  const currentPageItems = missions.slice(pageIndex, pageIndex + 2);

  const previousPageItems = document.querySelectorAll('.page-container');
  previousPageItems.forEach(item => item.remove());

  for (let j = 0; j < currentPageItems.length; j++) {
    const mission = currentPageItems[j];
    const listItem = document.createElement('li');
    listItem.classList.add('page-container');
    listItem.innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${mission.name}</h5>
          <p class="card-text">Client: ${mission.client}</p>
          <button class="btn btn-primary" data-toggle="collapse" data-target="#details-${pageIndex + j}">
            Show Details
          </button>
          <div id="details-${pageIndex + j}" class="collapse mt-3">
            <p>Coordinates: ${mission.coordinates}</p>
            <p>Description: ${mission.description}</p>
          </div>
        </div>
      </div>
    `;
    pendingMissionsList.appendChild(listItem);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  updateDashboard();
  updateCompletedMissions();
  updateInProgressMissions();
  updatePendingMissions(); 
});