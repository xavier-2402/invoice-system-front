import { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexXAxis } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
    options: ApexPlotOptions;
    stroke:ApexStroke;
    labels:any;
    responsive: ApexResponsive[];
}
