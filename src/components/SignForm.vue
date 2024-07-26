<template>
  <div class="card bg-neutral">
    <form 
      id="sign-form"
      action="POST"
      class="max-w-96"
      @submit.prevent="submit"
    >
      <div class="card-body flex flex-col gap-3">
        <h1 class="card-title"><slot></slot></h1>

        <p v-if="error" class="text-red-500"><strong>{{ error }}</strong></p>

        <!-- <div class="tooltip tooltip-open tooltip-error tooltip-top" data-tip="Invalid email"> -->
          <label class="input input-bordered flex items-center gap-2">
            <IconEmail />
            <input 
              v-model.trim="values.email"
              type="text"
              class="grow"
              name="email"
              placeholder="Email"
            >
          </label>
        <!-- </div> -->

        <label class="input input-bordered flex items-center gap-2">
          <IconPassword />
          <input
            v-model="values.password"
            type="password"
            class="grow" 
            name="password"
            placeholder="Password"
          >
        </label>

        <button
          type="submit" 
          class="btn btn-primary mt-1"
        >
          {{ isNew ? "REGISTER" : "LOGIN" }}
        </button>

      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

import IconEmail from './icon/Email.vue'
import IconPassword from './icon/Password.vue'
import { useFormValidation } from '@/composables/form';

const props = defineProps({
  isNew: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['submitted'])

// COMPOSABLES
const { isEmailValid, isPasswordAcceptable } = useFormValidation()

// DATA
const values = reactive({
  email: "",
  password: ""
})
const error = defineModel('error', { default: "" })

// METHODS
const submit = () => {
  error.value = ""

  if (!values.email || !values.password) {
    error.value = "Input credentials first"
    return
  }
  if (!isEmailValid(values.email)) {
    error.value = "Invalid email"
    return
  }
  if (!isPasswordAcceptable(values.password)) {
    error.value = "Password should be longer than 4 characters"
    return
  }

  emit('submitted', values)
}
</script>