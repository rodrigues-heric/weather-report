import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  /* v8 ignore next */
  createdAt: Date;

  @Column('jsonb', { nullable: true })
  favoriteCity: Record<string, any> | null;
}
