import { HistoryResult } from '@certd/pipeline/src';
import { HistoryEntity } from '../history';

export class HistoryDetail {
  historyId: number;
  pipelineId: number;
  status: {
    [key: string]: {
      result: HistoryResult;
      logs: string[];
    };
  };

  constructor(history: HistoryEntity) {
    this.pipelineId = history.pipelineId;
    this.historyId = history.id;

    const results = JSON.parse(history.results);
    const logs = JSON.parse(history.logs);
    for (const id in results) {
      const currentStatus = this.status[id];
      if (currentStatus == null) {
        this.status[id] = {
          logs: logs[id],
          result: results[id],
        };
      }
    }
  }
}
