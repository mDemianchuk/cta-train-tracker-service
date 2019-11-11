export class TrainStation {
    readonly id: string;
    readonly name: string;
    readonly routeIdList: string[];

    constructor(id: string, name: string, routeIdList: string[]) {
        this.id = id;
        this.name = name;
        this.routeIdList = routeIdList;
    }
}