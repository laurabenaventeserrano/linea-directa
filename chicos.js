// Línea Directa · los 24 chicos del juego.
//
// Esto es lo único que el juego sabe de ellos (datos y fotos de Laura).
//
// categorias: los rasgos que dan pistas, en orden. Como en la hoja del juego
//             original, el orden de los chicos decide qué pista da cada uno:
//             con 3 categorías, 1–8 → accesorio, 9–16 → hobby, 17–24 → mascota.
//             'valores' es cómo se ve cada valor en pantalla; 'pistas', cómo lo dice el chico.
// telefono:   555-01 + número del chico (de 555-0101 a 555-0124).
// lugares:    vacío = tablero sin lugares, una sola cuadrícula.

window.LD_DATA = {
  lugares: [],
  categorias: [
    { clave:'accesorio', etiqueta:'ACC',
      valores:{ 'lentes':'lentes', 'gorra':'gorra', 'pelo largo':'pelo largo', 'auriculares':'auriculares' },
      pistas:{ 'lentes':'No usa lentes.', 'gorra':'No lleva gorra.', 'pelo largo':'No tiene el pelo largo.', 'auriculares':'No lleva auriculares.' } },
    { clave:'hobby', etiqueta:'HOBBY',
      valores:{ 'guitarra':'guitarra', 'futbol':'fútbol', 'skate':'skate' },
      pistas:{ 'guitarra':'No toca la guitarra.', 'futbol':'No juega al fútbol.', 'skate':'No hace skate.' } },
    { clave:'mascota', etiqueta:'MASCOTA',
      valores:{ 'perro':'perro', 'gato':'gato' },
      pistas:{ 'perro':'No tiene perro.', 'gato':'No tiene gato.' } }
  ],
  chicos: [
    { nombre:"Tomi", telefono:'555-0101', foto:"chicos/01-tomi.png", accesorio:"lentes", hobby:"guitarra", mascota:"perro" },
    { nombre:"Nico", telefono:'555-0102', foto:"chicos/02-nico.png", accesorio:"gorra", hobby:"futbol", mascota:"gato" },
    { nombre:"Santi", telefono:'555-0103', foto:"chicos/03-santi.png", accesorio:"pelo largo", hobby:"guitarra", mascota:"gato" },
    { nombre:"Lucho", telefono:'555-0104', foto:"chicos/04-lucho.png", accesorio:"auriculares", hobby:"futbol", mascota:"perro" },
    { nombre:"Fede", telefono:'555-0105', foto:"chicos/05-fede.png", accesorio:"lentes", hobby:"skate", mascota:"perro" },
    { nombre:"Gonza", telefono:'555-0106', foto:"chicos/06-gonza.png", accesorio:"gorra", hobby:"guitarra", mascota:"gato" },
    { nombre:"Maxi", telefono:'555-0107', foto:"chicos/07-maxi.png", accesorio:"pelo largo", hobby:"skate", mascota:"gato" },
    { nombre:"Facu", telefono:'555-0108', foto:"chicos/08-facu.png", accesorio:"auriculares", hobby:"guitarra", mascota:"perro" },
    { nombre:"Pablo", telefono:'555-0109', foto:"chicos/09-pablo.png", accesorio:"lentes", hobby:"futbol", mascota:"gato" },
    { nombre:"Dani", telefono:'555-0110', foto:"chicos/10-dani.png", accesorio:"gorra", hobby:"skate", mascota:"gato" },
    { nombre:"Eze", telefono:'555-0111', foto:"chicos/11-eze.png", accesorio:"pelo largo", hobby:"futbol", mascota:"perro" },
    { nombre:"Mati", telefono:'555-0112', foto:"chicos/12-mati.png", accesorio:"auriculares", hobby:"skate", mascota:"perro" },
    { nombre:"Lauti", telefono:'555-0113', foto:"chicos/13-lauti.png", accesorio:"lentes", hobby:"guitarra", mascota:"gato" },
    { nombre:"Joaco", telefono:'555-0114', foto:"chicos/14-joaco.png", accesorio:"gorra", hobby:"futbol", mascota:"perro" },
    { nombre:"Bruno", telefono:'555-0115', foto:"chicos/15-bruno.png", accesorio:"pelo largo", hobby:"guitarra", mascota:"perro" },
    { nombre:"Ale", telefono:'555-0116', foto:"chicos/16-ale.png", accesorio:"auriculares", hobby:"futbol", mascota:"gato" },
    { nombre:"Iván", telefono:'555-0117', foto:"chicos/17-ivan.png", accesorio:"lentes", hobby:"skate", mascota:"gato" },
    { nombre:"Rodri", telefono:'555-0118', foto:"chicos/18-rodri.png", accesorio:"gorra", hobby:"guitarra", mascota:"perro" },
    { nombre:"Gabi", telefono:'555-0119', foto:"chicos/19-gabi.png", accesorio:"pelo largo", hobby:"skate", mascota:"perro" },
    { nombre:"Ariel", telefono:'555-0120', foto:"chicos/20-ariel.png", accesorio:"auriculares", hobby:"guitarra", mascota:"gato" },
    { nombre:"Marcos", telefono:'555-0121', foto:"chicos/21-marcos.png", accesorio:"lentes", hobby:"futbol", mascota:"perro" },
    { nombre:"Juampi", telefono:'555-0122', foto:"chicos/22-juampi.png", accesorio:"gorra", hobby:"skate", mascota:"perro" },
    { nombre:"Pipo", telefono:'555-0123', foto:"chicos/23-pipo.png", accesorio:"pelo largo", hobby:"futbol", mascota:"gato" },
    { nombre:"Chino", telefono:'555-0124', foto:"chicos/24-chino.png", accesorio:"auriculares", hobby:"skate", mascota:"gato" },
  ]
};
