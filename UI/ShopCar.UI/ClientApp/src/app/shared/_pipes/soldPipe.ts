import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:"sold"
})
export class SoldPipe implements PipeTransform{
    transform(sold :boolean){
        return sold ? "Sim" : "Não"
    }
}