import {ApiKeyProvider} from "../utils/api-key-provider";
import {FetchHelper} from "../utils/fetch-helper";
import {ResponseProcessor} from "../utils/response-processor";
import {TrainPrediction} from "../models/train-prediction";
import {TrainPredictionMapper} from "../mappers/train-prediction-mapper";

export class TrainPredictionClient {
    private readonly apiKey: string;
    private readonly baseUrl: URL;

    constructor() {
        this.apiKey = ApiKeyProvider.getApiKey();
        this.baseUrl = new URL('http://lapi.transitchicago.com/api/1.0/');
    }

    async getPredictionsForStation(routeId: string, stationId: string): Promise<TrainPrediction[]> {
        const url = new URL('ttarrivals.aspx', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('outputType', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('mapid', stationId);
        return this.getPredictions(url);
    }

    async getPredictionsForStop(routeId: string, stopId: string): Promise<TrainPrediction[]> {
        const url = new URL('ttarrivals.aspx', this.baseUrl);
        url.searchParams.set('key', this.apiKey);
        url.searchParams.set('outputType', 'json');
        url.searchParams.set('rt', routeId);
        url.searchParams.set('stpid', stopId);
        return this.getPredictions(url);
    }

    private async getPredictions(url: URL): Promise<TrainPrediction[]> {
        return FetchHelper.fetch(url)
            .then((json: { [key: string]: any }) => {
                return ResponseProcessor.process(json, new TrainPredictionMapper(), 'ctatt', 'eta')
            });
    }
}