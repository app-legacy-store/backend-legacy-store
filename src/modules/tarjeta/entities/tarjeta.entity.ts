import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tarjetas')
export class Tarjeta {
   
   @PrimaryGeneratedColumn('uuid')
   id: string

   @Column('text', { nullable: true, name: 'nombre_tarjeta', })
   nombreTarjeta: string;

   @Column('text', { nullable: true, name: 'numero_tarjeta'})
   numeroTarjeta: string;

   @Column('text', { nullable: true, name: 'fecha_vencimiento'})
   fechaVencimiento: string;

   @Column('int', { nullable: true })
   cvc: number;

   @ManyToOne(
      () => User,
      user => user.tarjetas
   )
   user: User;

}
