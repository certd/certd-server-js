import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pi_pipeline')
export class PipelineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', comment: '用户id' })
  userId: number;

  @Column({ name: 'title', comment: '标题' })
  title: number;

  @Column({ comment: '配置', length: 40960 })
  content: string;

  @Column({ comment: '备注', length: 100, nullable: true })
  remark: string;

  @Column({ comment: '状态', length: 100, nullable: true })
  status;

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
