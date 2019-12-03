import {CtaMapper} from "./cta-mapper";
import {TrainPrediction} from "../models/train-prediction";
import {TimeHelper} from "../utils/time-helper";

export class TrainPredictionMapper implements CtaMapper<TrainPrediction> {

    map(json: { [key: string]: any }): TrainPrediction | undefined {
        let prediction;
        if (this.isValid(json)) {
            let routeId = (json['rt'] as string).toLowerCase();
            const arrivalTime: number = TimeHelper.getTimestamp(json['arrT']);
            const predictionTime: number = TimeHelper.getTimestamp(json['prdt']);
            prediction = new TrainPrediction(
                json['rn'],
                json['stpId'],
                json['staNm'],
                routeId,
                json['stpDe'],
                json['destNm'],
                arrivalTime,
                predictionTime
            );
        }
        return prediction;
    }

    isValid(json: { [key: string]: any }): boolean {
        return json.hasOwnProperty('rn')
            && json.hasOwnProperty('stpId')
            && json.hasOwnProperty('staNm')
            && json.hasOwnProperty('rt')
            && json.hasOwnProperty('stpDe')
            && json.hasOwnProperty('destNm')
            && json.hasOwnProperty('arrT')
            && json.hasOwnProperty('prdt')
    }
}