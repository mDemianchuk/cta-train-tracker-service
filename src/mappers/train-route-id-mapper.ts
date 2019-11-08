import {TrainRouteId} from "../models/train-route-id";

export class TrainRouteIdMapper {
    private constructor() {
    }

    static toShortRouteId(routeId: string): string {
        if (routeId === TrainRouteId.ORANGE) {
            return TrainRouteId.ORANGE_SHORT;
        }
        if (routeId === TrainRouteId.PINK) {
            return TrainRouteId.PINK_SHORT;
        }
        return routeId;
    }

    static toRouteId(shortRouteId: string): string {
        if (shortRouteId === TrainRouteId.ORANGE_SHORT) {
            return TrainRouteId.ORANGE;
        }
        if (shortRouteId === TrainRouteId.PINK_SHORT) {
            return TrainRouteId.PINK;
        }
        return shortRouteId;
    }
}