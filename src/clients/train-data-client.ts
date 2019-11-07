import {FetchHelper} from "../utils/fetch-helper";
import {TrainStation} from "../models/train-station";
import {TrainStationMapper} from "../mappers/train-station-mapper";
import {TrainRouteProvider} from "../utils/train-route-provider";

export class TrainDataClient {
    private readonly baseUrl: URL;

    constructor() {
        this.baseUrl = new URL('https://data.cityofchicago.org/resource/8pix-ypme.json');
    }

    async getStations(routeShortId: string): Promise<TrainStation[]> {
        return this.getTrainData()
            .then((response: object[]) => {
                let stationMap: Map<string, TrainStation> = new Map();
                let mapper: TrainStationMapper = new TrainStationMapper();
                response.map((json: { [key: string]: string }) => mapper.map(json))
                    .filter((station: TrainStation | undefined) => station && this.isValidRoute(station, routeShortId))
                    .forEach((station: TrainStation) => stationMap.set(station.id, station));
                return Array.from(stationMap.values());
            });
    }

    private async getTrainData(): Promise<object[]> {
        return FetchHelper.fetch<object[]>(this.baseUrl);
    }

    private isValidRoute(station: TrainStation, routeShortId: string): boolean {
        let routeId: string | undefined = TrainRouteProvider.getRoute(routeShortId);
        return routeId ? station.routeIdList.includes(routeId) : false;
    }
}