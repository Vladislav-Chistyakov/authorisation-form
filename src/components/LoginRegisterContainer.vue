<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="login-registration-container">
    <div class="login-registration-container__top wrapper">
      <img src="@/assets/images/logo-white.svg" alt="logo" class="login-registration-container__top-company-logo company-logo">

      <h1 class="login-registration-container__top-company-name company-name">Travalizer</h1>
    </div>

    <div class="login-registration-container__background-car wrapper">
      <img src="@/assets/images/background-car.svg" alt="background-car" class="login-registration-container__background-car-image">
    </div>

    <div class="login-registration-container__main wrapper">
      <div class="login-registration-container__main-company-logo company-logo">
        <img src="@/assets/images/logo-green.svg" alt="logo">

        <h1 class="login-registration-container__main-company-name company-name">Travalizer</h1>
      </div>

      <div class="login-registration-container__main-info">
        <h2 class="login-registration-container__main-info-header">
          <slot name="heading" />
        </h2>

        <p class="login-registration-container__main-info-description">
          <slot name="description" />
        </p>
      </div>

      <slot name="form" />

      <ul class="form-registration__list">
        <li class="form-registration__item">
          <button @click="router.push('/signin')" class="form-registration__entrance">Or, login with</button>
        </li>
        <li class="form-registration__item">
          <a class="form-registration__link" href="https://faceboock.com">Facebook</a>
        </li>
        <li class="form-registration__item">
          <a class="form-registration__link" href="https://linkedin.com">Linked In</a>
        </li>
        <li class="form-registration__item">
          <a class="form-registration__link" href="https://google.com">Google</a>
        </li>
      </ul>
    </div>
  </div>
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

.login-registration-container__top {
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

.login-registration-container__background-car {
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding-top: 35px;
  padding-bottom: 30px;
  background-color: colors.$bg-car;
}

.login-registration-container__background-car-image {
  height: 230px;
}

.login-registration-container__main {
  padding-top: 32px;
  padding-bottom: 30px;
  background-color: colors.$bg-block;
  color: colors.$text-green;
}

.login-registration-container__main-company-logo {
  display: none;
}

.login-registration-container__main-company-name {
  display: none;
}

.login-registration-container__main-info {
  margin-bottom: 40px;
}

.login-registration-container__main-info-header {
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 20px;
  line-height: 24px;
}

.login-registration-container__main-info-description {
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
  .login-registration-container {
    display: flex;
    flex-direction: row-reverse;
    background-color: inherit;
    padding: 120px 0 20px;
  }

  .login-registration-container__top {
    display: none;
  }

  .login-registration-container__background-car {
    width: 100%;
    border-radius: 0 20px 20px 0;
    align-items: center;
  }


  .login-registration-container__background-car-image {
    height: auto;
  }

  .login-registration-container__main {
    width: 100%;
    max-width: 550px;
    border-radius: 20px 0 0 20px;
  }

  .login-registration-container__main-company-logo {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 56px;
  }

  .login-registration-container__main-company-name {
    display: block;
  }

  .login-registration-container__main-info-header {
    font-size: 24px;
    line-height: 28px;
  }

  .login-registration-container__main-info-description {
    margin-bottom: 24px;
  }

  .form-registration__block-inputs-label {
    font-weight: 600;
  }
}
</style>

