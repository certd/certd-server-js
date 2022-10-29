import { Pipeline } from '@certd/pipeline/src';
import { HistoryEntity } from '../history';

export class HistoryDetail {
  historyId: number;
  pipelineId: number;
  pipeline: Pipeline;

  constructor(history: HistoryEntity) {
    this.pipelineId = history.pipelineId;
    this.historyId = history.id;

    const pipeline = JSON.parse(history.pipeline);
    this.pipeline = pipeline;
  }
}
