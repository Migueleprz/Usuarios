import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../Core/services/usuario.service";
import {AlertService} from "../../Core/services/alert.service";
import {CiudadService} from "../../Core/services/ciudad.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fgUsuario!:FormGroup;
  ciudades: any[] =[];
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ciudadService: CiudadService,
    private fbUsuario: FormBuilder,
    private alert : AlertService
  ) { }

  private settingForm(): void {
    this.fgUsuario = this.fbUsuario.group({
      tipo_documento:['', Validators.required],
      numero_documento:['', Validators.required],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      fecha_nacimiento:['', Validators.required],
      ciudad_id:[1, Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
    });
  }

  async getCiudades(): Promise<any> {
    this.ciudades = await this.ciudadService.findAll();
  }

  limpiar(): void{
    this.fgUsuario.setValue({
      id: '',
      tipo_documento:'',
      numero_documento:'',
      nombre:'',
      apellido:'',
      fecha_nacimiento:'',
      ciudad_id:'',
      email:'',
      password:'',
    })
  }

  async save(): Promise<any> {
    await this.usuarioService.saveUsuario(this.fgUsuario.value);
    await this.alert.alertMensaje('usuario registrado','success');
    await this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.settingForm();
    this.getCiudades();
  }

}
