import { PipelineEntity } from '../pipeline';
import { HistoryEntity } from '../history';

export class PipelineDetail {
  pipeline: PipelineEntity;
  constructor(pipeline: PipelineEntity) {
    this.pipeline = pipeline;
  }

  last: HistoryEntity;
}
