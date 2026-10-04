import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://jyfycayhugfixdxqmmbz.supabase.com';
const supabaseKey = 'sb_publishable_vWkumLVZZBPfxtLMMHlXZw_Cv8FH6tp';
const supabase = createClient(supabaseUrl, supabaseKey);

let messages = [];
let currentIndex = 0;

async function fetchAllMessages() {
    const container = document.getElementById('messagesList');

    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false }); 

    if (error || !data || data.length === 0) {
        container.innerHTML = "<p style='color: white;'>لا توجد رسائل لعرضها حالياً.</p>";
        return;
    }

    messages = data;
    renderCarousel();
}

function renderCarousel() {
    const container = document.getElementById('messagesList');
    container.innerHTML = ''; 
    
    messages.forEach((msg, index) => {
        const card = document.createElement('div');
        card.className = 'message-card';
        
        const displayName = (msg.Name && msg.Name.trim() !== "") ? msg.Name : 'خريج';

        card.innerHTML = `
            <div class="message-text">
                <p>"${msg.message}"</p>
            </div>
            <div class="card-name-footer">
                ${displayName}
            </div>
        `;

        card.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });

        container.appendChild(card);
    });

    updateCarousel();
}

function updateCarousel() {
    const cards = document.querySelectorAll('.message-card');
    const totalCards = cards.length;
    
    cards.forEach((card, index) => {
        let diff = index - currentIndex;
        
        if (diff > totalCards / 2) diff -= totalCards;
        if (diff < -totalCards / 2) diff += totalCards;
        
        card.className = 'message-card';
        
        if (diff === 0) {
            card.classList.add('card-active');
        } else if (diff === 1) {
            card.classList.add('card-next');
        } else if (diff === -1) {
            card.classList.add('card-prev');
        } else if (diff === 2) {
            card.classList.add('card-next-2');
        } else if (diff === -2) {
            card.classList.add('card-prev-2');
        }
    });
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % messages.length;
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + messages.length) % messages.length;
    updateCarousel();
});

fetchAllMessages();