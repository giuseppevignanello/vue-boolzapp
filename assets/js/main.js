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
            newContactName:"", 
            newContactImage:"",
            importantContact:[],
            importantMessages : [],
            online: false,
            isTyping: false,
            searchInput: "",
            newMessage: "",
            activeContact: -1,
            randomAnswerList: ["I'm not sure about that.",
            "It's possible, but I can't say for certain.",
            "Definitely not!",
            "Absolutely!",
            "That's a good question.",
            "I'm afraid I don't know.",
            "Let me think about it for a moment...",
            "It's hard to say.",
            "I don't think so, but I could be wrong.",
            "I'm sorry, I didn't catch that.",
            "Yes, I agree with you.",
            "No, I don't think that's right.",
            "I see what you're saying, but I disagree.",
            "That's a really interesting point.",
            "I'm not sure I understand what you mean.",
            "I'm not qualified to answer that.",
            "I'm sorry, I'm not able to help you with that.",
            "I'm not comfortable discussing that topic.",
            "That's something you'll need to figure out for yourself."],
            contacts: [
                {
                    name: 'Luke',
                    avatar: './assets/img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '15:30',
                            message: 'Did you walk the dog?',
                            status: 'sent'
                        },
                        {
                            date: '15:50',
                            message: 'Remember to hang the washing',
                            status: 'sent'
                        },
                        {
                            date: '16:15',
                            message: 'All done!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Richard',
                    avatar: './assets/img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '16:30',
                            message: 'Hi, did you have a good weekend?',
                            status: 'sent'
                        },
                        {
                            date: '16:30',
                            message: 'Hey! Yeah, it was pretty chill. How about you? ',
                            status: 'received'
                        },
                        {
                            date: '16:35',
                            message: 'It was good. I went to the beach with some friends.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Mick',
                    avatar: './assets/img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10:10',
                            message: 'Paul is also coming.',
                            status: 'received'
                        },
                        {
                            date: '10:20',
                            message: 'Are you sure you didn\'t get the chat wrong?',
                            status: 'sent'
                        },
                        {
                            date: '16:15',
                            message: 'Oh, sorry! 😅',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alex L.',
                    avatar: './assets/img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '15:30',
                            message: 'Have you heard that a new pizzeria has opened?',
                            status: 'sent'
                        },
                        {
                            date: '15:50',
                            message: 'Yes, but tonight I would like to go to the cinema.',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alex B.',
                    avatar: './assets/img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '15:30',
                            message: 'Remember to call grandma.',
                            status: 'sent'
                        },
                        {
                            date: '15:50',
                            message: 'Okay, I\'ll call her tonight.',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Olivia',
                    avatar: './assets/img/avatar_io.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '15:30',
                            message: 'Hi, any news?',
                            status: 'sent'
                        },
                        {
                            date: '15:50',
                            message: 'Not yet',
                            status: 'received'
                        },
                        {
                            date: '15:51',
                            message: 'If you have any news, let me know.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Paul',
                    avatar: './assets/img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '15:30',
                            message: 'Wish Martina a happy birthday!',
                            status: 'sent'
                        },
                        {
                            date: '15:50',
                            message: 'Oh Thank you for reminding me, I\'ll write to her right away!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'David',
                    avatar: './assets/img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '15:30',
                            message: 'Shall we go eat pizza tonight?',
                            status: 'received'
                        },
                        {
                            date: '15:50',
                            message: 'No, I already had it yesterday. Let\'s order sushi!',
                            status: 'sent'
                        },
                        {
                            date: '15:51',
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
            const leftEl = document.getElementById("left"); 
            leftEl.classList.add("d-none"); 
            const rightEl = document.getElementById("right");
            rightEl.classList.remove("d-none"); 
            rightEl.classList.add("w-100")

        },
        sendMessage() {
            const dateTime = luxon.DateTime
            this.isTyping = true

            if (this.newMessage.trim() != '') {
                this.contacts[this.activeContact].messages.push(
                    {
                        date: dateTime.now().setLocale('it').toLocaleString(dateTime.TIME_24_SIMPLE),
                        message: this.newMessage,
                        status: 'sent'
                    }
                )
                setTimeout(()=> {
                    const messageTimeEl = document.querySelector(".new_message_sent .time")
                    messageTimeEl.innerHTML = "<i class='fa-solid fa-check'</i>"
                }, 
                500
                )
                setTimeout(()=> {
                    const messageTimeEl = document.querySelector(".new_message_sent .time")
                    messageTimeEl.innerHTML = "<i class='fa-sharp fa-solid fa-check-double'></i>"
                }, 
                1000
                )

                setTimeout(() => {
                    const dateTime = luxon.DateTime
                    this.isTyping = false,
                    this.online = true
                    this.contacts[this.activeContact].messages.push(
                        {
                            date: dateTime.now().setLocale('it').toLocaleString(dateTime.TIME_24_SIMPLE),
                            message: this.randomAnswerList[this.randomAnswer(0, this.randomAnswerList.length - 1)],
                            status: 'received'
                        }
                    )
                   
                },

                    1000)
                setTimeout(() =>
                {
                    this.online = false 
                }, 
                3000) 
                this.newMessage = ""
            }

        },

        randomAnswer(min, max) {
            randomNumber= Math.floor(Math.random() * (max - min + 1))

            return randomNumber
        }, 

        deleteMessages() {
            this.contacts[this.activeContact].messages = []
        },
        deleteChat(){
            this.contacts.splice(this.activeContact, 1)
        }, 
        currentHour(){
            const currentDate = new Date; 
            currentHour = currentDate.getHours() + ":" + currentDate.getMinutes()
            return currentHour
        }, 
        comeBackToContacts(){
            const leftEl = document.getElementById("left"); 
            leftEl.classList.remove("d-none"); 
            leftEl.classList.add("w-100"); 
            const rightEl = document.getElementById("right");
            rightEl.classList.add("d-none")
        }, 
        addToImportant(contact, message){
            this.importantContact.push(contact)
            this.importantMessages.push(message)  
        }, 
        openImportantMessages(){
            const importantMessagesTitleEl = document.querySelector(".important_messages_title");
            const importantMessagesEl = document.getElementById("important_messages");
            const contactsEl = document.getElementById("contacts")
            contactsEl.classList.add("d-none") 

            if (importantMessagesEl.classList.contains("d-flex")) {
                importantMessagesEl.classList.remove("d-flex"); 
                importantMessagesEl.classList.add("d-none"); 
                contactsEl.classList.remove("d-none"); 
                importantMessagesTitleEl.classList.remove("d-block")
                importantMessagesTitleEl.classList.add("d-none")
            } else {
                importantMessagesEl.classList.remove("d-none"); 
                importantMessagesEl.classList.add("d-flex"); 
                importantMessagesTitleEl.classList.remove("d-none")
                importantMessagesTitleEl.classList.add("d-block")
               
            }
        }, 
        addNewContact(){
            if (this.newContactName.trim() === "") {
                alert("Please insert at least one character character")
            } else {
            this.contacts.push(
                {
                    name: this.newContactName, 
                    avatar: "https://picsum.photos/50/50", 
                    visible: true, 
                    messages: []
                }
            
            )
            this.newContactName =""
        } }, 
        notWorkingBtn () {
            alert("Sorry, this doesn't work, yet 😅 Let's try something else!")
        }

    }
}).mount('#app')


