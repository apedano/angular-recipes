import { IdEntity } from "./model/id-entity.model";
import { GenericHttpBasedService } from "./generic.service";
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, Observable, Observer } from "rxjs";


export abstract class GenericFormComponent<T extends IdEntity> {

    protected entity!: T;
    protected loading: boolean = true;
    protected entityForm!: FormGroup;

    private createAndStoreObserver: Partial<Observer<any>> = {
        next: () => {
            this.router.navigate(this.getRedirectUrlAfterSave());
        },
        error: err => {
            console.log(err);
        }
    }

    constructor(private genericService: GenericHttpBasedService<T>, private router: Router) { }

    initEntity(currentRoute: ActivatedRoute) {
        currentRoute.params
            .subscribe(
                (updatedParams: Params) => {
                    if (updatedParams['id']) {
                        let id = updatedParams['id'];
                        this.genericService.getById(id).subscribe(entity => {
                            this.entity = entity;
                            this.onEntityLoaded();
                        });
                    } else {
                        this.entity = this.emptyEntity();
                        this.onEntityLoaded();
                    }
                }
            );
    }

    private onEntityLoaded(): void {
        this.initEntityForm()
            .pipe(first()) //unsibsribe automatically after the first observed value
            .subscribe((form: FormGroup) => {
                console.log('form received', form);
                this.entityForm = form;
                this.loading = false;
            });

    }

    protected abstract emptyEntity(): T;

    protected abstract initEntityForm(): Observable<FormGroup>;

    protected onSubmit() {
        this.mapFormToEntity();
        console.log('entityForm', this.entityForm);
        this.genericService.createOrUpdate(this.entity).subscribe(this.createAndStoreObserver);
    }

    protected mapFormToEntity(): void {
        // this.entity = this.
    };

    protected abstract getRedirectUrlAfterSave(): any[];


}