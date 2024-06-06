// import { Direccion } from "src/modules/direccion/entities/direccion.entity";
// import { Pedido } from "src/modules/pedidos/entities/pedido.entity";
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// @Entity('usuarios')
// export class Usuario {

//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column({ length:100, nullable: false })
//     nombre:string;

//     @Column({ length:100,  name:'apellido_paterno', nullable: false })
//     apellidoPaterno: string;

//     @Column({ length:100,  name:'apellido_materno', nullable: false})
//     apellidoMaterno: string;

//     @Column({ unique: true, length:100,  name:'gmail', nullable: false })
//     email: string;

//     @Column({ length:100,  name:'password', nullable: false })
//     password: string;

//     @Column({default: false})
//     terminos: boolean;

//     @OneToMany(() => Direccion, direccion => direccion.user)
//     direcciones: Direccion[];

//     @OneToMany(() => Pedido, pedido => pedido.usuario)
//     pedido: Pedido[];

// }
