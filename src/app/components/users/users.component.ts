import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Person } from 'src/app/models/person';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[] = [];
  showModal:boolean = false;
  form:UntypedFormGroup;

  action:number = 0;
  userSelected:User;

  constructor(private service:UserService, private fb:FormBuilder, private msg:NzMessageService){
    this.buildForm();
  }
  ngOnInit(): void {
    this.getUsers();
  }

  buildForm(){
    this.form = this.fb.group({
      dni:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern(/^[0-9]+$/)]],
      firstName:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(30),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      lastName:[null,[Validators.required,  Validators.minLength(3), Validators.maxLength(30),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      username:[null,[Validators.required,  Validators.minLength(3), Validators.maxLength(100)]],
      password:[null,[Validators.required,  Validators.minLength(3), Validators.maxLength(30)]],
      email:[null,[Validators.minLength(7),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      telephone:[null,[Validators.minLength(7),Validators.maxLength(10),Validators.pattern(/^[0-9]+$/)]],
    })
  }

  getUsers(){
    this.service.getAllUsers().subscribe({
      next:(response)=>{
        this.users = response;
      }
    })
  }

  openAdd(){
    this.showModal = true;
    this.action = 1;
    this.form.reset();
  }

  editUser(user:User){
    this.userSelected = user;
    this.action = 2; 
    this.form.get('password').setValue(user.password);
    this.form.get('username').setValue(user.username);
    this.form.get('firstName').setValue(user.person?.firstName);
    this.form.get('lastName').setValue(user.person?.lastName);
    this.form.get('dni').setValue(user.person?.dni);
    this.form.get('email').setValue(user.person?.email);
    this.form.get('telephone').setValue(user.person?.phone);
    this.showModal = true;
  }

  close(){
    this.showModal = false;
  }

  Ok(){
    if(!this.form.valid){
      this.msg.warning('Ingrese la información correcta');
      return;
    }

    let person:Person={
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      dni: this.form.get('dni').value,
      email: this.form.get('email').value,
      phone: this.form.get('telephone').value,
    }
    let user:User = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
      person:person
    }

    if(this.action == 1){
      this.service.addUser(user).subscribe({
        next:()=>{
          this.msg.success('Agregado correctamente');
          this.getUsers();
          this.showModal = false;
        }
      })
    }else if(this.action == 2){
      user.userId = this.userSelected.userId;
      user.person.personId = this.userSelected.person.personId;
      this.service.updateUser(user).subscribe({
        next:()=>{
          this.msg.success('Actualizado correctamente');
          this.getUsers();
          this.showModal = false;
        }
      })
    }
  }

  deleteUser(userId:number){
    this.service.deleteUser(userId).subscribe({
      next:()=>{
        this.getUsers();
      }
    });
  }

}
