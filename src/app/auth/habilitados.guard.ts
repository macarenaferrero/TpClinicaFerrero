import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilitadosGuard implements CanActivate {
  constructor(private router: Router, private toast: ToastrService, private afAuth:AngularFireAuth){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean>  {
      const user: any | null = await this.afAuth.currentUser;
      if(user != null){
        return true;
      }else{
        this.toast.error("Debe loguearse para acceder a esta sección", "Error",{timeOut: 500});
        this.router.navigate(['/bienvenidx']);
        return false;
      }
  }

}
