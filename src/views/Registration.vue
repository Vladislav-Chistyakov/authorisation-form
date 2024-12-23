<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'

const router = useRouter()

const email = ref(null)
const password = ref(null)
const repeatedPassword = ref(null)

const errorPassword = ref('')
const errorEmail = ref('')

const pending = ref(false)

const submit = async function () {
  pending.value = true
  if (!errorEmail.value && !errorPassword.value) {
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
  <div class="registration-page">
    <div class="registration-page__top wrapper">
      <img src="../assets/images/logo-white.svg" alt="logo" class="registration-page__top-company-logo company-logo">

      <h1 class="registration-page__top-company-name company-name">Travalizer</h1>
    </div>

    <div class="registration-page__background-car wrapper">
      <img src="../assets/images/background-car.svg" alt="background-car" class="registration-page__background-car-image">
    </div>

    <div class="registration-page__main wrapper">
      <div class="registration-page__main-company-logo company-logo">
        <img src="../assets/images/logo-green.svg" alt="logo">

        <h1 class="registration-page__main-company-name company-name">Travalizer</h1>
      </div>

      <div class="registration-page__main-info">
        <h2 class="registration-page__main-info-header">
          Once you register, we will provide you with access to our technologies.
        </h2>

        <p class="registration-page__main-info-description">
          Please register
        </p>
      </div>

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

      <ul class="form-registration__list">
        <li class="form-registration__item">
          <button @click="router.push('/signin')" :disabled="pending" class="form-registration__entrance">Or, login with</button>
        </li>
        <li class="form-registration__item">
          <a class="form-registration__link" :disabled="pending" href="https://faceboock.com">Facebook</a>
        </li>
        <li class="form-registration__item">
          <a class="form-registration__link" :disabled="pending" href="https://linkedin.com">Linked In</a>
        </li>
        <li class="form-registration__item">
          <a class="form-registration__link" :disabled="pending" href="https://google.com">Google</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/src/assets/sass/colors';
@use '~/src/assets/sass/container';
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

.registration-page__top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: colors.$bg-main;
  padding-top: 32px;
  padding-bottom: 32px;
}

.company-name {
  margin: 0;
  padding: 0;
  font-size: 32px;
  line-height: 36px;
}

.registration-page__background-car {
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding-top: 35px;
  padding-bottom: 30px;
  background-color: colors.$bg-car;
}

.registration-page__background-car-image {
  height: 230px;
}

.registration-page__main {
  padding-top: 32px;
  padding-bottom: 30px;
  background-color: colors.$bg-block;
  color: colors.$text-green;
}

.registration-page__main-company-logo {
  display: none;
}

.registration-page__main-company-name {
  display: none;
}

.registration-page__main-info {
  margin-bottom: 40px;
}

.registration-page__main-info-header {
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 20px;
  line-height: 24px;
}

.registration-page__main-info-description {
  font-size: 16px;
  line-height: 20px;
  color: colors.$text-lite-green;
  margin: 0 0 16px 0;
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
  .registration-page {
    display: flex;
    flex-direction: row-reverse;
    background-color: inherit;
    padding: 120px 0 135px;
  }

  .registration-page__top {
    display: none;
  }

  .registration-page__background-car {
    width: 100%;
    border-radius: 0 20px 20px 0;
    align-items: center;
  }

  
  .registration-page__background-car-image {
    height: auto;
  }

  .registration-page__main {
    width: 100%;
    max-width: 550px;
    border-radius: 20px 0 0 20px;
  }

  .registration-page__main-company-logo {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 56px;
  }

  .registration-page__main-company-name {
    display: block;
  }

  .registration-page__main-info-header {
    font-size: 24px;
    line-height: 28px;
  }

  .registration-page__main-info-description {
    margin-bottom: 24px;
  }

  .form-registration__block-inputs-label {
    font-weight: 600;
  }
}
</style>

