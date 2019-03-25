import { Injectable }                                                                 from '@angular/core';
import { Snotify, SnotifyPosition, SnotifyService, SnotifyToast, SnotifyToastConfig } from 'ng-snotify';
import { Observable }                                                                 from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public defaultConfig = {
    style           : 'material',
    timeout         : 3000,
    position        : SnotifyPosition.rightTop,
    progressBar     : true,
    closeClick      : false,
    newTop          : true,
    filterDuplicates: false,
    backdrop        : -1,
    dockMax         : 8,
    blockMax        : 6,
    pauseHover      : true,
    titleMaxLength  : 15,
    bodyMaxLength   : 200,
  };

  constructor(private snotifyService: SnotifyService) {
  }

  onSuccess(msg: string, customConfig?:{}): SnotifyToast {
    const conf ={
      ...this.defaultConfig,
      ...customConfig
    };
    
    return this.snotifyService.success(msg, 'Sucesso', conf);
  }

  onError(msg: string, configCustom?:{}): SnotifyToast {
    const conf ={
      ...this.defaultConfig,
      ...configCustom
    };
    return this.snotifyService.error(msg, 'Erro', conf);
  }

  onWarning(msg: string, customConfig?: {}): SnotifyToast {
    const conf = {
      ...this.defaultConfig,
      ...customConfig
    };
    return this.snotifyService.warning(msg, 'Atenção', conf);
  }

  onInfo(msg: string): SnotifyToast {
    return this.snotifyService.info(msg, 'Alerta', this.defaultConfig);
  }

  onErrorDefault(){
    return this.snotifyService.error('Houve um erro interno, entre em contato com o administrador','Erro', this.defaultConfig)
  }

  confirm(msg: string, customConfig?: {}): SnotifyToast {
    const conf = {
      ...this.defaultConfig,
      ...customConfig
    };
    return this.snotifyService.confirm(msg, 'Confirmação', conf);
  }

  async(body: string, title: string, action: Promise<Snotify> | Observable<Snotify>, customConfig?: SnotifyToastConfig) {
    const conf = {
      ...this.defaultConfig,
      ...customConfig
    };
    this.snotifyService.async(body, title, action, conf);
  }

  closeToast(toast: SnotifyToast) {
    this.snotifyService.remove(toast.id);
  }
}
