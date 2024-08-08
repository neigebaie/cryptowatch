<template>
    <div class="login-form blur-background">
        <form @submit.prevent="handleSubmit">
            <div class="form-field">
                <label for="username">Username</label>
                <InputText v-model="username" type="text" id="username" required />
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <InputText v-model="password" type="password" id="password" required />
            </div>
            <Button rounded type="submit" :disabled="loading" severity="secondary">Login</Button>
        </form>
    </div>
    <div v-if="loading" class="loading">loading</div>
    <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');

const handleSubmit = async () => {
    await authStore.login(username.value, password.value);
};

const { loading, error } = authStore;
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.login-form div {
    margin-bottom: 1rem;
}

.error {
    color: red;
}
</style>