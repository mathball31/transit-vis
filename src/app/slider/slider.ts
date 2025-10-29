import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from "@angular/material/slider";


@Component({
  selector: 'tv-slider',
  imports: [MatSliderModule, FormsModule],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class Slider {
    public name = input("name")
    public modelValue = model<number>(50)
    public min = input(0)
    public max = input(100)
    public step = input(1)
    public valueChange = output<number>()

    protected inputChange() {
        this.valueChange.emit(this.modelValue())
    }
}
