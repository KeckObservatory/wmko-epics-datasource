import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

export interface EPICSQuery extends DataQuery {
    queryText: string;
    system: string;
    channel: string;
    unitConversion: number;
    transform: number;
    disablebinning: boolean;
    alignt0: boolean;
    timeoffset: string;
}

export const defaultQuery: Partial<EPICSQuery> = {
    unitConversion: 0,
    transform: 0,
    disablebinning: false,
    alignt0: true,
};
//  timeoffset: '',

/**
 * These are options configured for each DataSource instance
 */
export interface EPICSDataSourceOptions extends DataSourceJsonData {
    server: string;
    managePort: string;
    dataPort: string;
}
