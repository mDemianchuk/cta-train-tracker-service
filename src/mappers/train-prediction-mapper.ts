import {CtaMapper} from "./cta-mapper";
import {TrainPrediction} from "../models/train-prediction";

export class TrainPredictionMapper implements CtaMapper<TrainPrediction> {

    map(json: { [key: string]: any }): TrainPrediction | undefined {
        let prediction;
        if (this.isValid(json)) {
            let routeId = (json['rt'] as string).toLowerCase();
            prediction = new TrainPrediction(
                json['rn'],
                json['stpId'],
                json['staNm'],
                routeId,
                json['stpDe'],
                json['destNm'],
                json['arrT'],
                json['prdt']
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