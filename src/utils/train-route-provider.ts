import {TrainRouteId} from "../models/train-route-id";

export class TrainRouteProvider {
    private static readonly ROUTE_MAP: Map<string, string> = new Map();

    private constructor() {
    }

    static getRoutes(): string[] {
        if (!TrainRouteProvider.isInitialized()) {
            TrainRouteProvider.initializeRoutes();
        }
        return Array.from(TrainRouteProvider.ROUTE_MAP.values());
    }

    static getRoute(routeId: string): string | undefined {
        if (!TrainRouteProvider.isInitialized()) {
            TrainRouteProvider.initializeRoutes();
        }
        return TrainRouteProvider.ROUTE_MAP.get(routeId);
    }

    static getRouteIds(): string[] {
        return Object.values(TrainRouteId);
    }

    static containsRoutes(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty(TrainRouteId.RED)
            && json.hasOwnProperty(TrainRouteId.BLUE)
            && json.hasOwnProperty(TrainRouteId.GREEN)
            && json.hasOwnProperty(TrainRouteId.BROWN)
            && json.hasOwnProperty(TrainRouteId.PURPLE)
            && json.hasOwnProperty(TrainRouteId.YELLOW)
            && json.hasOwnProperty(TrainRouteId.PINK_SHORT)
            && json.hasOwnProperty(TrainRouteId.ORANGE_SHORT);
    }

    private static initializeRoutes(): void {
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.RED, TrainRouteId.RED);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.BLUE, TrainRouteId.BLUE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.BROWN, TrainRouteId.BROWN);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.GREEN, TrainRouteId.GREEN);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.ORANGE, TrainRouteId.ORANGE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.ORANGE_SHORT, TrainRouteId.ORANGE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.PURPLE, TrainRouteId.PURPLE);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.PINK, TrainRouteId.PINK);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.PINK_SHORT, TrainRouteId.PINK);
        TrainRouteProvider.ROUTE_MAP.set(TrainRouteId.YELLOW, TrainRouteId.YELLOW);
    }

    private static isInitialized(): boolean {
        return TrainRouteProvider.ROUTE_MAP.size > 0;
    }
}