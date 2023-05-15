import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router      = inject(Router);


  private namePattern: string = '(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})'

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })


  register(){
    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password)
    .subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (errorMessage) => {
        Swal.fire('Error', errorMessage, 'error')
      }
    })
  }

}
