import React from 'react'
import { Component } from 'react'
import Chart from 'chart.js'


class DoughnutChart extends Component {
    constructor() {
        super()
        this.chartRef = React.createRef()
    }

    componentDidMount() {

       const nutrientsLabels = this.props.data.map(elm => elm.label).splice(1)
       const nutrientsData = this.props.data.map(elm => elm.quantity).splice(1)

        this.myChart = new Chart(this.chartRef.current, {
            type: 'doughnut',
            data: {
                labels: nutrientsLabels,
                datasets: [{
                    data: nutrientsData,
                    backgroundColor: ["#EF476F", '#FFD166', '#06D6A0']
                }]
            }
        })

        const props= this.props
        
        Chart.pluginService.register({
            beforeDraw: function(chart) {
                let width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;
          
                ctx.restore();
                const fontSize = (height / 150).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
          
                const text = Math.round(props.data[0].quantity),
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2 ;
                ctx.fillText(text, textX, textY);

                const unitFontSize = (height / 200).toFixed(2);
                ctx.font = unitFontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                
                const unitText = props.data[0].unit,
                    unitTextX = Math.round((width - ctx.measureText(text).width) / 2 + 5),
                    unitTextY = height / 2 + 30
                ctx.fillText(unitText, unitTextX, unitTextY)

              ctx.save();
            }
          });
        
        
    }

    render() {
        const nutrientsOnly = this.props.data.map(elm => elm).splice(1)
        return (
            <>
            <h6>Nutrients</h6>
            
            <canvas ref={this.chartRef} />
          
            <ul>
                {nutrientsOnly.map(elm => {
                    return <li>{elm.quantity.toFixed(2)} {elm.unit} {elm.label}</li>
                })}
            </ul>
            </>
        )
    }
}

export default DoughnutChart
