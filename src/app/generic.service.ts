


import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Predicate } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, Observer, of, OperatorFunction, skip, skipWhile, Subject, Subscription, throwError, UnaryFunction } from "rxjs";
import { IdEntity } from "./model/id-entity.model";

export abstract class GenericHttpBasedService<T extends IdEntity> {

    readonly FIREBASE_BASE_URL: string = 'https://recipes-ffddb-default-rtdb.europe-west1.firebasedatabase.app/';

    public errorSubject: Subject<string> = new Subject();
    private allValuesSubject: BehaviorSubject<T[] | null> = new BehaviorSubject<T[] | null>(null);

    isAllValueSubjectCalledAlready: boolean = false;

    constructor(private httpClient: HttpClient) {
        this.refreshVallValues();
    }

    public createOrUpdate(obj: T): Observable<HttpResponse<{ name: string }>> {
        let response!: Observable<any>;
        if (obj.id) { //update
            let obj_deep_copy = JSON.parse(JSON.stringify(obj));
            obj_deep_copy.id = null;
            response = this.httpClient.patch(this.getApiFullUrl() + '/' + obj.id + '.json', obj_deep_copy);
        } else {
            response = this.httpClient.post<{ name: string; }>(
                this.getApiFullUrl() + '.json',
                obj, { observe: 'response' });
        }

        return response.pipe(map((responseData: HttpResponse<{ name: string; }>) => {
            this.refreshVallValues();
            return responseData;
        }),
            catchError(errorRes => {
                //error handling code goes here
                //here we return the observable sending the error 
                //to the subscribers
                return throwError(() => errorRes);
            }));
    }

    public getById(id: string): Observable<T> {
        return this.getByFilter((t: T) => t.id === id)
            .pipe(
                map(array => {
                    if(array.length == 0 || array == undefined) {
                        //this returns an Observable which unsubscribes when the error is thrown
                        // return throwError(() => new IdEntityNotFoundError(`No element found with ID=${id}`, id)); 
                        throw new IdEntityNotFoundError(`No element found with ID=${id}`, id);
                    }
                    return array[0]
                    }
                ),
            );
    }

    

    public getAll(): Observable<T[]> {
        return this.getByFilter(v => true);
    }


    public delete(entity: T): Observable<any> {
        return this.httpClient.delete(this.getApiFullUrl() + '/' + entity['id'] + '.json')
            .pipe(map(() => {
                this.refreshVallValues();
            }),
                catchError(errorRes => {
                    //error handling code goes here
                    //here we return the observable sending the error 
                    //to the subscribers
                    return throwError(() => errorRes);
                }));
    }

    protected abstract getApiPath(): string;

    protected getApiFullUrl(): string {
        return this.FIREBASE_BASE_URL + this.getApiPath()
    }

    fetchAllSubscription!: Subscription;
    private fetchAllObserver: Partial<Observer<T[]>> = {
        next: allValues => {
            this.allValuesSubject.next(allValues);
            this.isAllValueSubjectCalledAlready = true;
        },
        error: err => {
            const errorInstance = <HttpErrorResponse>err;
            console.log(errorInstance);
        }
    };


    protected refreshVallValues() {
        this.fetchAllSubscription?.unsubscribe();
        this.fetchAllSubscription = this.fetchAll().subscribe(this.fetchAllObserver);
    }

    protected getByFilter(filter: Predicate<T>): Observable<T[]> {
        return this.allValuesSubject.pipe(
            skipWhile((v: any) => v === null),
            map((values: T[]) => values.filter(filter))
        )
    }

    protected fetchAll(): Observable<T[]> {
        console.log('Refreshing onject cache');
        return this.httpClient.get<{ [key: string]: any }>(
            this.getApiFullUrl() + '.json').pipe(
                map((originalResponseData: { [key: string]: any }) => {
                    // console.log('originalResponseData from fethAll call', originalResponseData);
                    const valuesArray: T[] = [];
                    for (const idKey in originalResponseData) {
                        console.log('response data T', originalResponseData[idKey], "for Idkey", idKey);
                        valuesArray.push(this.mapToEntity(idKey, originalResponseData[idKey]))
                    }
                    return valuesArray;
                }),
                catchError(errorRes => {
                    //error handling code goes here
                    //here we return the observable sending the error 
                    //to the subscribers
                    return throwError(() => errorRes);
                })
            );
    }


    protected getAfterFetchFunction(): UnaryFunction<T[], T[]> {
        return (tArray: T[]) => tArray;
    }




    protected abstract mapToEntity(id: string, reponseData: any): T;

    // deleteAll(): Observable<any> {
    //     return this.httpClient.delete(
    //         this.TEAMS_URL,
    //         {
    //             observe: 'events',
    //             responseType: 'json' //'text' - 'blob'
    //         }
    //     ).pipe(
    //         //tap is like pike in streams
    //         //it just executes the code
    //         //whitout altering the returned 
    //         //observable
    //         tap(event => {
    //             console.log(event);
    //             if (event.type === HttpEventType.Sent) {
    //                 console.log('The request has been sent')
    //             }
    //             if (event.type === HttpEventType.Response) {
    //                 console.log('The response has been received')
    //             }
    //         })
    //     );
    // }

}

export class IdEntityNotFoundError extends Error {
    id: string;

    constructor(message: string, id: string) {
        super(message);
        this.id = id;

        Object.setPrototypeOf(this, IdEntityNotFoundError.prototype);
    }

}