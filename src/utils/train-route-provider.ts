import {TrainRoute} from "../models/train-route";
import {TrainRouteId} from "../models/train-route-id";

export class TrainRouteProvider {
    private static readonly ROUTE_MAP: Map<string, TrainRoute> = new Map();

    private constructor() {
    }

    static getRoute(routeId: string): TrainRoute | undefined {
        if (!TrainRouteProvider.isInitialized()) {
            TrainRouteProvider.initializeRoutes();
        }
        return TrainRouteProvider.ROUTE_MAP.get(routeId);
    }

    static getRoutes(): TrainRoute[] {
        if (!TrainRouteProvider.isInitialized()) {
            TrainRouteProvider.initializeRoutes();
        }
        return Array.from(TrainRouteProvider.ROUTE_MAP.values());
    }

    private static initializeRoutes(): void {
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.RED, new TrainRoute(TrainRouteId.RED, 'Red Line'));
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.BLUE, new TrainRoute(TrainRouteId.BLUE, 'Blue Line'));
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.BROWN, new TrainRoute(TrainRouteId.BROWN, 'Brown Line'));
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.GREEN, new TrainRoute(TrainRouteId.GREEN, 'Green Line'));
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.ORANGE, new TrainRoute(TrainRouteId.ORANGE, 'Orange Line'));
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.PURPLE, new TrainRoute(TrainRouteId.PURPLE, 'Purple Line'));
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.PINK, new TrainRoute(TrainRouteId.PINK, 'Pink Line'));
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.YELLOW, new TrainRoute(TrainRouteId.YELLOW, 'Yellow Line'));
    }

    private static isInitialized(): boolean {
        return TrainRouteProvider.ROUTE_MAP.size > 0;
    }
}