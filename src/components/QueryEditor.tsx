import defaults from 'lodash/defaults';

import React, { PureComponent, ChangeEvent } from 'react';
import { LegacyForms, InlineFormLabel, SegmentAsync, Select, Input } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../DataSource';
import { defaultQuery, EPICSDataSourceOptions, EPICSQuery } from '../types';

type Props = QueryEditorProps<DataSource, EPICSQuery, EPICSDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
    onSystemChange = (item: any) => {
        const { onChange, query } = this.props;

        // Repopulate the keyword list based on the service selected
        onChange({ ...query, system: item.value });
    };

    onChannelChange = (item: any) => {
        const { query, onRunQuery, onChange } = this.props;

        if (!item.value) {
            return; // ignore delete
        }

        query.channel = item.value;
        query.queryText = query.channel;
        onChange({ ...query, channel: item.value });
        onRunQuery();
    };

    unitConversionOptions = [
        { label: '(none)', value: 0 },
        { label: 'degrees to radians', value: 1 },
        { label: 'radians to degrees', value: 2 },
        { label: 'radians to arcseconds', value: 3 },
        { label: 'Kelvin to Celcius', value: 4 },
        { label: 'Celcius to Kelvin', value: 5 },
        { label: 'Farenheight to Celcius', value: 6 },
        { label: 'Celcius to Farenheight', value: 7 },
        { label: 'meters/second to miles/hour', value: 8 },
        { label: 'miles/hour to meters/second', value: 9 },
    ];

    onUnitConversionChange = (item: any) => {
        const { onChange, query, onRunQuery } = this.props;
        onChange({ ...query, unitConversion: item.value });
        onRunQuery();
    };

    transformOptions = [
        { label: '(none)', value: 0 },
        { label: '1st derivative (no rounding)', value: 1 },
        { label: '1st derivative (1Hz rounding)', value: 2 },
        { label: '1st derivative (10Hz rounding)', value: 3 },
        { label: '1st derivative (100Hz rounding)', value: 4 },
        { label: 'delta', value: 5 },
        { label: 'truncate fractional seconds', value: 6 },
    ];

    onTransformChange = (item: any) => {
        const { onChange, query, onRunQuery } = this.props;
        onChange({ ...query, transform: item.value });
        onRunQuery();
    };

    toggleDisableBinning = (event?: React.SyntheticEvent<HTMLInputElement>) => {
        const { query, onChange, onRunQuery } = this.props;
        onChange({
            ...query,
            disablebinning: !query.disablebinning,
        });
        onRunQuery();
    };

    onTimeOffsetChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { onChange, query, onRunQuery } = this.props;

        //alert(event.target.value);
        onChange({ ...query, timeoffset: event.target.value });
        onRunQuery();
    };

    render() {
        const datasource = this.props.datasource;
        const query = defaults(this.props.query, defaultQuery);

        // noinspection CheckTagEmptyBody
        return (
            <>
                <div className="gf-form-inline">
                    <InlineFormLabel width={10} className="query-system" tooltip={<p>Optional: filter by system.</p>}>
                        Channel name filter
                    </InlineFormLabel>
                    <SegmentAsync
                        loadOptions={() => datasource.getSystems()}
                        placeholder="(none)"
                        value={query.system}
                        allowCustomValue={false}
                        onChange={this.onSystemChange}
                    ></SegmentAsync>
                </div>
                <div className="gf-form-inline" style={{ marginTop: 8 }}>
                    <InlineFormLabel width={10} className="query-channels" tooltip={<p>Select an EPICS channel.</p>}>
                        Channel selection
                    </InlineFormLabel>
                    <SegmentAsync
                        loadOptions={() => datasource.getChannels(query.system)}
                        placeholder="(select a channel)"
                        value={query.channel}
                        allowCustomValue={false}
                        onChange={this.onChannelChange}
                    ></SegmentAsync>
                </div>
                <div className="gf-form-inline" style={{ marginTop: 8 }}>
                    <InlineFormLabel width={10} className="convert-units" tooltip={<p>Convert units.</p>}>
                        Units conversion
                    </InlineFormLabel>
                    <Select
                        width={30}
                        menuPlacement="bottom"
                        placeholder={'(none)'}
                        defaultValue={0}
                        options={this.unitConversionOptions}
                        value={query.unitConversion}
                        allowCustomValue={false}
                        onChange={this.onUnitConversionChange}
                    />
                </div>
                <div className="gf-form-inline" style={{ marginTop: 8 }}>
                    <InlineFormLabel width={10} className="transform" tooltip={<p>Transform data.</p>}>
                        Transform
                    </InlineFormLabel>
                    <Select
                        width={30}
                        menuPlacement="bottom"
                        placeholder={'(none)'}
                        defaultValue={0}
                        options={this.transformOptions}
                        value={query.transform}
                        allowCustomValue={false}
                        onChange={this.onTransformChange}
                    />
                </div>
                <div className="gf-form-inline" style={{ marginTop: 8 }}>
                    <LegacyForms.Switch
                        label="Disable binning"
                        labelClass={'width-10'}
                        tooltip="Forces the archiver query to return every data point without binning"
                        checked={query.disablebinning === true}
                        onChange={this.toggleDisableBinning}
                    />
                </div>
                <div className="gf-form-group">
                    <div className="gf-form-inline">
                        <div className="gf-form">
                            <InlineFormLabel className="set-timeoffset" tooltip="Adds a time offset, in seconds, to the Time field.">
                                Time offset (s)
                            </InlineFormLabel>
                            <div className="width-10">
                                <Input
                                    className="width-10"
                                    placeholder="0"
                                    value={query.timeoffset}
                                    onChange={this.onTimeOffsetChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
