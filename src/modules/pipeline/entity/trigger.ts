import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pi_trigger')
export class TriggerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', comment: '用户id' })
  userId: number;

  @Column({ name: 'type', comment: '类型' })
  type: number;

  @Column({ name: 'pipeline_id', comment: '流水线' })
  pipelineId: number;

  @Column({ comment: '备注', length: 100, nullable: true })
  remark: string;

  @Column({ comment: '状态', length: 100, nullable: true })
  status;

  @Column({ comment: '定时', length: 100, nullable: true })
  cron;

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
