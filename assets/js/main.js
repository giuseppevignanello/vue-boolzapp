// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato
// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

const { createApp } = Vue

createApp({
    data() {
        return {
            randomAnswerList: [
                "Ciao! Come posso aiutarti oggi?",
                "Mi dispiace, non ho capito. Potresti spiegare meglio?",
                "Sono spiacente, non ho accesso a quelle informazioni al momento.",
                "Sto cercando di capire. Potresti fornire ulteriori dettagli?",
                "Va bene, sto lavorando alla tua richiesta.", "Mi piace la tua domanda! Vediamo se posso aiutarti.",
                "Posso aiutarti con qualcosa di specifico?", "Sono qui per assisterti. Cosa posso fare per te?",
                "Non sono sicuro di aver capito. Puoi ripetere, per favore?",
                "Mi dispiace, ma non posso fare ciò che hai chiesto.",
                "Ci sono alcune cose che non posso fare. Mi spiace.",
                "Non ti preoccupare, farò del mio meglio per aiutarti.",
                "Grazie per avermi contattato. Cosa posso fare per te?",
                "Posso suggerirti qualcosa? Sono qui per questo.",
                "Non ho le informazioni necessarie al momento. Puoi riprovare più tardi?",
                "Ho bisogno di maggiori dettagli per poterti aiutare.",
                "Certo, farò del mio meglio per rispondere alla tua domanda.",
                "Non ho risposte per tutto, ma posso provare ad aiutarti.",
                "Sì, posso confermare che è possibile. Vuoi maggiori informazioni?",
                "Mi piacerebbe aiutarti. Di cosa hai bisogno?"
            ],

            searchInput: "",
            newMessage: "",
            activeContact: 0,
            contacts: [
                {
                    name: 'Michele',
                    avatar: './assets/img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './assets/img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './assets/img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './assets/img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './assets/img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './assets/img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './assets/img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './assets/img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        }
    },
    methods: {
        clickOnContacts(index) {
            this.activeContact = index;
        },
        sendMessage() {
            const currentDate = new Date;

            if (this.newMessage.trim() != '') {
                this.contacts[this.activeContact].messages.push(
                    {
                        date: currentDate.getDate() + '/' + currentDate.getMonth() + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds(),
                        message: this.newMessage,
                        status: 'sent'
                    }
                )
                setTimeout(() => {
                    this.contacts[this.activeContact].messages.push(
                        {
                            date: currentDate.getDate() + '/' + currentDate.getMonth() + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds(),
                            message: this.randomAnswerList[this.randomAnswer(0, this.randomAnswerList.length - 1)],
                            status: 'received'
                        }
                    )
                },

                    1000)
                this.newMessage = ""
            }

        },

        randomAnswer(min, max) {
            randomNumber= Math.floor(Math.random() * (max - min + 1))

            return randomNumber
        }, 
     

    }
}).mount('#app')


