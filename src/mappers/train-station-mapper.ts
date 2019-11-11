import {CtaMapper} from "./cta-mapper";
import {TrainStation} from "../models/train-station";
import {TrainRouteId} from "../models/train-route-id";
import {TrainRouteIdMapper} from "./train-route-id-mapper";
import {TrainRouteProvider} from "../utils/train-route-provider";
import {TrainRouteShortId} from "../models/train-route-short-id";

export class TrainStationMapper implements CtaMapper<TrainStation> {

    map(json: { [key: string]: any }): TrainStation | undefined {
        let trainStation;
        if (this.isValid(json)) {
            let routeIdList: string[] = TrainRouteProvider.getRouteIdList()
                .map((routeId: string) => TrainRouteIdMapper.toShortRouteId(routeId))
                .filter((routeShortId: string) => json.hasOwnProperty(routeShortId) && json[routeShortId])
                .map((routeShortId: string) => TrainRouteIdMapper.toRouteId(routeShortId));
            trainStation = new TrainStation(json['map_id'], json['station_name'], routeIdList);
        }
        return trainStation;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('map_id')
            && json.hasOwnProperty('station_name')
            && json.hasOwnProperty(TrainRouteId.RED)
            && json.hasOwnProperty(TrainRouteId.BLUE)
            && json.hasOwnProperty(TrainRouteId.GREEN)
            && json.hasOwnProperty(TrainRouteId.BROWN)
            && json.hasOwnProperty(TrainRouteId.PURPLE)
            && json.hasOwnProperty(TrainRouteId.YELLOW)
            && json.hasOwnProperty(TrainRouteShortId.PINK)
            && json.hasOwnProperty(TrainRouteShortId.ORANGE);
    }
}