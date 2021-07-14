import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/services/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password=''
  private confirmPassword ='';
  private errMessage = '';
  imgPath = '../../assets/imgs/icon.png';
  constructor(private authService: UserService,
    public router: Router) { }

  ngOnInit(): void {
  }

  async LogIn(){
    this.authService.Login(this.email, this.password)
    .subscribe(
      (obj) => {
        if(this.CheckToken(obj)){
          
          this.getAndStoreToken(obj);
          const navigationExtras: NavigationExtras = {
            queryParams: {
              token: JSON.stringify(obj)
            }
          }; 
          this.router.navigate(['restaurants'],navigationExtras);
        }else{
          this.errMessage = 'Username or Password incorect';
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
  getAndStoreToken(token:any){
    localStorage.setItem('lg-token', JSON.stringify(token));
    localStorage.setItem('localRated', JSON.stringify(token._user.MobileNumber));
  }

}
