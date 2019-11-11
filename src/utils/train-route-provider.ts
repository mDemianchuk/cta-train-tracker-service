import {TrainRouteId} from "../models/train-route-id";

export class TrainRouteProvider {
    private constructor() {
    }

    static getRouteIdList(): string[] {
        return Object.values(TrainRouteId);
    }
}