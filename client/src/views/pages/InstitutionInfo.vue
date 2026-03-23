<script setup>
import { ref, onBeforeMount } from 'vue';
const activeTab = ref('0');
const institution = ref(null);

// 기관정보 조회
const findAllInfo = async () => {
    let info = await fetch(`http://localhost:3000/institutioninfo`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
    institution.value = info;
};

// 기관정보 수정
const UpdateInstitutionInfo = async () => {
    let data = {
        name: institution.value.name,
        tel: institution.value.tel,
        institution_tel: institution.value.institution_tel,
        institution_address: institution.value.institution_address,
        institution_email: institution.value.institution_email,
        operation: institution.value.operation
    };
    let result = await fetch('http://localhost:3000/institutioninfo', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    result.status;
};

onBeforeMount(() => {
    findAllInfo();
});
</script>

<template>
    <div class="w-full">
        <div class="w-full">
            <div class="card">
                <Tabs v-model:value="activeTab">
                    <TabList>
                        <Tab value="0">내 정보</Tab>
                        <Tab value="1">기관정보</Tab>
                    </TabList>
                </Tabs>

                <div v-if="activeTab === '1' && institution" class="mt-4">
                    <div class="font-semibold text-xl mb-4">기관정보</div>
                    <DataTable
                        :value="[
                            { label: '기관', value: institution.name },
                            { label: '사업자번호', value: institution.tel },
                            { label: '대표번호', value: institution.institution_tel },
                            { label: '주소', value: institution.institution_address },
                            { label: '이메일', value: institution.institution_email },
                            { label: '운영여부', value: institution.operation === 1 ? '여' : '부' }
                        ]"
                    >
                        <Column field="label" header="" class="w-3xs"></Column>
                        <Column field="value" header=""></Column>
                    </DataTable>
                </div>

                <div v-else-if="activeTab === '1'" class="mt-4">로딩중...</div>

                <div class="flex justify-end mt-4">
                    <Button label="수정" @click="UpdateInstitutionInfo"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
