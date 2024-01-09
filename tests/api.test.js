const supertest = require('supertest');
const app = require('../app'); // Adjust the path based on your folder structure
const expect = require('chai').expect;

describe('API Tests', () => {
  it('/mission-stats should return mission statistics', async () => {
    const response = await supertest(app).get('/api/mission-stats');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('totalMissions').that.is.a('number');
    expect(response.body).to.have.property('completedMissions').that.is.a('number');
    expect(response.body).to.have.property('inProgressMissions').that.is.a('number');
    expect(response.body).to.have.property('pendingMissions').that.is.a('number');
  });

  it('/completed-missions should return completed missions', async () => {
    const response = await supertest(app).get('/api/completed-missions');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('name').that.is.a('string');
    expect(response.body[0]).to.have.property('date').that.is.a('string');
    expect(response.body[0]).to.have.property('location').that.is.a('string');
  });

  it('/in-progress-missions should return in-progress missions', async () => {
    const response = await supertest(app).get('/api/in-progress-missions');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('name').that.is.a('string');
    expect(response.body[0]).to.have.property('status').that.is.a('string');
  });

  it('/pending-missions should return pending missions', async () => {
    const response = await supertest(app).get('/api/pending-missions');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('name').that.is.a('string');
    expect(response.body[0]).to.have.property('client').that.is.a('string');
    expect(response.body[0]).to.have.property('coordinates').that.is.a('string');
    expect(response.body[0]).to.have.property('description').that.is.a('string');
  });

  it('/drone-data should return drone data', async () => {
    const response = await supertest(app).get('/api/drone-data');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('model').that.is.a('string');
    expect(response.body[0]).to.have.property('size').that.is.an('object');
    expect(response.body[0].size).to.have.property('x').that.is.a('number');
    expect(response.body[0].size).to.have.property('y').that.is.a('number');
    expect(response.body[0].size).to.have.property('z').that.is.a('number');
    expect(response.body[0]).to.have.property('maker').that.is.a('string');
    expect(response.body[0]).to.have.property('description').that.is.a('string');
  });
});
