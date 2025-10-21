import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasContextWrapper {
    public context: CanvasRenderingContext2D | undefined 
}