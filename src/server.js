const mongoose = require('mongoose');
const app = require('./app')
const config = require('./config/config')
const logger = require('./config/logger');

//LISTEN
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('⚡️ Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`⚡️ Server is running at http://localhost:${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
