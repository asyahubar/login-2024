<template>
  <header class="flex justify-end">
    <RouterLink
      to="/register"
      class="btn btn-neutral"
    >
      REGISTER
    </RouterLink>
  </header>
  <div class="flex justify-center mt-4">
    <SignForm 
      @submitted="register" 
    >
      Sign in
    </SignForm>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useFirebaseAuth, useCurrentUser } from 'vuefire'

import SignForm from '../components/SignForm.vue'

// DATA
const router = useRouter()
const auth = useFirebaseAuth()
const user = useCurrentUser()
if (user) {
  signOut(auth)
}

// METHODS
const register = async (data) => {
  const { email, password } = data;
  try {
    await signInWithEmailAndPassword(auth, email, password)
    router.push('/profile')
  }
  catch (reason) {
    console.error(reason)
  }
}
</script>