<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const ins_no = userStore.institution;

const managerList = ref([]);
const selectedUser = ref(null);

const isEditMode = ref(false);
const isCreateMode = ref(false);

const insList = ref([]);

// 입력폼
const form = reactive({
    user_id: '',
    password: '',
    name: '',
    tel: '',
    email: '',
    ins_no: ''
});

// 담당자 리스트 조회
const managerFetch = async (ins_no) => {
    try {
        const resp = await fetch(`/api/managerList/${ins_no}`);
        const data = await resp.json();
        managerList.value = data;

        if (!selectedUser.value && data.length > 0) {
            selectedUser.value = data[0];
            loadForm(selectedUser.value);
        }
    } catch (err) {
        console.error('담당자 조회 에러:', err);
    }
};

//기관정보 조회
const fetchInsList = async () => {
    try {
        const resp = await fetch('/api/institutionList');
        const data = await resp.json();
        insList.value = data;
    } catch (err) {
        console.error('기관 목록 조회 에러:', err);
    }
};

//담당자 선택시 조회 모드 전환
const selectUser = (user) => {
    selectedUser.value = user;
    loadForm(user);
    isEditMode.value = false;
    isCreateMode.value = false;
};

//상세정보 불러옴
const loadForm = (user) => {
    if (!user) return;
    form.user_id = user.user_id || '';
    form.name = user.name || '';
    form.tel = user.tel || '';
    form.email = user.email || '';
    form.ins_no = user.ins_no ? String(user.ins_no) : '';
};

//등록 모드 전환
const createUser = () => {
    isCreateMode.value = true;
    isEditMode.value = false;
    selectedUser.value = null;

    form.user_id = '';
    form.password = '';
    form.name = '';
    form.tel = '';
    form.email = '';
    // form.ins_no = '';
};

//수정 모드 전환
const editUser = () => {
    isEditMode.value = true;
    isCreateMode.value = false;
};

//담당자 등록
const insertUser = async () => {
    try {
        const payload = {
            user_id: form.user_id,
            password: form.password,
            name: form.name,
            tel: form.tel,
            email: form.email,
            ins_no: ins_no
        };

        const resp = await fetch('/api/managerInsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) throw new Error('등록 실패');

        const newUser = await resp.json();

        alert('등록 완료');

        await managerFetch(ins_no);

        const latestUser = managerList.value[managerList.value.length - 1];

        selectedUser.value = latestUser;
        loadForm(latestUser);

        isCreateMode.value = false;
    } catch (err) {
        console.error('등록 에러:', err);
        alert('이미 사용중인 아이디');
    }
};

//수정후 저장
const saveUser = async () => {
    if (!selectedUser.value) return;

    const mNo = selectedUser.value.user_no;

    try {
        const payload = {
            user_id: form.user_id,
            name: form.name,
            tel: form.tel,
            email: form.email,
            ins_no: form.ins_no
        };

        const resp = await fetch(`/api/managerUpdate/${mNo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) throw new Error('저장 실패');

        await resp.json();

        alert('저장 완료');

        await managerFetch(ins_no);

        const updatedUser = managerList.value.find((u) => String(u.user_no) === String(mNo)); //담당자 리스트중 최근에 선택된 번호랑 같은 값 찾음

        if (updatedUser) {
            // 수정 끝난후 찾은 번호로 다시 조회
            selectedUser.value = updatedUser;
            loadForm(updatedUser);
        }

        isEditMode.value = false;
    } catch (err) {
        console.error('저장 에러:', err);
        alert('저장 실패');
    }
};

onBeforeMount(() => {
    managerFetch(ins_no);
    fetchInsList();
});
</script>
