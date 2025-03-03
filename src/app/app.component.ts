import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApodComponent } from '../components/apod/apod.component';
import { TabsComponent } from '../components/tabs/tabs.component';

@Component({
  selector: 'app-root',
  imports: [TabsComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
