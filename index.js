/*
 * This file is part of fake-italian-data
 *
 * Copyright (c) 2021 Dyne.org foundation
 * designed, written and maintained by Puria Nafisi Azizi <puria@dyne.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License v3.0
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * Along with this program you should have received a copy of the
 * GNU Affero General Public License v3.0
 * If not, see http://www.gnu.org/licenses/agpl.txt
 *
 * Last modified by Puria Nafisi Azizi
 * on Fri Apr 30 2021
 */
const fs = require("fs");
const faker = require("faker/locale/it");
const csv = require("csv-stringify");
const cf = require("codice-fiscale-js");
const N = 200000;

const comuni = JSON.parse(fs.readFileSync("comuni.json"));
const genders = ["M", "F"];
const comune = () => {
  return comuni[Math.floor(Math.random() * comuni.length)];
};
const gender = () => {
  return genders[Math.floor(Math.random() * genders.length)];
};

let i = N;
const data = [["Nome", "Cognome", "CF", "email", "cellulare"]];

while (i--) {
  const birth_date = faker.date.between("1900-01-01", "2002-01-01");
  const birthplace = comune();
  const u = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    gender: gender(),
    day: birth_date.getDate(),
    month: birth_date.getMonth() + 1,
    year: birth_date.getFullYear(),
    birthplace: birthplace.nome,
    birthplaceProvincia: birthplace.sigla,
  };

  try {
    data.push([
      u.name,
      u.surname,
      new cf(u).code,
      faker.internet.email(),
      faker.phone.phoneNumber(),
    ]);
  } catch {}
}

csv(data, { quoted: true }, (e, o) => {
  console.log(o);
});
