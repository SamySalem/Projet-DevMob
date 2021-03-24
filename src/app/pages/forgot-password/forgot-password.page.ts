import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public recoverPassword: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private toastController: ToastController) {
    this.recoverPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  async resetPassword() {
    if (this.recoverPassword.valid) {
      try {
        const user = await this.auth.resetPassword(this.recoverPassword.get('email').value)
        const toast = await this.toastController.create({
          color: 'success',
          duration: 5000,
          message: `An email containing a link to reset the password has been sent to  ${user}`
        });
        await toast.present();
      } catch (e) {
        const toast = await this.toastController.create({
          color: 'danger',
          duration: 2000,
          message: e.message
        });
        await toast.present();
      }
    }

  }

}
