<template>
  <div class="card bg-neutral">
    <form 
      id="profile-form"
      action="POST"
      @submit.prevent="submit"
    >
      <div class="card-body flex flex-col gap-1">

        <h2 class="pl-1">Update profile</h2>

        <div class="flex gap-3">
          <label class="form-control md:w-1/2 w-full">
            <div class="label">
              <span class="label-text">
                First name
                <mark class="text-red-600 bg-transparent">*</mark>
              </span>
            </div>
            <input 
              v-model="data.first_name"
              type="text" 
              name="first_name"
              required
              class="input input-bordered w-full"
            />
          </label>
          <label class="form-control md:w-1/2 w-full">
            <div class="label">
              <span class="label-text">
                Last name 
                <mark class="text-red-600 bg-transparent">*</mark>
              </span>
            </div>
            <input 
              v-model="data.last_name"
              type="text" 
              name="last_name"
              required
              class="input input-bordered w-full" 
            />
          </label>
        </div>

        <div class="flex gap-3">
          <label class="form-control md:w-1/2 w-full">
            <div class="label">
              <span class="label-text">
                Email 
                <mark class="text-red-600 bg-transparent">*</mark>
              </span>
            </div>
            <input 
              v-model="data.email"
              type="email" 
              name="email"
              required
              class="input input-bordered w-full "   
            />
          </label>
          <label class="form-control md:w-1/2 w-full">
            <div class="label">
              <span class="label-text">Phone number</span>
            </div>
            <input 
              v-model="data.phone"
              type="text" 
              name="phone"
              class="input input-bordered w-full " 
            />
          </label>
        </div>

        <div class="flex gap-3">
          <label class="form-control md:w-1/2 w-full">
            <div class="label">
              <span class="label-text">Date Of Birth</span>
            </div>
            <input 
              v-model="data.date_of_birth"
              type="date" 
              name="date_of_birth"
              class="input input-bordered w-full "   
            />
          </label>
          <label class="form-control md:w-1/2 w-full">
            <div class="label">
              <span class="label-text">Location</span>
            </div>
            <input 
              v-model="data.location"
              type="text" 
              name="location"
              class="input input-bordered w-full " 
            />
          </label>
        </div>

        
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Biography</span>
          </div>
          <textarea
            v-model="data.biography"
            name="biography"
            class="textarea textarea-bordered"
          >
          </textarea>
        </label>

        <div class="card-actions justify-end mt-3">
          <button
            type="submit" 
            class="btn btn-primary mt-1"
          >
            SAVE
          </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup>
import { watch, reactive } from 'vue'

import { User } from '@/entities/user'
import { useFormValidation } from '@/composables/form';

const props = defineProps({
  profile: {
    default: new User()
  }
})
const emit = defineEmits(['save'])

// COMPOSABLES
const { 
  isEmailValid,
  isNameValid,
  isPhoneNumberValid,
  isValidDate
} = useFormValidation()

// DATA
const data = reactive({})

// WATCHERS
watch(() => props.profile, (newProfile) => {
  if (newProfile) {
    Object.assign(data, newProfile)
  }
},
{ deep: true, immediate: true })

// METHODS
const submit = () => {
  const formNode = document.getElementById('profile-form')
  const updatedData = new FormData(formNode)

  // Validate
  if (!isNameValid(data.first_name)
  || !isNameValid(data.last_name)
  || !isEmailValid(data.email)
  || !isPhoneNumberValid(data.phone)
  || isValidDate(data.date_of_birth)) {
    return
  }

  emit("save", Object.fromEntries(updatedData))
}
</script>