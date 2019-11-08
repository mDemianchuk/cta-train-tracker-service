import {TrainRoute} from "./train-route";

export class TrainStop {
    readonly id: string;
    readonly name: string;
    readonly stationId: string;
    readonly stationName: string;
    readonly routes: TrainRoute[];
    oppositeDirectionStopId: string | null;

    constructor(id: string, name: string, stationId: string, stationName: string, routes: TrainRoute[]) {
        this.id = id;
        this.name = name;
        this.stationId = stationId;
        this.stationName = stationName;
        this.routes = routes;
        this.oppositeDirectionStopId = null;
    }
}