import React, { Component } from 'react';
import Ajax from '../../utils/ajax';
import { Chart } from '@antv/g2';

export default class CharsComponent extends Component{
    static defaultProps = {
    }
    constructor(props){
        super(props)
    }
    state = {
    }
    componentDidMount() {
       this.loadData();
    }

    renderChart = (renderData) => {
            if (renderData.length > 0) {
                // Step 1: 创建 Chart 对象
            const chart = new Chart({
            container: 'container1', // 指定图表容器 ID
                width: 700, //   指定图表宽度
                height: 300, // 指定图表高度
            });

            // Step 2: 载入数据源
            chart.data(renderData);

            // Step 3: 创建图形语法，绘制柱状图
            chart.interval().position('name*count');

            // Step 4: 渲染图表
            chart.render();
        } else {
            
        }
        
    }
    loadData = () => {
      Ajax.get({
        url: 'http://127.0.0.1:3000/goods/list',
        data: {},
        error: () => {
            this.renderChart([]);
          // window.location.href="#/home";
        },
        success: (res) => {
          if (res.body.code === 200 && res.body.listData && res.body.listData.length) {
              const data = [];
              res.body.listData.forEach(v => {
                  data.push({
                      name: v.userName,
                      count: v.value
                  });
              });
              this.renderChart(data);
            // this.setState({
            //   data: res.body.listData
            // });
          } else {
               this.renderChart([]);
          }
        }
      })
    }
    render(){
        return(
            <div style={{ display: 'flex', flexDirection: 'row', padding: '50px' }}>
                    <div id="container1" style={{ flex: 3}}></div>
                    <div style={{ height:  '300px', backgroundColor: 'pink', flex: 1}}></div>
            </div>
         
        )
    }
}
