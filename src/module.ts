import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './DataSource';
import { ConfigEditor } from 'components/ConfigEditor';
import { QueryEditor } from 'components/QueryEditor';
import { EPICSQuery, EPICSDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, EPICSQuery, EPICSDataSourceOptions>(DataSource)
    .setConfigEditor(ConfigEditor)
    .setQueryEditor(QueryEditor);



