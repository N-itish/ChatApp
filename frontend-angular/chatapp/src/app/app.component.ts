import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit{
  title = 'chatapp';

  public ngOnInit():void{
  }
}
