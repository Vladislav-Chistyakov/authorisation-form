<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import LoginRegisterContainer from "@/components/LoginRegisterContainer.vue";

const router = useRouter()

const email = ref(null)
const password = ref(null)
const repeatedPassword = ref(null)

const errorPassword = ref('')
const errorEmail = ref('')

const pending = ref(false)

const submit = async function () {
  pending.value = true
  if (!errorEmail.value && !errorPassword.value &&  email.value && password.value && repeatedPassword.value) {
    try {
      createUserWithEmailAndPassword(auth, email.value, password.value)
          .then(async (userCredential) => {
            const user = userCredential.user
            localStorage.setItem('user', JSON.stringify(user))
            await router.push('/list')
          })
          .catch((error) => {
            alert(`Не удалось зарегистрировать пользователя. Error: ${error.code}`)
          })
    }
    catch (error) {
      console.error('Не удалось сохранить данные', error)
    }
  } else {
    alert('Данные заполнены неверно')
  }
  pending.value = false
}

function checkPassword () {
  if (password.value.length < 6) {
    errorPassword.value = 'Пароль слишком короткий'
  } else {
    if (repeatedPassword.value !== password.value) {
      errorPassword.value = 'Пароли должны совпадать'
    } else {
      errorPassword.value = ''
    }
  }
}

watch(password, checkPassword)
watch(repeatedPassword, checkPassword)
watch(email, (newEmail) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  errorEmail.value = regex.test(newEmail) ? '' : 'Почта не валидна'
})

</script>

<template>
  <LoginRegisterContainer>
    <template #heading>
      Once you register, we will provide you with access to our technologies.
    </template>

    <template #description>
      Please register
    </template>

    <template #form>
      <form class="registration-page__form-registration form-registration">
        <div class="form-registration__block-inputs">
          <label class="form-registration__block-inputs-label" for="email">
            <span>
              Email
            </span>

            <span v-show="errorEmail" class="error-message">
              {{ errorEmail }}
            </span>

            <input v-model="email" :disabled="pending" class="form-registration__block-inputs-input" type="email" name="email" id="email" placeholder="Email address">
          </label>

          <label class="form-registration__block-inputs-label" for="password">
            <span>
              Password
            </span>

            <span v-show="errorPassword" class="error-message">
              {{ errorPassword }}
            </span>

            <input v-model="password" :disabled="pending" placeholder="Password" autocomplete="on" class="form-registration__block-inputs-input" type="password" name="password" id="password">
          </label>

          <label class="form-registration__block-inputs-label" for="repeatedPassword">
            <span>
              Repeat password
            </span>

            <input v-model="repeatedPassword" :disabled="pending" placeholder="Password" autocomplete="on" class="form-registration__block-inputs-input" type="password" name="password" id="repeatedPassword">
          </label>
        </div>

        <div class="form-registration__buttons">
          <button @click="router.push('/signin')" :disabled="pending" type="button" class="form-registration__buttons-login">Return to login</button>
          <button @click="submit" :disabled="pending" type="button" class="form-registration__buttons-submit">Register</button>
        </div>
      </form>
    </template>
  </LoginRegisterContainer>
</template>

<style scoped lang="scss">
@use '@/assets/sass/colors';
@use '@/assets/sass/container';
@include container.container;

.error-message {
  display: block;
  color: red;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  position: absolute;
  right: 0;
}

.form-registration {
  display: flex;
  flex-direction: column;
}

.form-registration__block-inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

.form-registration__block-inputs-label {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: colors.$text-grey;
  font-size: 16px;
  line-height: 20px;
}

.form-registration__block-inputs-input {
  display: block;
  width: -webkit-fill-available;
  margin: 0;
  padding: 15px;
  background-color: transparent;
  color: colors.$text-green;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid colors.$border-lite-green;
  border-radius: 8px;
  &:focus, &:focus-visible {
    outline: none;
  }
}

.form-registration__buttons {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  color: white;
}

.form-registration__buttons-login {
  width: 100%;
  border: 1px solid colors.$border-green;
  padding: 14px;
  background-color: white;
  font-weight: 600;
  color: colors.$border-green;
}

.form-registration__buttons-submit {
  width: 100%;
  border: 1px solid colors.$border-green;
  padding: 14px;
  background-color: colors.$border-green;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: white;
}

.form-registration__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.form-registration__item {
  text-align: center;
  font-size: 14px;
  line-height: 18px;
}

.form-registration__item:first-child {
  grid-column: span 3;
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-registration__entrance {
  font-size: 14px;
  line-height: 18px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: colors.$text-lite-green;
  font-weight: 500;
}

.form-registration__link {
  color: colors.$text-green;
  font-weight: 500;
}

@media screen and (min-width: 1024px) {
  .form-registration__block-inputs-label {
    font-weight: 600;
  }
}
</style>

