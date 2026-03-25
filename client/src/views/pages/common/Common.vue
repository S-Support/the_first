<script setup>
import { RouterLink, RouterView } from 'vue-router';

import counselForm from '@/components/counsel/CounselForm.vue';
import priorityForm from '@/components/priority/PriorityForm.vue';
import planForm from '@/components/plan/PlanForm.vue';
import resultForm from '@/components/result/ResultForm.vue';
import { ref } from 'vue';

const value1 = { name: '상담기록' };
const dropdownValues = ref([
    { name: '상담기록', code: 'A', component: counselForm },
    { name: '우선순위', code: 'B', component: priorityForm },
    { name: '지원계획', code: 'C', component: planForm },
    { name: '지원결과', code: 'D', component: resultForm }
]);

const targetInfo = ref({
    beneficiaries_name: '김민수',
    guardian_name: '김보호',
    priority_name: '긴급',
    gender_name: '남',
    birth: '2001.01.01',
    disability_type: '발달장애',
    manager_no: null,
    sub_manager_no: null
});


function applySelection() {
    selectedComponent = dropdownValue.value?.component;
}

const dropdownValue = ref(null);
console.log(dropdownValue);
</script>

<template>
    <div class="flex flex-col md:flex-row gap-8 mt-6 h-screen">
        <div class="md:w-2/4">
            <div class="h-9/10">
                <div class="font-semibold text-xl mb-4">지원자 정보</div>
                <div class="bg-gray-50 dark:bg-surface-950 px-6 md:px-12 lg:px-20 py-5 text-center">
                    <div class="flex flex-col gap-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">지원자</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">{{ targetInfo.beneficiaries_name }}</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">보호자</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">{{ targetInfo.guardian_name }}</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">우선순위</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">{{ targetInfo.priority_name }}</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">성별</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">{{ targetInfo.gender_name }}</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">생년월일</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">{{ targetInfo.birth }}</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">장애유형</span>
                                </div>
                            </div>
                            <div class="w-full rounded-md p-4">
                                <div class="flex flex-col gap-1">
                                    <span class="text-surface-900 dark:text-surface-0 text-lg font-medium leading-tight">{{ targetInfo.disability_type }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <Tabs value="0">
                    <TabList>
                        <Tab value="0"><RouterLink :to="{ name: 'counselCheck' }">상담기록</RouterLink></Tab>
                        <Tab value="1"><RouterLink :to="{ name: 'priorityCheck' }">우선순위</RouterLink></Tab>
                        <Tab value="2"><RouterLink :to="{ name: 'planCheck' }">지원계획</RouterLink> </Tab>
                        <Tab value="3"><RouterLink :to="{ name: 'resultCheck' }">지원결과</RouterLink> </Tab>
                    </TabList>
                </Tabs>

                <RouterView />
            </div>
        </div>
        <div class="md:w-2/4">
            <div class="h-9/10">
                <Select v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="폼 선택하기" />
                <Button label="확인" />
                <component :is="dropdownValue?.component" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
