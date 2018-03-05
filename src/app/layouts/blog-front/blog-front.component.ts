import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-blog-front',
  templateUrl: './blog-front.component.html',
  styleUrls: ['./blog-front.component.css']
})
export class BlogFrontComponent implements OnInit {

  public guest: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.isLoggedIn().subscribe(loggedIn => {
      this.guest = !loggedIn
    });
  }

  logout () {
    this.accountService.logout()
  }
}
