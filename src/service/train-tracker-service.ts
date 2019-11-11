import {TrainPredictionClient} from "../clients/train-prediction-client";
import {TrainDataClient} from "../clients/train-data-client";
import {TrainRoute} from "../models/train-route";
import {TrainStation} from "../models/train-station";
import {TrainStop} from "../models/train-stop";
import {TrainRouteIdMapper} from "../mappers/train-route-id-mapper";
import {TrainPrediction} from "../models/train-prediction";

export class TrainTrackerService {
    private readonly dataClient: TrainDataClient;
    private readonly predictionClient: TrainPredictionClient;
    private routeListCache: TrainRoute[];
    // <route id, train stations>
    private readonly stationMapCache: Map<string, TrainStation[]>;
    // <route id, Map <station id, train stops>>
    private readonly stopMapCache: Map<string, Map<string, TrainStop[]>>;
    // <stop id, opposite direction stop id>
    private readonly oppositeDirectionStopIdMapCache: Map<string, string>;

    constructor() {
        this.dataClient = new TrainDataClient();
        this.predictionClient = new TrainPredictionClient();
        this.routeListCache = [];
        this.stationMapCache = new Map<string, TrainStation[]>();
        this.stopMapCache = new Map<string, Map<string, TrainStop[]>>();
        this.oppositeDirectionStopIdMapCache = new Map<string, string>();
    }

    async getRoutes(): Promise<TrainRoute[]> {
        let cachedRoutes: TrainRoute[] = this.routeListCache;
        if (cachedRoutes.length > 0) {
            return cachedRoutes;
        }
        return this.dataClient.getRoutes()
            .then((routes: TrainRoute[]) => {
                this.routeListCache = routes;
                return routes;
            });
    }

    async getStations(routeId: string): Promise<TrainStation[]> {
        let cachedStations: TrainStation[] | undefined = this.stationMapCache.get(routeId);
        if (cachedStations && cachedStations.length > 0) {
            return cachedStations;
        }
        let routeShortId = TrainRouteIdMapper.toShortRouteId(routeId);
        return this.dataClient.getStations(routeShortId)
            .then((stations: TrainStation[]) => {
                this.stationMapCache.set(routeId, stations);
                return stations;
            });
    }

    async getStops(routeId: string, stationId: string): Promise<TrainStop[]> {
        let cachedStopMap: Map<string, TrainStop[]> | undefined = this.stopMapCache.get(routeId);
        if (cachedStopMap) {
            let cachedStops: TrainStop[] | undefined = cachedStopMap.get(stationId);
            if (cachedStops && cachedStops.length > 0) {
                return cachedStops;
            }
        }
        let routeShortId = TrainRouteIdMapper.toShortRouteId(routeId);
        return this.dataClient.getStops(routeShortId, stationId)
            .then((stops: TrainStop[]) => {
                if (stops.length == 2) {
                    stops[0].oppositeDirectionStopId = stops[1].id;
                    stops[1].oppositeDirectionStopId = stops[0].id;
                    stops.forEach((stop: TrainStop) => {
                        this.oppositeDirectionStopIdMapCache.set(stop.id, (stop.oppositeDirectionStopId as string))
                    });
                }
                this.stopMapCache.set(routeId, new Map<string, TrainStop[]>([[stationId, stops]]));
                return stops;
            });
    }

    async getPredicitons(routeId: string, stopId: string): Promise<TrainPrediction[]> {
        return this.predictionClient.getPredictionsForStop(routeId, stopId)
            .then((predictions: TrainPrediction[]) => {
                predictions.forEach((prediction: TrainPrediction) => {
                    let oppositeDirectionStopId: string | undefined = this.oppositeDirectionStopIdMapCache.get(prediction.stopId);
                    if (oppositeDirectionStopId) {
                        prediction.oppositeDirectionStopId = oppositeDirectionStopId;
                    }
                });
                return predictions;
            });
    }
}