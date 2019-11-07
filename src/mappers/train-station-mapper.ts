import {CtaMapper} from "./cta-mapper";
import {TrainStation} from "../models/train-station";
import {TrainRouteProvider} from "../utils/train-route-provider";

export class TrainStationMapper implements CtaMapper<TrainStation> {

    map(json: { [key: string]: any }): TrainStation | undefined {
        let trainStation;
        if (this.isValid(json)) {
            let routes: string[] = TrainRouteProvider.getRouteIds()
                .filter((routeShortId: string) => json.hasOwnProperty(routeShortId) && json[routeShortId])
                .map((routeShortId: string) => TrainRouteProvider.getRoute(routeShortId))
                .filter((route: string | undefined) => route)
                .map((route: string) => route);
            trainStation = new TrainStation(json['map_id'], json['station_name'], routes);
        }
        return trainStation;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('map_id')
            && json.hasOwnProperty('station_name')
            && TrainRouteProvider.containsRoutes(json);
    }
}