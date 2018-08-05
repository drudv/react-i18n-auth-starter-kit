const fs = require('fs');
const prompt = require('prompt');
const crypto = require('crypto');

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});
process.on('unhandledRejection', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

const schema = {
  properties: {
    dbName: {
      description: 'DB name',
      required: true,
    },
    dbUser: {
      description: 'DB user',
      required: true,
    },
    dbPassword: {
      description: 'DB password',
      required: true,
      hidden: true
    },
    dbHost: {
      description: 'DB host (optional)',
    },
    dbPort: {
      description: 'DB port (optional)',
      pattern: /^\d*$/,
    },
    jwtSecret: {
      description: 'JWT secret (leave blank to auto-generate)',
    },
  }
};

Promise.resolve()
  .then(() => new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(schema, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      if (!result.jwtSecret) {
        crypto.randomBytes(48, (error, buffer) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(Object.assign({}, result, {
            jwtSecret: buffer.toString('hex')
          }));
        });
        return;
      }
      resolve(result);
    });
  }))
  .then(result => new Promise((resolve, reject) => {
    const config = Object.assign({}, result, {
      dbHost: result.dbHost || undefined,
      dbPort: result.dbPort ? +result.dbPort : undefined,
    });
    const content = `module.exports = ${JSON.stringify(config, null, 2)};\n`;
    fs.writeFile(__dirname + '/../config.js', content, error => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  }))
  .then(() => {
    console.log('config.json was created');
    process.exit();
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

