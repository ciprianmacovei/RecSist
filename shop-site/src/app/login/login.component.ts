import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = false;


  constructor(private router: Router,
    private authentificationService: AuthenticationService,
    private tostr: ToastrService) { }

  ngOnInit() {
    sessionStorage.clear();
  }

  login(email, password) {

    this.authentificationService.login(email, password)
      .then(result => {
        console.log('cacacacacaca', result);
        if (result === true) {
          //location.reload();
          this.router.navigate(['home']);
          this.tostr.success('You have been loged in successfuly','Login In');
        }
        else {
          this.error = true;
          // this.loading = false;
        }
      }).catch(err => {
        console.log("dasdasdasasda");
        this.error = true;
        // this.loading = false;
        console.log(err);
      })
  }

}
