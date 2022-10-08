import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 部署
 */
@Entity('cd_deploy')
export class DeployEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', comment: '用户id' })
  userId: number;

  @Column({ comment: '部署流程名称', length: 100, nullable: true })
  name: string;

  @Column({ comment: '任务列表', length: 2048, nullable: true })
  tasks: string;

  @Column({ comment: '当前上下文参数', length: 2048, nullable: true })
  context: string;

  /**
   * 证书
   */
  @Column({ name: 'cert_id', comment: '证书' })
  certId: number;

  @Column({
    name: 'last_history_id',
    comment: '最后一次执行id',
    nullable: true,
  })
  lastHistoryId: number;

  @Column({
    name: 'last_success_id',
    comment: '最后一次成功id',
    nullable: true,
  })
  lastSuccessId: number;

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
