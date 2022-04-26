import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../../Core/services/usuario.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserModel} from "../../Core/Models/UserModel";
import {CiudadModel} from "../../Core/Models/CiudadModel";
import {CiudadService} from "../../Core/services/ciudad.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../Core/services/alert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['tipo_documento','numero_documento','nombre','apellido', 'fecha_nacimiento', 'ciudad', 'email','id'];
  dataSource = new MatTableDataSource<UserModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ciudades: any[] =[];
  fgUsuario!:FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private ciudadService: CiudadService,
    private fbUsuario: FormBuilder,
    private alert : AlertService
  ) { }

  private settingForm(): void {
    this.fgUsuario = this.fbUsuario.group({
      id:[''],
      tipo_documento:['', Validators.required],
      numero_documento:['', Validators.required],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      fecha_nacimiento:['', Validators.required],
      ciudad_id:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
    });
  }

  async getUauarios(): Promise<any> {
    this.dataSource.data = await this.usuarioService.findAll();
  }

  async getCiudades(): Promise<any> {
    this.ciudades = await this.ciudadService.findAll();
  }

  async getUsuario(id:number): Promise<any> {
    const data  = await this.usuarioService.getUsuarios(id);
    console.log(data[0].id)
    this.fgUsuario.setValue({
      id: data[0].id,
      tipo_documento:data[0].tipo_documento,
      numero_documento:data[0].numero_documento,
      nombre:data[0].nombre,
      apellido:data[0].apellido,
      fecha_nacimiento:data[0].fecha_nacimiento,
      ciudad_id:data[0].ciudad_id,
      email:data[0].email,
      password:'',
  })
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

  async update(): Promise<any> {
    await this.usuarioService.updateUsuario(this.fgUsuario.value);
    this.limpiar();
    await this.getUauarios();
  }

  async eliminar(id:number): Promise<any>{
    let resp = await this.alert.alertConfirm('desea eliminar el usuario', 'warning');
    if(resp) {
      await this.usuarioService.deletetUsuario(id);
      await this.alert.alertMensaje('Eliminado','success');
      await this.getUauarios();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getUauarios().then(r => r);
    this.getCiudades().then(r=> r);
    this.settingForm();
  }

}
