<template>
  <div class="new-order">
    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>

<script>
  /**
   * @description 首页
   * @author: higuaifan
   * @date 2019/12/3 10:17 上午
   * @version V1.0.0
   *
   * 公司的业务千篇一律，复杂的代码好几百行
   */

  export default {
    name: 'Index',
    async created() {
      const response = await this.qGet('/api/echarts');
      const { data, edges } = response.data.datas;
      this.drawLine(data, edges);
    },
    methods: {
      drawLine(data, edges) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('myChart'));
        myChart.setOption({
          title: { text: '字段关联图' },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'force',
              data,
              edges,
              force: {
                repulsion: 150,
                edgeLength: [50, 105],
                gravity: 0.01
              },
              roam: true,
              focusNodeAdjacency: true,
              draggable: true,
              emphasis: {
                label: {
                  position: 'right',
                  show: true
                }
              },
              lineStyle: {
                width: 0.5,
                curveness: 0.3,
                opacity: 0.7
              }
            }
          ]
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
