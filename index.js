const hapi = require('hapi');
const hapiSwagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');

const UserRoute = require('./routes/userRoute');
const MongoDB = require('./db/mongodb');
const userSchema = require('./db/schema/userSchema');

const app = new hapi.Server({
  port: 8000
});

const mapRoutes = (instance, methods) => {
  return methods.map(method => instance[method]())
};


async function main() {

  try {
      await MongoDB.connect();
  const mongodb = new MongoDB(userSchema);
  // Swagger fica no /documentation
  await app.register([
    vision,
    inert,
    {
      plugin: hapiSwagger,
      options: {
        info: {
          title: 'API User',
          version: 'v1.0'
        },
        lang: 'pt'
      }
    }
  ]);

  app.route([
    ...mapRoutes(new UserRoute(mongodb), UserRoute.methods())
  ]);

  await app.start()
  console.log('server running at', app.info.port)
  return app;
  } catch (error) {
    console.log('errora pppp: ', error);
    return error;

  }

};

module.exports = main();