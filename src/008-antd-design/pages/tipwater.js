import React from "react";
import EChartsReact from "echarts-for-react";

const Tipwater = () => {
  const option = {
    backgroundColor: "#03213D",
    animation: true, // 控制动画是否开启
    animationDuration: 1000, // 动画的时长, 它是以毫秒为单位
    // animationDuration: function (arg) {
    //   return 1000 * arg;
    // },
    animationEasing: "bounceOut", //linear 缓动动画
    animationThreshold: 8, // 动画元素的阈值
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, 0)",
      textStyle: {
        color: "#FFF",
      },
      // axisPointer: {
      // 	type: "shadow",
      // 	label: {
      // 		show: true,
      // 	},
      // },
    },
    grid: {
      left: "10%",
      top: "18%",
      right: "5%",
      bottom: "25%",
    },
    legend: {
      top: "4%",
      left: "75%",
      itemWidth: 13,
      itemHeight: 13,
      itemStyle: {
        color: "#18A4FF",
      },
      icon: "rect",
      padding: 0,
      textStyle: {
        color: "#c0c3cd",
        fontSize: 13,
        padding: [2, 0, 0, 0],
      },
    },
    xAxis: {
      data: ["员工1", "员工2", "员工3", "员工4", "员工5", "员工6"],

      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#163a5f",
          width: 2,
        },
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#BDD8FB", //X轴文字颜色
          fontSize: 12,
        },
        interval: 0,
        formatter: function (value) {
          var ret = ""; //拼接加\n返回的类目项
          var maxLength = 4; //每项显示文字个数
          var valLength = value.length; //X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于5,
            for (var i = 0; i < rowN; i++) {
              var temp = ""; //每次截取的字符串
              var start = i * maxLength; //开始截取的位置
              var end = start + maxLength; //结束截取的位置
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + "\n";
              ret += temp; //凭借最终的字符串
            }
            return ret;
          } else {
            return value;
          }
        },
      },
    },
    yAxis: [
      {
        type: "value",
        // name: "单位：ml",
        nameTextStyle: {
          color: "#BDD8FB",
          fontSize: 12,
        },

        splitLine: {
          show: false,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.15)",
            type: "dashed", // dotted 虚线
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false, //隐藏X轴轴线
          lineStyle: {
            color: "#163a5f",
            width: 1,
          },
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: "#BDD8FB",
            fontSize: 12,
          },
        },
      },
      {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#BDD8FB",
          fontSize: 12,
        },
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "#CED2DB",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false, //隐藏X轴轴线
          lineStyle: {
            color: "#163a5f",
            width: 2,
          },
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: "#797A7F",
            fontSize: 12,
          },
        },
      },
    ],
    series: [
      {
        name: "绩效工资",
        type: "bar",
        barWidth: 15,
        itemStyle: {
          color: function (params) {
            if (params.value < 100) {
              return {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0.05,
                    color: "#ffffff", // 0% 处的颜色
                  },
                  {
                    offset: 0.1,
                    color: "#ff0000",
                  },
                  {
                    offset: 1,
                    color: "transparent", // 100% 处的颜色
                  },
                ],
              };
            } else {
              return {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0.01,
                    color: "#ffffff", // 0% 处的颜色
                  },
                  {
                    offset: 0.1,
                    color: "#13D5FC",
                  },
                  {
                    offset: 1,
                    color: "transparent", // 100% 处的颜色
                  },
                ],
              };
            }
          },
          barBorderRadius: [20, 20, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          distance: 0,
          color: "#1ACDDC",
          formatter: "{c}",
        },
        data: [300, 1000, 900, 200, 0, 134],
      },
      {
        // name: '背景',
        type: "bar",
        barWidth: "15px",
        xAxisIndex: 0,
        yAxisIndex: 1,
        barGap: "-100%",
        data: [100, 100, 100, 100, 100, 100], //背景阴影长度
        itemStyle: {
          normal: {
            color: "rgba(255,255,255,0.01)",
            barBorderRadius: [0, 0, 0, 0],
            borderColor: "rgb(33,156,251)",
          },
        },
        tooltip: {
          show: false,
        },
        zlevel: 9,
      },
    ],
  };
  //   option.timeTicket = setInterval(function () {
  //     // 获取当前数据的索引
  //     //   var currentIndex = option.series[0].data.length - 1;
  //     // 将当前数据移动到数组末尾
  //     option.series[0].data.push(option.series[0].data.shift());
  //     option.xAxis.data.push(option.xAxis.data.shift());
  //     // 更新图表
  //     myChart.setOption(option);
  //   }, 1000);

  return (
    <div>
      <EChartsReact
        option={option}
        style={{ height: "750px", width: "1400px" }}
      />
    </div>
  );
};

export default Tipwater;
