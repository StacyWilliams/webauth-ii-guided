const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  name: 'chocochip', //sid
  secret: process.env.SESSION_SECRET || ' keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 , // in milliseconds
    secure: false, //true means only send cookie over https
    httpOnly: true, //true means JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: false, //GDPR laws against setting cookies automatically 
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
