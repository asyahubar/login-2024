<template>
  <header class="flex justify-between items-center mb-4">
    <h1 class="text-xl">Hello, {{ profile.first_name || "user" }}!</h1>
    <RouterLink
      to="/login"
      class="btn btn-neutral"
    >
      Log out
    </RouterLink>
  </header>

  <main>
    <ProfileForm 
      :profile
      class="w-full lg:w-2/3" 
      @save="update"
    />
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useCurrentUser, useFirebaseAuth, useFirestore } from 'vuefire'
import { doc, updateDoc, getDoc } from "firebase/firestore"

import ProfileForm from '../components/ProfileForm.vue'
import { User } from '@/entities/user';

// DATA
const router = useRouter()
const user = useCurrentUser()
const auth = useFirebaseAuth()
const db = useFirestore()
const profile = reactive(new User())

// METHODS
const setProfile = async () => {
  const docRef = doc(db, 'users', user.value.uid)
  try {
    const response = await getDoc(docRef)
    Object.assign(profile, response.data())
  }
  catch (error) {
    console.error(error)
  }
}
setProfile()

const update = async (newProfile) => {
  try {
    const result = await updateDoc(doc(db, 'users', user.value.uid), newProfile)
  }
  catch (error) {
    console.error(error)
  }
}
</script>