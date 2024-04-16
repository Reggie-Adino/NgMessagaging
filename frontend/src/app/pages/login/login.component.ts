import { CUSTOM_ELEMENTS_SCHEMA, Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../shared/card/card.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent,ReactiveFormsModule,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private toastrService: ToastrService, private fb:FormBuilder, private authService: AuthService ) {
   
  }

  loginForm!:FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }


onSubmit() {
  if (this.loginForm.valid) {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next(value) {
        console.log(value)
      }
    })
  } else {
    this.loginForm.markAllAsTouched(); 
  }
}


  openToast() {
      this.toastrService.error('Working')
  }

}
