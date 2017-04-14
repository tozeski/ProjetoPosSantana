import { Injectable } from '@angular/core'
import { Body, DELETE, POST, PUT, GET, Produces, Path, BaseUrl, RESTClient, DefaultHeaders } from 'ng2-http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
@BaseUrl('http://192.168.0.6:3000/carros')

export class CarroService extends RESTClient {

    constructor(public http: Http) { super(http) }
    
    static itens: Carro[] = [];
    
    @GET('/')
    @Produces<Carro[]>()
    get(): Observable<Carro[]> { return null; }

    @DELETE('/{id}')
    remove( @Path('id') id: number): Observable<any> { return null; }

    @POST('/')
    @Produces<Carro>()
    add( @Body tarefa: Carro): Observable<Carro> { return null; }

    @PUT('/{id}')
    @Produces<Carro>()
    update( @Path('id') id: number, @Body tarefa: Carro): Observable<Carro> { return null; }

    getItens() {
        return CarroService.itens;
    }
}

export interface Carro {
    id?           : number;
    foto?         : string;
    title         : string;
    status        : boolean;
    last_location : string;
}