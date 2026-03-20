<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ElCard } from 'element-plus';
import { useRequest } from '@sa/alova/client';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { useEcharts } from '@/hooks/common/echarts';
import { fetchGetUserList } from '@/service-alova/api';
import { $t } from '@/locales';

defineOptions({ name: 'UserProfile' });

const { loading, data: res } = useRequest(() => fetchGetUserList(), {
  immediate: true
});

const users = computed(() => res.value?.records || []);

const profileData = computed(() => {
  const data = { male: 0, female: 0, enabled: 0, disabled: 0 };

  users.value.forEach(user => {
    if (user.userGender === '1') data.male += 1;
    if (user.userGender === '2') data.female += 1;
    if (user.status === '1') data.enabled += 1;
    if (user.status === '2') data.disabled += 1;
  });

  return data;
});

const hasUpdated = ref(false);

const { domRef: chartRef, updateOptions } = useEcharts(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}人 ({d}%)'
  },
  legend: {
    bottom: '1%',
    left: 'center',
    itemStyle: {
      borderWidth: 0
    }
  },
  series: [
    {
      name: $t('page.manage.user.userProfile'),
      type: 'pie',
      radius: ['35%', '65%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}: {c}'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true
      },
      data: [] as { name: string; value: number; itemStyle?: { color: string } }[]
    }
  ]
}));

function updateChart() {
  if (hasUpdated.value) return;

  updateOptions(opts => {
    opts.series[0].data = [
      { name: $t(userGenderRecord[1]), value: profileData.value.male, itemStyle: { color: '#409EFF' } },
      { name: $t(userGenderRecord[2]), value: profileData.value.female, itemStyle: { color: '#F56C6C' } },
      { name: $t(enableStatusRecord[1]), value: profileData.value.enabled, itemStyle: { color: '#67C23A' } },
      { name: $t(enableStatusRecord[2]), value: profileData.value.disabled, itemStyle: { color: '#E6A23C' } }
    ];
    hasUpdated.value = true;
    return opts;
  });
}

watch(
  res,
  () => {
    if (res.value) {
      updateChart();
      setTimeout(updateChart, 800);
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="user-profile">
    <ElCard v-loading="loading" :header="$t('page.manage.user.userProfile')">
      <div ref="chartRef" class="chart-container"></div>
    </ElCard>
  </div>
</template>

<style scoped>
.user-profile {
  padding: 16px;
}

.chart-container {
  width: 100%;
  height: 400px;
}
</style>
