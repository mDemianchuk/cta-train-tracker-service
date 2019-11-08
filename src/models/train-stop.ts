export class TrainStop {
    readonly id: string;
    readonly name: string;
    readonly stationId: string;
    readonly stationName: string;
    readonly routeIdList: string[];
    oppositeDirectionStopId: string | null;

    constructor(id: string, name: string, stationId: string, stationName: string, routeIdList: string[]) {
        this.id = id;
        this.name = name;
        this.stationId = stationId;
        this.stationName = stationName;
        this.routeIdList = routeIdList;
        this.oppositeDirectionStopId = null;
    }
}