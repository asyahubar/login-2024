export class User {
  constructor (
    {
      email,
      first_name,
      last_name,
      phone = "",
      date_of_birth = "",
      location = "",
      biography = ""
    } = {}
  ) {
    this.email = email,
    this.first_name = first_name,
    this.last_name = last_name,
    this.phone = phone,
    this.date_of_birth = date_of_birth,
    this.location = location,
    this.biography = biography
  }
}