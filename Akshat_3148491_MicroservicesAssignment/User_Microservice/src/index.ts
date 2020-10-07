import express from 'express';
import { UserRoute } from './Routes/user.route';
import bodyParser  from 'body-parser';
const app = express();
const port = 8080; // default port to listen


let router = new UserRoute();
let userRouter = router.router;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use('/user', userRouter);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );