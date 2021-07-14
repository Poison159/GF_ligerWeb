import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/services/userService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email ='';
  public name ='';
  public password ='';
  public confirmPassword='';
  private errMessage='';
  imgPath = '../assets/imgs/icon.png';
  constructor(private authService: UserService,
    public router: Router) { }

  ngOnInit(): void {
  }

  
  Register() {
    if (this.email && this.password && this.confirmPassword) {
      if (this.password.trim().toLocaleLowerCase() === this.confirmPassword.trim().toLocaleLowerCase()) {
        this.registerUser(this.name,this.email, this.password);
      }else{
        alert("Passwords do not match");
      }
    }
  }
  async registerUser(name:string,email:string,password:string){
  
    this.authService.registerUser(name,email,null,password)
    .subscribe(
      (obj) => {
        if (this.CheckToken(obj)) {
          localStorage.setItem('lg-token', JSON.stringify(obj));
          localStorage.setItem('localRated',JSON.stringify( obj._user.MobileNumber));
          const navigationExtras: NavigationExtras = {
            queryParams: {
              token: JSON.stringify(obj)
            }
          };
          this.router.navigate(['restaurants'], navigationExtras);
        } else {
          
          alert(obj.Errors[0]);
        }
    },
      (err: any) => {
        console.log(err);
        this.errMessage = 'Server not found';
        
      },
      () => {
        console.log('Registration done!');
        
      }
    );
  }

  CheckToken(token: any) {
    if(token.Errors)
      return false;
    else
      return true
  }

}
