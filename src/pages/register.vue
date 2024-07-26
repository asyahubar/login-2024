<template>
  <header class="flex justify-end">
    <RouterLink
      to="/login"
      class="btn btn-neutral"
    >
      LOGIN
    </RouterLink>
  </header>
  <div class="flex justify-center mt-4">
    <SignForm 
      is-new
      @submitted="register" 
    >
      Join us
    </SignForm>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useFirebaseAuth, useFirestore } from 'vuefire'

import SignForm from '../components/SignForm.vue'

// DATA
const router = useRouter()
const auth = useFirebaseAuth()
const db = useFirestore()

// METHODS
const register = async (data) => {
  const { email, password } = data;
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

    // Create a new user in the users database
    const { user } = userCredentials
    await setDoc(doc(db, "users", user.uid), { email })

    // reroute to profile
    router.push('/profile')
  }
  catch (error) {
    error.value = error.message
    console.error(error)
  }
}
</script>