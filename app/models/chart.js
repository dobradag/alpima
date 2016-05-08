function ChartOptions(type, yBasis, yLabel){
    this.chart = {
        type: type,
        height: 450,
        margin: {
            top: 20,
            right: 60,
            bottom: 40,
            left: 60
        },
        x: function (d) {
            return d["date"];
        },
        y: function (d) {
            return d[yBasis];
        },
        duration: 100,
        xAxis: {
            axisLabel: "Dates",
            tickFormat: function(d) {
                return d3.time.format("%d/%m/%y")(new Date(d * 86400000));
            },
            showMaxMin: true
        },
        yAxis: {
            axisLabel: yLabel,
            tickFormat: function(d){
                return d3.format('')( yBasis === "volume" ? (d / 1000) : d);
            },
            showMaxMin: false
        },
        zoom: {
            enabled: true,
            scaleExtent: [1, 10],
            useFixedDomain: false,
            useNiceScale: false,
            horizontalOff: false,
            verticalOff: true,
            unzoomEventType: "dblclick.zoom"
        }
    }
}
function ChartData(dataArray, key){
    this.values = dataArray;
    this.key = key;
}
