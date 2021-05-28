import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SotatekService {
    public model: Subject<any> = new Subject<any>();
}
