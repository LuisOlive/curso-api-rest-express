const faker = require('faker/locale/es_MX')

export default () => {
  const user = {
    id: 0,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    city: faker.address.cityName(),
    age: faker.datatype.number(60) + 18
  }
  user.email = internet.email(user.firstName, user.lastName)

  return user
}
