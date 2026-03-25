<script setup>
import { CustomerService } from '@/service/CustomerService';
import { onBeforeMount, reactive, ref } from 'vue';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const user_no = userStore.user_no;

const customers1 = ref(null);

onBeforeMount(() => {
    CustomerService.getCustomersLarge().then((data) => {
        customers1.value = data;
    });

    const findAllList = async () => {
        let list = await fetch(`/api/list/${user_no}`)
            .then((resp) => resp.json())
            .catch((err) => console.log(err));
        users.value = list;
    };
});
</script>

<template>
    <div class="flex flex-col md:flex-row gap-8 mt-6 h-screen">
        <div class="md:w-1/7">
            <div class="h-9/10">
                <div class="font-semibold text-xl mb-4">상세검색</div>
            </div>
        </div>
        <div class="md:w-6/7">
            <div class="h-9/10">
                <div class="card">
                    <div class="font-semibold text-xl mb-4">지원신청내역</div>
                    <DataTable :value="customers1" :paginator="true" :rows="5" dataKey="id" :rowHover="true" :loading="loading1" showGridlines>
                        <!-- 못찾았을떄 -->
                        <template #empty> No customers found. </template>
                        <!-- 로딩중일떄 -->
                        <template #loading> Loading customers data. Please wait. </template>
                        <Column header="지원자명" style="min-width: 8rem">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <span>{{ data.country.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="보호자명" style="min-width: 8rem">
                            <template #body="{ data }">
                                {{ data.name }}
                            </template>
                        </Column>
                        <Column header="지원신청일" style="min-width: 10rem">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <span>{{ data.country.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="지원신청서" style="min-width: 8rem">
                            <template #body="{ data }">
                                <Button type="submit" label="보기" v-on:click="" />
                            </template>
                        </Column>
                        <Column header="담당자" style="min-width: 8rem">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <span>{{ data.country.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="상담내역" style="min-width: 8rem">
                            <template #body="{ data }">
                                <Button type="submit" label="보기" v-on:click="" />
                            </template>
                        </Column>
                        <Column header="우선순위" style="min-width: 8rem">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <span>{{ data.country.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="계획/결과 진행" style="min-width: 8rem">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <span>{{ data.country.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column header="지원계획" style="min-width: 8rem">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <Button type="submit" label="보기" v-on:click="" />
                                </div>
                            </template>
                        </Column>
                        <Column header="지원결과" style="min-width: 8rem">
                            <template #body="{ data }">
                                <div class="flex items-center gap-2">
                                    <Button type="submit" label="보기" v-on:click="" />
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
