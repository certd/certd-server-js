import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pi_history')
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', comment: '用户id' })
  userId: number;

  @Column({ name: 'title', comment: '标题' })
  title: number;

  @Column({ name: 'pipeline_id', comment: '流水线' })
  pipelineId: number;

  @Column({ comment: '历史内容', length: 40960, nullable: true })
  content: string;

  @Column({ comment: '状态', length: 100, nullable: true })
  status: string;

  @Column({
    name: 'end_time',
    comment: '结束时间',
  })
  endTime: Date;

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
