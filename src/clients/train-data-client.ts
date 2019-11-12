import {FetchHelper} from "../utils/fetch-helper";
import {TrainStation} from "../models/train-station";
import {TrainStationMapper} from "../mappers/train-station-mapper";
import {TrainStopMapper} from "../mappers/train-stop-mapper";
import {TrainStop} from "../models/train-stop";
import {TrainRouteIdMapper} from "../mappers/train-route-id-mapper";
import {TrainRoute} from "../models/train-route";
import {TrainRouteProvider} from "../utils/train-route-provider";

export class TrainDataClient {
    private readonly baseUrl: URL;
    private trainDataCache: object[];

    constructor() {
        this.baseUrl = new URL('https://data.cityofchicago.org/resource/8pix-ypme.json');
        this.trainDataCache = [];
    }

    async getRoutes(): Promise<TrainRoute[]> {
        return new Promise(resolve => resolve(TrainRouteProvider.getRoutes()));
    }

    async getStations(routeShortId: string): Promise<TrainStation[]> {
        return this.getTrainData()
            .then((response: object[]) => {
                let stationMap: Map<string, TrainStation> = new Map();
                let mapper: TrainStationMapper = new TrainStationMapper();
                response.map((json: { [key: string]: string }) => mapper.map(json))
                    .filter((station: TrainStation | undefined) => station && this.isValidRoute(station.routeIdList, routeShortId))
                    .forEach((station: TrainStation) => stationMap.set(station.id, station));
                return Array.from(stationMap.values());
            });
    }

    async getStops(routeShortId: string, stationId: string): Promise<TrainStop[]> {
        return this.getTrainData()
            .then((response: object[]) => {
                let mapper: TrainStopMapper = new TrainStopMapper();
                return response.map((json: { [key: string]: string }) => mapper.map(json))
                    .filter((stop: TrainStop | undefined) => stop && this.isValidStation(stop, routeShortId, stationId))
                    .map((stop: TrainStop) => stop);
            });
    }

    private async getTrainData(): Promise<object[]> {
        if (this.trainDataCache.length > 0) {
            return this.trainDataCache;
        }
        return FetchHelper.fetch<object[]>(this.baseUrl)
            .then((trainData: object[]) => {
                this.trainDataCache = trainData;
                return trainData;
            });
    }

    private isValidRoute(routeIdList: string[], routeShortId: string): boolean {
        let routeId: string = TrainRouteIdMapper.toRouteId(routeShortId);
        return routeIdList.includes(routeId);
    }

    private isValidStation(stop: TrainStop, routeShortId: string, stationId: string): boolean {
        return stop.stationId === stationId
            && this.isValidRoute(stop.routeIdList, routeShortId);
    }
}