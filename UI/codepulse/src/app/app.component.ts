import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';

import { NavbarComponent } from "./core/components/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent,RouterLink]
})
export class AppComponent {
  title = 'codepulse';
}
