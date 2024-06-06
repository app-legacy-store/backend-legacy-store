import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('banners')
export class Banner {
   
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column('text',{ nullable: false })
   nombre: string;

   @Column('text', { nullable: false })
   imagen: string;

   @Column('text', { nullable: false })
   descripcion: string;

}
