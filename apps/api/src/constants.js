const HERO_NAMES = Object.freeze([
  'Alfarr', 'Martius', 'Boris', 'Karl', 'Gerwald', 'Rodger', 'Herbet', 'Ravi', 'Helewidis', 'Arnoald', 'Magno', 'Héktor', 'Yngvarr', 'Darlan', 'Vicenzo', 'Liam', 'Hloddoviko', 'Damian', 'Elmo', 'Níke', 'Mackeswell', 'Absalom', 'Rayyan', 'Yudi', 'Armstrong', 'Friedrich', 'Apólo', 'Zeus', 'Maximilian', 'Renatus', 'Argos', 'Hélio', 'Benedictus', 'Adônis', 'Orion', 'Atlas', 'Ícarus', 'Herácles', 'Théos', 'Andreas', 'Marcella', 'Celina', 'Ailène',
  'Pilar', 'Chlodovech', 'Luana', 'Níkaia', 'Hilda', 'Dandara', 'Mahthildis', 'Alma', 'Ioná', 'Héloïse', 'Mildþryð', 'Itília', 'Zoé', 'Lot-regne', 'Cibele', 'Saori', 'Maia', 'Carolaine', 'Sakura', 'Natalis', 'Asha', 'Valentina', 'Aurora', 'Aruna', 'Gaia', 'Gertrudes', 'Nadine', 'Imani', 'Íres', 'Philoméne', 'Dione', 'Phoebe', 'Têmis', 'Salomé', 'Afrodite', 'Pandora', 'Alaska', 'Pérola', 'Jacinta', 'Ariadne', 'Erhais', 'Anastásia', 'Jocasta',
  'Dafne', 'Barbar', 'Esperanza', 'Athena', 'Ártemis', 'Pan', 'Ambrose', 'Harry', 'Lazar', 'Relic', 'Balthazar', 'Wilfred', 'Kuron', 'Menw', 'Severus', 'Linus', 'Barron', 'Garon', 'Alister', 'Kiano', 'Pierce', 'Rune', 'Percival', 'Merlin', 'Potter', 'Lux', 'Zadock', 'Wolcott', 'Dune', 'Eris', 'Gandalf', 'Nimbus', 'Elric', 'Puck', 'Phinneas', 'Remus', 'Rubeus', 'Circle', 'Paulinus', 'Lucius', 'Saruman', 'Mix', 'Alatar', 'Jafar', 'Seamus',
  'Pipi', 'Atlantes', 'Prospero', 'Earth', 'Off', 'Ganondorf', 'Radagast', 'Hendrick', 'Gun', 'Pallando', 'Robaldo', 'Roland', 'Wand', 'Near', 'Psyka', 'zMiguel', 'Cassandra', 'Agnes', 'Gwydion', 'Gwen', 'Joane', 'Laurie', 'Leanne', 'Raven', 'Margaret', 'Medea', 'Morgana', 'Ursula', 'Narcisa', 'Calypso', 'Euterpe', 'Bathilda', 'Andromeda', 'Polímnia', 'Margery', 'Clio', 'Asterope', 'Ravenna', 'Elphaba', 'Glenda', 'Melpômene', 'Calíope',
  'Malévola', 'Blanche', 'Terpsícore', 'Ginevra', 'Minerva', 'Elladora', 'Winifred', 'Endora', 'Meliflua', 'Apolline', 'Bellatrix', 'Bashee', 'Elfrinda', 'Dilys', 'Amis', 'Bentley', 'Dalibor', 'Arthurus', 'Bjørn', 'Håkon', 'Richard', 'Dragomir', 'Frederick', 'Hawise', 'Arvydas', 'Edward', 'Enguerrand', 'Domenico', 'Erasto', 'Drake', 'Aléxandros', 'Willahelm', 'Grannus', 'Milo', 'Letholdus', 'Lutero', 'Amice', 'Urd', 'Bartolomeu', 'Roland',
  'Isabeu', 'Thyri', 'Iohanna', 'Cateline', 'Bryana', 'Aila', 'Lyudmila', 'Bozena', 'Rosmerta', 'Alba', 'Gwendolyn', 'Hildergarde', 'Odilia', 'Emma', 'Archer', 'Apollo', 'Katniss', 'Hanzo', 'Flecheiro', 'Hankyu', 'Mirador', 'Link', 'Ponta Afiada', 'Arash', 'Ágil', 'Houyi', 'Certeiro', 'Cupido', 'Skaði', 'Ullr', 'Robin Hood', 'Artemis', 'Gisely', 'Rogger', 'Amazonas', 'Ubiratan', 'Elvira', 'Gisa', 'Lightwood', 'Golias', 'Lancelot', 'Eros',
  'Spear of Fire', 'Lanake', 'Jarvis', 'Caim', 'Time Bender', 'Radagásio', 'Golyla', 'Oskar', 'Matusalém', 'Neytiri', 'Bowlin', 'Corin', 'Dagahra', 'Falkor', 'Diaval', 'Firnen', 'Draco', 'Dragonite', 'Haku', 'Mushu', 'Leviatan', 'Dracônica', 'Smaug', 'Drake', 'Ghidorah', 'Brooklyn', 'Ryoko', 'Scylla', 'Xiuhcoatl', 'Safira', 'Heskan', 'Katla', 'Chrysophylax', 'Uruloki', 'Elliot', 'Puff', 'Glismoda', 'Drakon', 'Fafnir', 'Toga',
  'Tanwen', 'Yukio', 'Harumi', 'Takashi', 'Herensuge', 'Drakony', 'Strauss', 'Shin', 'Protector', 'Fuyuki', 'Gremory', 'Aoi', 'Narcisa', 'Ripper', 'Killer', 'Vile', 'Estileto', 'Cannibal', 'Psycho', 'Hit Man', 'Wicked', 'Tutsikino', 'Snake', 'Kuchiki', 'Esqueleto', 'Lector', 'Glitch', 'Doble Killer', 'Clementine', 'Krueger', 'Thanos', 'Serpentino', 'Monstro', 'Lázarus', 'Rex', 'Terrible Beast', 'Lucrécia', 'Gozilla', 'Thong', 'Head Shot',
  'Soprano', 'Spartakus', 'Fisk', 'Slayer', 'Joker', 'Octopus', 'Feroz', 'Evil Master', 'Espantalho', 'Poison'
])

const COUNTDOWN_TYPE = {
  COLLECT: {
    id: 'collect',
    time: 5 * 60 * 1000 // Temp for testing
  }
}

export {
  HERO_NAMES,
  COUNTDOWN_TYPE
}
