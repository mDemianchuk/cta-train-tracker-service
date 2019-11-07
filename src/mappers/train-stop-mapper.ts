import {CtaMapper} from "./cta-mapper";
import {TrainStop} from "../models/train-stop";
import {TrainRouteProvider} from "../utils/train-route-provider";

export class TrainStopMapper implements CtaMapper<TrainStop> {

    map(json: { [key: string]: any }): TrainStop | undefined {
        let trainStop;
        if (this.isValid(json)) {
            let routes: string[] = TrainRouteProvider.getRouteIds()
                .filter((routeShortId: string) => json.hasOwnProperty(routeShortId) && json[routeShortId])
                .map((routeShortId: string) => TrainRouteProvider.getRoute(routeShortId))
                .filter((route: string | undefined) => route)
                .map((route: string) => route);
            trainStop = new TrainStop(json['stop_id'], json['stop_name'], json['map_id'], json['station_name'], routes);
        }
        return trainStop;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('stop_id')
            && json.hasOwnProperty('stop_name')
            && json.hasOwnProperty('map_id')
            && json.hasOwnProperty('station_name')
            && TrainRouteProvider.containsRoutes(json);
    }
}