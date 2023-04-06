import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
@Injectable({providedIn:'root'})
export class AlertService{
    constructor(private alertController: AlertController,private alert:ToastController){


    }
    async success(message) {
        const toast = await this.alert.create({
          message: message,
          duration: 2500,
          icon: 'checkmark-circle-outline',
          position:'middle',
          color:'success',
          


        });
    
        await toast.present();
      }
      async error(message) {
        const toast = await this.alert.create({
          message: message,
          duration: 2500,
          icon: 'globe',
          position:'middle',
          color:'danger',
          


        });
    
        await toast.present();
      }
      async confirmation(ok: () => void,message) {
        const alert = await this.alertController.create({
          header: message,
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                
              },
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                ok();
              },
            },
          ],
        });
    
        await alert.present();
      }
    
}