import {CtaMapper} from "./cta-mapper";
import {TrainStop} from "../models/train-stop";
import {TrainRouteId} from "../models/train-route-id";
import {TrainRouteIdMapper} from "./train-route-id-mapper";

export class TrainStopMapper implements CtaMapper<TrainStop> {

    map(json: { [key: string]: any }): TrainStop | undefined {
        let trainStop;
        if (this.isValid(json)) {
            let routeIdList: string[] = Object.values(TrainRouteId)
                .filter((routeShortId: string) => json.hasOwnProperty(routeShortId) && json[routeShortId])
                .map((routeShortId: string) => TrainRouteIdMapper.toRouteId(routeShortId));
            trainStop = new TrainStop(json['stop_id'], json['stop_name'], json['map_id'], json['station_name'], routeIdList);
        }
        return trainStop;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('stop_id')
            && json.hasOwnProperty('stop_name')
            && json.hasOwnProperty('map_id')
            && json.hasOwnProperty('station_name')
            && json.hasOwnProperty(TrainRouteId.RED)
            && json.hasOwnProperty(TrainRouteId.BLUE)
            && json.hasOwnProperty(TrainRouteId.GREEN)
            && json.hasOwnProperty(TrainRouteId.BROWN)
            && json.hasOwnProperty(TrainRouteId.PURPLE)
            && json.hasOwnProperty(TrainRouteId.YELLOW)
            && json.hasOwnProperty(TrainRouteId.PINK_SHORT)
            && json.hasOwnProperty(TrainRouteId.ORANGE_SHORT);
    }
}