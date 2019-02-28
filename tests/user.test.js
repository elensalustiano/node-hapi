const assert =  require('assert');
const api = require('./../index');

let app = {};
const MOCK_USER = {
  email: 'test@test',
  cpf: '123',
  name : 'test',
  phone: 23344,
  password: '123'
};

describe('API user tests suite', () => {
  before(async () => {
    app = await api;
  });

  it('return 400 status code and message error if field email was not sended', async () => {
    const user = { ...MOCK_USER };
    delete user.email;
    const result = await app.inject({
      method: 'POST',
      url: '/user',
      payload: user
    });

    const resp = JSON.parse(result.payload);
    const [ key ] = resp.validation.keys;
    assert.equal(resp.statusCode, 400);
    assert.equal(key, 'email');
  });

  it('return 400 status code and message error if field cpf was not sended', async () => {
    const user = { ...MOCK_USER };
    delete user.cpf;
    const result = await app.inject({
      method: 'POST',
      url: '/user',
      payload: user
    });

    const resp = JSON.parse(result.payload);
    const [ key ] = resp.validation.keys;
    assert.equal(resp.statusCode, 400);
    assert.equal(key, 'cpf');
  });

  it('return 400 status code and message error if field name was not sended', async () => {
    const user = { ...MOCK_USER };
    delete user.name;
    const result = await app.inject({
      method: 'POST',
      url: '/user',
      payload: user
    });

    const resp = JSON.parse(result.payload);
    const [ key ] = resp.validation.keys;
    assert.equal(resp.statusCode, 400);
    assert.equal(key, 'name');
  });

  it('return 400 status code and message error if field password was not sended', async () => {
    const user = { ...MOCK_USER };
    delete user.password;
    const result = await app.inject({
      method: 'POST',
      url: '/user',
      payload: user
    });

    const resp = JSON.parse(result.payload);
    const [ key ] = resp.validation.keys;
    assert.equal(resp.statusCode, 400);
    assert.equal(key, 'password');
  });

  it('return user object if field phone was not sended', async () => {
    const user = { ...MOCK_USER };
    delete user.phone;
    const result = await app.inject({
      method: 'POST',
      url: '/user',
      payload: user
    });

    const resp = JSON.parse(result.payload);
    delete resp._id;
    delete resp.__v;
    assert.deepEqual(resp, user);
  });

  it('should register a new user if all fields was sendend', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/user',
      payload: MOCK_USER
    });

    let resp = JSON.parse(result.payload);
    delete resp._id;
    delete resp.__v;
    assert.deepEqual(resp, MOCK_USER);
  });
});