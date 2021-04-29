const fs = require('fs');
const faker = require('faker/locale/it');
const csv = require('csv-stringify')
const cf = require('codice-fiscale-js');

const comuni = JSON.parse(fs.readFileSync('comuni.json'));
const genders = ['M', 'F']
const comune = () => {
  return comuni[Math.floor(Math.random() * comuni.length)];
}
const gender = () => {
  return genders[Math.floor(Math.random() * genders.length)];
}

const data = [["Nome", "Cognome", "CF", "email", "cellulare"]]
let i = 152000

while (i--) {
  const bdate = faker.date.between('1900-01-01', '2002-01-01')
  const birthplace = comune()
  const u = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    gender: gender(),
    day: bdate.getDate(),
    month: bdate.getMonth() + 1,
    year: bdate.getFullYear(),
    birthplace: birthplace.nome,
    birthplaceProvincia: birthplace.sigla
  }

  try {
  data.push([
   u.name,
   u.surname,
   new cf(u).code,
   faker.internet.email(),
   faker.phone.phoneNumber()
  ])
  } catch {}
}

csv(data, {quoted: true}, (e, o) => {
   console.log(o)
})
