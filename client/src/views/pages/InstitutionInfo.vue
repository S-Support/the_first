<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const institution = ref(null);

onMounted(async () => {
    try {
        const res = await fetch(`http://localhost:3000/institutions/${route.params.id}`);
        const data = await res.json();
        institution.value = data;
    } catch (err) {
        console.error(err);
    }
});
</script>
<template>
    <div>
        <h2>기관 상세 정보</h2>

        <div v-if="institution">
            <p>기관번호: {{ institution.institution_no }}</p>
            <p>기관명: {{ institution.name }}</p>
            <p>전화번호: {{ institution.institution_tel }}</p>
        </div>

        <div v-else>로딩중...</div>
    </div>
</template>
