import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    template: `
                <div class="wrapper">
                    <!-- load all components here -->
                    <router-outlet></router-outlet>
                    <footer-bar></footer-bar>
                    <alert></alert>
                    <overlay></overlay>
                </div>
               `
})
export class AppComponent {

    constructor() { }

}
