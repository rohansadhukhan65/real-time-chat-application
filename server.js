import express from 'express'
const app = express();
import http from 'http'
import https from 'https'
import { Server } from 'socket.io'
import cors from 'cors';
import path from 'path';


// cors setup .....
const corsOptions = {
     origin: 'http://127.0.0.1:5500',
     optionsSuccessStatus: 200
};
app.use(cors());

// IO server setup .....
const server = http.createServer(app);
const io = new Server(server);


// Setup view engine .....
import ejs from 'ejs';
app.set('view engine', 'ejs');
ejs.open = '{{';
ejs.close = '}}';




// user json .....
const users = {}

io.on('connection', (socket) => {
     console.log('a user connected');

     // listen when client hit a new user joined the chat event in this port .....
     socket.on('new-user-joined', name => {
          users[socket.id] = name;
          
          // as name suggest it will bropadcast emit to all  users .....
          socket.broadcast.emit('user-joined',name)
     })

     // fire when someone send the messege .....
     socket.on('send', messege => {
          socket.broadcast.emit('recive',{messege : messege, name : users[socket.id]})
     })
});


// serving chat front-end .....
app.get('/', (req, res) => {
     res.render('index');
})




// static folder's .....
const __dirname = path.resolve()
app.use('/assets', express.static(path.join(__dirname, '/assets')))




server.listen(3000, () => {
     console.log('listening on *:3000');
});