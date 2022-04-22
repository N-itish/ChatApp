import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  oktaUsers:string[] = ['Nitish','Nit','Plan'];
  filteredUsers:string[]=[];
  constructor() { }

  ngOnInit(): void {
  }

  filterUsers(searchedString: Event){
    let userSearched  = (<HTMLInputElement>searchedString.target).value;
    if(userSearched.length > 0){
      this.filteredUsers = this.oktaUsers.filter(user => user.toLowerCase().includes(userSearched.toLowerCase()));
    }else{
      this.filteredUsers.length = 0;
    }
  }

}
