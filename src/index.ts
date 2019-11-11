import express from "express";
import {TrainTrackerService} from "./service/train-tracker-service";
import {TrainRoute} from "./models/train-route";
import {TrainStation} from "./models/train-station";
import {TrainStop} from "./models/train-stop";
import {TrainPrediction} from "./models/train-prediction";
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './resources/swagger.json'
import * as bodyParser from 'body-parser'

const app = express();
const port = 8080;
const service = new TrainTrackerService();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.redirect('/swagger');
});

app.get("/routes", (req, res) => {
    service.getRoutes()
        .then((routes: TrainRoute[]) => res.send(routes));
});

app.get("/stations", (req, res) => {
    let routeId: string = req.query.rt;
    service.getStations(routeId)
        .then((stations: TrainStation[]) => res.send(stations));
});

app.get("/stops", (req, res) => {
    let routeId: string = req.query.rt;
    let stationId: string = req.query.st;
    service.getStops(routeId, stationId)
        .then((stops: TrainStop[]) => res.send(stops));
});

app.get("/predictions", (req, res) => {
    let routeId: string = req.query.rt;
    let stopId: string = req.query.stp;
    service.getPredicitons(routeId, stopId)
        .then((predictions: TrainPrediction[]) => res.send(predictions));
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});