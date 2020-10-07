import express from 'express';
import { CatalogRoute } from './Routes/product.route';
import bodyParser  from 'body-parser';
const app = express();
const port = 8082; // default port to listen


let router = new CatalogRoute();
let orderRouter = router.router;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use('/catalog', orderRouter);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );