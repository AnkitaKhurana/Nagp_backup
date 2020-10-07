import express from 'express';
import { OrderRoute } from './Routes/order.route';
import bodyParser  from 'body-parser';
const app = express();
const port = 8081; // default port to listen


let router = new OrderRoute();
let orderRouter = router.router;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use('/order', orderRouter);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );