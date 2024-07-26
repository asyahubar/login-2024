export function useFormValidation() {

  const isEmailValid = (email) => {
    if (!email) {
      return false
    }

    const validEmailPattern = new RegExp(/^\S+@\S+\.\S+$/)

    return validEmailPattern.test(email)
  }

  const isPasswordAcceptable = (password) => {
    if (!password || password.length < 5) {
      return false
    }
    return true
  }

  const isPhoneNumberValid  = (phone) => {
    if (!phone) { return true }

    const validPhonePattern = new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)

    return validPhonePattern.test(phone)
  }

  const isValidDate = (date) => {
    if (!date) { return true }

    const timestamp = Date.parse(date)
    return !isNaN(timestamp)
  }

  const isNameValid = (value) => {
    return value.length === 0 ? true : value.length > 1
  }

  return {
    isEmailValid,
    isPasswordAcceptable,
    isPhoneNumberValid,
    isValidDate,
    isNameValid
  }
}