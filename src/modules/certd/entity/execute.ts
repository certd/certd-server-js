import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 执行
 */
@Entity('cd_execute')
export class ExecuteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', comment: '用户id' })
  userId: number;

  @Column({ comment: '执行类型', length: 100, nullable: true })
  type: string;

  @Column({ comment: '定时配置', length: 30, nullable: true })
  cron: string;

  /**
   * 证书id
   */
  @Column({ name: 'cert_id', comment: '证书' })
  certId: number;

  @Column({ comment: '备注', length: 100, nullable: true })
  remark: string;

  @Column({
    name: 'create_time',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
  @Column({
    name: 'update_time',
    comment: '修改时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
