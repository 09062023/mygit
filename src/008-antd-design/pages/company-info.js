import React from "react";
import EChartsReact from "echarts-for-react";

const CompanyInfo = () => {
  const color = ["#90BCDE", "#A451F1", "#635BC1", "#2B62B1", "#3B478D"];
  const data = [
    {
      name: "业务",
      value: 0.12,
    },
    {
      name: "人事",
      value: 0.18,
    },
    {
      name: "it",
      value: 0.44,
    },
    {
      name: "测试",
      value: 0.16,
    },
    {
      name: "后勤",
      value: 0.1,
    },
  ];

  const seriesForBg = {
    type: "bar",
    name: "bg",
    barCategoryGap: "50%",
    animation: false,
    data: data.map((d) => {
      return {
        name: d.name,
        value: 1,
        itemStyle: {
          color: "rgba(27,36,62,0.5)",
        },
      };
    }),
    coordinateSystem: "polar",
    slient: true,
    center: ["65%", "50%"],
  };

  const seriesForData = {
    type: "bar",
    name: "value",
    barGap: "-100%",
    barCategoryGap: "50%",
    data: data.map((d, i) => {
      return {
        name: d.name,
        value: d.value,
        itemStyle: {
          color: color[i],
        },
      };
    }),
    coordinateSystem: "polar",
    slient: true,
    center: ["65%", "50%"],
  };
  const option = {
    backgroundColor: "#ffffff",
    angleAxis: {
      max: 1,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      splitArea: {
        show: true,
      },
    },
    radiusAxis: {
      type: "category",
      data: data.map((d) => {
        return d.name + "," + d.value * 100 + "%";
      }),
      z: 10,
      axisLine: {
        show: false,
      },
      axisTick: {
        length: 290,
        alignWithLabel: true,
        lineStyle: {
          type: "solid",
        },
      },
      axisLabel: {
        show: true,
        showMinLabel: true,
        showMaxLabel: true,
        interval: 0,
        align: "center",
        margin: 400,
        padding: 4,
        width: 100,
        fontSize: 10,
        borderWidth: 1,
        formatter: (value) => {
          const v = value.split(",");
          return "{c|" + v[1] + "} {b|" + v[0] + "}{r|}{a|}";
        },
        rich: {
          a: {
            width: 9,
            height: 10,
            backgroundColor: "#1F3E79",
            border: 1,
          },
          r: {
            width: 1,
            height: 10,
            backgroundColor: "#1F3E79",
          },
          b: {
            color: "#58B7DE",
            borderColor: "#1F3E79",
            borderWidth: 1,
            width: 160,
            height: 40,
            lineHeight: 20,
            align: "center",
            fontSize: 20,
            fontFamily: "Microsoft Yahei",
          },
          c: {
            color: "#97ADBA",
            fontSize: 32,
            verticalAlign: "bottom",
          },
        },
      },
      splitLine: {
        show: false,
        interval: 0,
      },
      splitArea: {
        show: false,
        alignWithLabel: true,
        interval: 0,
        areaStyle: {
          color: ["rgba(0,0,0,0.3)", "rgba(255,255,255,0.3)"],
        },
      },
    },
    polar: {
      center: ["65%", "50%"],
    },
    series: [seriesForBg, seriesForData],
  };
  return (
    <>
      <EChartsReact
        option={option}
        style={{ height: "500px", width: "800px" }}
      />
    </>
  );
};

export default CompanyInfo;
