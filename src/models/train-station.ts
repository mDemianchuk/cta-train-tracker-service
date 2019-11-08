import {TrainRoute} from "./train-route";

export class TrainStation {
    readonly id: string;
    readonly name: string;
    readonly routes: TrainRoute[];

    constructor(id: string, name: string, routes: TrainRoute[]) {
        this.id = id;
        this.name = name;
        this.routes = routes;
    }
}