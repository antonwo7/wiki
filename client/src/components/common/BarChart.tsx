import React, {FC, useMemo} from 'react';
import Chart from 'react-apexcharts';
import {ApexOptions} from "apexcharts";
import IView from "../../types/view";
import {useAppSelector} from "../../store/hooks";

type TConvertedData = {
    labels: string[],
    count: number[]
}

const BarChart = () => {

    const values: IView[] = useAppSelector(state => state.search.views)

    const data = useMemo(() => {
        return values.reduce((accum, cur) => {
            accum.labels.push(cur.date)
            accum.count.push(cur.count)
            return accum;
        }, {labels: [], count: []} as TConvertedData)
    }, [values])

    const state  = {
        series: [{
            name: 'Views',
            data: data.count
        }],
        options: {
            legend: {
                show: false
            },
            chart: {
                height: 300,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    barHeight: '100%',
                    distributed: true,
                    horizontal: false,
                }
            },
            grid: {
                show: false,
                margin: {
                    top: 0,
                    bottom: 0,
                },
                padding: {
                    top: 0,
                    bottom: 0,
                },
            },
            colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
                '#f48024', '#69d2e7'
            ],
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: data.labels,
                labels: {
                    rotateAlways: true,
                    rotate: -45
                }
            },
            yaxis: {
                labels: {
                    show: false
                }
            },

        } as ApexOptions,
    };

    if (!values.length) {
        return <></>;
    }

    return (
        <section className="py-[40px]" style={{background: 'rgba(0, 0, 0, 0.04)'}}>
            <div className="container">
                <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl text-center">
                    <mark className="px-2 py-1 text-white bg-[#546E7A] rounded">Page view stats</mark>
                </h2>
                <Chart options={state.options} series={state.series} type="bar" height={380} />
            </div>
        </section>
    );
};

export default BarChart;