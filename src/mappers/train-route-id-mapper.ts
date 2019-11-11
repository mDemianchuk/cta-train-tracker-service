import {TrainRouteId} from "../models/train-route-id";
import {TrainRouteShortId} from "../models/train-route-short-id";

export class TrainRouteIdMapper {
    private constructor() {
    }

    static toShortRouteId(routeId: string): string {
        if (routeId === TrainRouteId.ORANGE) {
            return TrainRouteShortId.ORANGE;
        }
        if (routeId === TrainRouteId.PINK) {
            return TrainRouteShortId.PINK;
        }
        return routeId;
    }

    static toRouteId(shortRouteId: string): string {
        if (shortRouteId === TrainRouteShortId.ORANGE) {
            return TrainRouteId.ORANGE;
        }
        if (shortRouteId === TrainRouteShortId.PINK) {
            return TrainRouteId.PINK;
        }
        return shortRouteId;
    }
}