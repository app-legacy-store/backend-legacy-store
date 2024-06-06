import { Direccion } from "src/modules/direccion/entities/direccion.entity";
import { Pedido } from "src/modules/pedidos/entities/pedido.entity";
import { Tarjeta } from "src/modules/tarjeta/entities/tarjeta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
   
   @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre:string;

    @Column ('text', { name:'apellido_paterno', nullable: false })
    apellidoPaterno: string;

    @Column('text', { name:'apellido_materno', nullable: false})
    apellidoMaterno: string;

    @Column('text', { unique: true,  name:'gmail', nullable: false })
    email: string;

    @Column('text', { name:'password', nullable: false })
    password: string;

    @Column({default: false})
    terminos: boolean;
    
    @OneToMany(
        () => Direccion, 
        direccion => direccion.user
    )
    direcciones?: Direccion[]
        
    @OneToMany(
        () => Pedido, 
        pedido => pedido.user
    )
    pedido?: Pedido[];

    @OneToMany(
        () => Tarjeta,
        tarjeta => tarjeta.user
    )
    tarjetas?: Tarjeta[];
}
