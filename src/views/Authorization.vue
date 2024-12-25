<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import LoginRegisterContainer from "@/components/LoginRegisterContainer.vue";

const router = useRouter()

const email = ref(null)
const password = ref(null)
const errorSignIn = ref('')

const pending = ref(false)


const submit = async function () {
  pending.value = true

  signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        const user = userCredential.user
        localStorage.setItem('user', JSON.stringify(user))
        await router.push('/list')
      })
      .catch((error) => {
        errorSignIn.value = error.code
      })

  pending.value = false
}

onMounted(async () => {
  const infoUser = JSON.parse(localStorage.getItem('user'))
  if (infoUser) {
    localStorage.setItem('user', JSON.stringify(null))
  }
})

</script>

<template>
  <LoginRegisterContainer>
    <template #heading>
        Artificial Intelligence giving you travel recommendations
    </template>

    <template #description>
      Welcome Back, Please login to your account
    </template>

    <template #form>
      <form class="authorization-page__form-authorization form-authorization">
        <div class="form-authorization__block-inputs">
          <label class="form-authorization__block-inputs-label" for="email">

            <span v-show="errorSignIn" class="error-message">
              {{ errorSignIn }}
            </span>

            Email
            <input v-model="email" :disabled="pending" class="form-authorization__block-inputs-input" type="email" name="email" id="email" placeholder="Email address">
          </label>


          <label class="form-authorization__block-inputs-label" for="password">
            Password
            <input v-model="password" :disabled="pending" placeholder="Password" autocomplete="on" class="form-authorization__block-inputs-input" type="password" name="password" id="password">
          </label>
        </div>

        <div class="form-authorization__additionally">
          <label class="form-authorization__additionally-label" for="checkbox">
            <input class="form-authorization__additionally-checkbox" :disabled="pending" type="checkbox" name="checkbox" id="checkbox" />
            Remember me
          </label>

          <button class="form-authorization__additionally-button" :disabled="pending" type="button">Forgot password?</button>
        </div>

        <div class="form-authorization__buttons">
          <button @click="submit" :disabled="pending" type="button" class="form-authorization__buttons-submit">Login</button>
          <RouterLink :to="'/signup'" :disabled="pending" class="form-authorization__buttons-sign-up">Sign Up</RouterLink>
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
  max-width: 83%;
  top: -10px;
  margin: 0 0 10px;
  display: block;
  color: red;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  position: absolute;
  right: 0;
}

.form-authorization {
  display: flex;
  flex-direction: column;
}

.form-authorization__block-inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

.form-authorization__block-inputs-label {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: colors.$text-grey;
  font-size: 16px;
  line-height: 20px;
}

.form-authorization__block-inputs-input {
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

.form-authorization__additionally {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.form-authorization__additionally-label {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  line-height: 24px;
}

.form-authorization__additionally-checkbox {
  display: block;
  height: 14px;
  width: 15px;
  margin: 0;
  padding: 0;
  visibility: hidden;
  &::before {
    visibility: visible;
    content: '';
    position: absolute;
    background-color: colors.$bg-block;
    border: 1px solid colors.$text-grey;
    top: 5px;
    left: 1px;
    height: 12px;
    width: 12px;
    border-radius: 2px;
  }

  &::after {
    visibility: visible;
    content: '';
    position: absolute;
    top: 3px;
    left: 2px;
  }

  &:checked::before {
    background-color: colors.$bg-lite-green;
    border: 1px solid colors.$bg-lite-green;
  }

  &:checked::after {
    content: '✔';
  }
}

.form-authorization__additionally-button {
  width: fit-content;
  padding: 0;
  background-color: transparent;
  color: colors.$text-green;
  text-decoration: underline;
  font-size: 16px;
  line-height: 24px;
  border: none;
}

.form-authorization__buttons {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
}

.form-authorization__buttons-submit, .form-authorization__buttons-sign-up {
  width: 100%;
  padding: 14px;
  border: 1px solid colors.$border-green;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}

.form-authorization__buttons-submit {
  background-color: colors.$border-green;
  color: white;
}

.form-authorization__buttons-sign-up {
  background-color: transparent;
  color: colors.$border-green;
}

.form-authorization__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.form-authorization__item {
  text-align: center;
  font-size: 14px;
  line-height: 18px;
}

.form-authorization__item:first-child {
  grid-column: span 3;
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-authorization__entrance {
  font-size: 14px;
  line-height: 18px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: colors.$text-lite-green;
  font-weight: 500;
}

.form-authorization__link {
  color: colors.$text-green;
  font-weight: 500;
}

@media screen and (min-width: 1024px) {
  .error-message {
    max-width: 100%;
    top: 0;
  }

  .form-authorization__block-inputs-label {
    font-weight: 600;
  }
}
</style>
