import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('direcciones')
export class Direccion {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text', { nullable: false })
    calle: string;

    @Column('text', { name:'codigo_postal', nullable: false })
    codigoPostal: string;

    @Column('text', { name:'numero_casa', nullable: false })
    numeroCasa: string;

    @Column('text', { nullable: true })
    colonia: string;

    @Column('text', { nullable: true })
    ciudad: string;

    @Column('text', { nullable: true })
    estado: string;
    
    @ManyToOne(
        () => User, 
        user => user.direcciones
    )
    user: User;

}