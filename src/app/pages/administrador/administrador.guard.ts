import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresGuard implements CanActivate {
  constructor(private router: Router, private toast: ToastrService, private afAuth:AngularFireAuth){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean> {
      const user: any | null = await this.afAuth.currentUser;
    if(user != null){
      const tipo = user.displayName;
      if(tipo == "Administrador"){
      return true;
      }else{
        this.toast.error("No tiene permisos para acceder a esta sección", "Error");
        this.router.navigate(['/home']);
        return false;
      }
    }
    else{
      this.toast.error("Debe loguearse para poder acceder", "Error");
      this.router.navigate(['/bienvenida']);
      return false;
    }
  }

}
