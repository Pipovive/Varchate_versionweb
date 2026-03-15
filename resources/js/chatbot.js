document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotDelete = document.getElementById('chatbot-delete');

    if (!chatbotToggle) return;

    // Estado global del chatbot
    window.varchateChat = {
        context: 'General',
        history: [],
        
        // Función para cambiar visibilidad (activar/desactivar)
        setVisibility(visible) {
            if (visible) {
                chatbotToggle.classList.remove('chatbot-hidden');
            } else {
                chatbotToggle.classList.add('chatbot-hidden');
                chatbotWindow.style.display = 'none';
            }
        },
        
        // Función para actualizar el tema/contexto
        setContext(newContext) {
            this.context = newContext;
            console.log('Chatbot context updated to:', newContext);
        }
    };

    // Cargar historial
    const savedHistory = localStorage.getItem('varchate_chat_history');
    if (savedHistory && JSON.parse(savedHistory).length > 0) {
        window.varchateChat.history = JSON.parse(savedHistory);
        renderHistory();
    } else {
        // Saludo inicial solo si está vacío el historial COMPLETAMENTE
        const welcomeMsg = '¡Hola! Soy Varchate Cat. 🐾 ¿En qué puedo ayudarte hoy?';
        addMessage(welcomeMsg, 'bot', true);
    }

    // Abrir/Cerrar
    chatbotToggle.addEventListener('click', () => {
        const isVisible = chatbotWindow.style.display === 'flex';
        chatbotWindow.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) chatbotInput.focus();
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    // Enviar mensaje
    const sendMessage = async () => {
        const text = chatbotInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatbotInput.value = '';

        const typingEl = document.createElement('div');
        typingEl.className = 'typing';
        typingEl.textContent = 'Varchate Cat está pensando... 🐾';
        chatbotMessages.appendChild(typingEl);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        try {
            const response = await fetch('/api/chatbot/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                },
                body: JSON.stringify({ 
                    message: text,
                    context: window.varchateChat.context
                })
            });

            const data = await response.json();
            chatbotMessages.removeChild(typingEl);

            if (data.reply) {
                addMessage(data.reply, 'bot');
            } else {
                addMessage('¡Miau! Algo salió mal. Inténtalo de nuevo más tarde.', 'bot');
            }
        } catch (error) {
            if (typingEl.parentNode) chatbotMessages.removeChild(typingEl);
            addMessage('Lo siento, el servidor no responde. ¡Purr-don!', 'bot');
        }
    };

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Borrar chat
    if (chatbotDelete) {
        chatbotDelete.addEventListener('click', () => {
            if (confirm('¿Quieres borrar toda la conversación con Varchate Cat?')) {
                window.varchateChat.history = [];
                localStorage.removeItem('varchate_chat_history');
                chatbotMessages.innerHTML = '';
                addMessage('Chat borrado. ¡Empecemos de nuevo! 🐾', 'bot', false);
            }
        });
    }

    function addMessage(text, sender, save = true) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        
        // Formateo simple: **texto** -> <strong>texto</strong>
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        msgDiv.innerHTML = formattedText;
        
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        if (save) {
            window.varchateChat.history.push({ text, sender });
            localStorage.setItem('varchate_chat_history', JSON.stringify(window.varchateChat.history));
        }
    }

    function renderHistory() {
        chatbotMessages.innerHTML = '';
        window.varchateChat.history.forEach(msg => {
            addMessage(msg.text, msg.sender, false);
        });
    }
});
