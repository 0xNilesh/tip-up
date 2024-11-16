// src/wallet/entities/wallet.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryColumn()
  pregenIdentifier: string;

  @Column()
  identifierType: string;

  @Column()
  identifier: string;

  @Column()
  walletId: string;

  @Column()
  walletAddress: string;

  @Column()
  userShare: string;

  @Column({ default: false })
  isClaimed: boolean;

  @Column({ default: null })
  chainPreference: string;

  @Column({ default: null })
  tokenPreference: string;
}
