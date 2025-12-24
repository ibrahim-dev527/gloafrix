/**
 * GloAfrix Chatbot - Complete Logic
 * Frontend-only chatbot with localStorage persistence
 * Version: 1.0.0
 * 
 * HOW IT WORKS:
 * 1. User clicks chatbot button
 * 2. If first time, requests name & contact
 * 3. Stores info in localStorage
 * 4. Shows predefined questions
 * 5. Responds from knowledge base
 * 6. Allows typed custom questions
 */

// ============================================
// KNOWLEDGE BASE (Easy to Update)
// ============================================

/**
 * CHATBOT KNOWLEDGE BASE
 * 
 * To add new questions/answers:
 * 1. Add to 'questions' array for quick replies
 * 2. Add to 'knowledgeBase' object with Q&A pairs
 * 
 * You can also load this from a JSON file:
 * fetch('knowledge.json').then(r => r.json()).then(data => { knowledgeBase = data; })
 */

const CHATBOT_CONFIG = {
    // Bot information
    botName: 'GloBot',
    botGreeting: 'Hi! I\'m GloBot, your GloAfrix assistant. How can I help you today?',
    
    // Quick reply questions (shown as clickable buttons)
    quickReplies: [
        'How do I place an order?',
        'What payment methods do you accept?',
        'How long does delivery take?',
        'How do I track my order?',
        'What is your return policy?',
        'How do I become a vendor?'
    ],
    
    // Knowledge base - Q&A pairs
    knowledgeBase: {
        // Orders & Shopping
        'how do i place an order': 'To place an order: 1) Browse products and click "Add to Cart", 2) Go to your cart and click "Checkout", 3) Enter shipping address, 4) Select payment method, 5) Confirm order. You\'ll receive a confirmation email!',
        
        'order': 'To place an order, browse our products, add items to cart, and proceed to checkout. Need help with a specific part of the process?',
        
        'how do i track my order': 'You can track your order by: 1) Logging into your account, 2) Going to "My Orders", 3) Clicking on the order number. You\'ll see real-time tracking updates and receive SMS/email notifications.',
        
        'track': 'Log into your account and go to "My Orders" to track your shipment in real-time.',
        
        // Payments
        'what payment methods do you accept': 'We accept: Credit/Debit Cards (Visa, Mastercard), Mobile Money (MTN, Vodafone, AirtelTigo), Bank Transfer, and Cash on Delivery (selected areas). All payments are secure and encrypted.',
        
        'payment': 'We accept cards, mobile money, bank transfers, and cash on delivery. All transactions are secure.',
        
        'mobile money': 'Yes! We accept MTN Mobile Money, Vodafone Cash, and AirtelTigo Money. Select "Mobile Money" at checkout.',
        
        // Delivery & Shipping
        'how long does delivery take': 'Delivery times: Same city (1-3 days), Within Ghana (3-7 days), Cross-border (7-14 days). Exact time shown at checkout. Track your order for real-time updates!',
        
        'delivery': 'Delivery takes 1-3 days for same city, 3-7 days within Ghana. You can track your order in real-time.',
        
        'shipping cost': 'Shipping costs depend on item size, weight, and destination. The exact cost is calculated at checkout. Many vendors offer free shipping on orders above certain amounts!',
        
        // Returns & Refunds
        'what is your return policy': 'You can return items within 7 days of delivery. Items must be unused and in original packaging. Go to "My Orders", click "Request Return", and follow the steps. Refunds take 5-10 business days.',
        
        'return': 'Returns accepted within 7 days. Items must be unused in original packaging. Refunds processed in 5-10 days.',
        
        'refund': 'Refunds are processed within 5-10 business days after we receive your returned item. The amount goes back to your original payment method.',
        
        // Vendor/Selling
        'how do i become a vendor': 'To become a vendor: 1) Click "Sell on GloAfrix" in the footer, 2) Complete registration with business details, 3) Submit required documents, 4) Wait for approval (2-3 days), 5) Start listing products!',
        
        'vendor': 'Click "Sell on GloAfrix" in the footer to start the vendor registration process. Approval takes 2-3 business days.',
        
        'sell': 'You can sell on GloAfrix by registering as a vendor. We charge 10% commission per sale with no monthly fees.',
        
        // Freelancing
        'freelancer': 'Apply to become a freelancer through the "Become a Freelancer" page. Submit your portfolio, skills, and experience. Approval takes 24-48 hours.',
        
        'freelancing': 'We offer freelancing services in design, development, marketing, writing, and more. Click "Services" to explore or "Become a Freelancer" to join.',
        
        // Account & Security
        'forgot password': 'Click "Forgot Password" on the login page, enter your email, and check your inbox for a reset link. The link expires in 24 hours.',
        
        'password': 'To reset your password, click "Forgot Password" on the login page and follow the email instructions.',
        
        'account': 'Create an account by clicking "Sign Up". You\'ll need an email address and can sign up in less than 2 minutes.',
        
        // General Help
        'contact': 'You can contact us at support@gloafrix.com, call +233 XX XXX XXXX, or visit our Help Center for instant answers.',
        
        'help': 'I can help with orders, payments, shipping, returns, vendor registration, and more. What do you need help with?',
        
        'hours': 'Our customer support is available 24/7. You can also chat with me anytime for instant answers!',
        
        // Default responses for common queries
        'hi': 'Hello! How can I assist you today?',
        'hello': 'Hi there! What can I help you with?',
        'hey': 'Hey! How can I help you today?',
        'thanks': 'You\'re welcome! Is there anything else I can help you with?',
        'thank you': 'You\'re welcome! Happy to help! 😊',
        'bye': 'Goodbye! Feel free to come back anytime you need help!',
        
        // Fallback
        'default': 'I\'m not sure about that. Could you rephrase your question? Or contact our support team at support@gloafrix.com for personalized help.'
    }
};

// ============================================
// CHATBOT STATE MANAGEMENT
// ============================================

let chatbotState = {
    isOpen: false,
    userInfoCollected: false,
    userName: null,
    userContact: null,
    messageHistory: [],
    waitingForUserInfo: false
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
    loadUserInfo();
});

/**
 * Initialize chatbot UI and event listeners
 */
function initializeChatbot() {
    console.log('🤖 GloAfrix Chatbot initialized');
    
    // Button click event
    const chatButton = document.getElementById('chatbotButton');
    const closeBtn = document.getElementById('chatbotClose');
    
    if (chatButton) {
        chatButton.addEventListener('click', toggleChatbot);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeChatbot);
    }
    
    // Send message events
    const sendBtn = document.getElementById('chatbotSend');
    const input = document.getElementById('chatbotInput');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // User info form submission
    const userInfoForm = document.getElementById('userInfoForm');
    if (userInfoForm) {
        userInfoForm.addEventListener('submit', handleUserInfoSubmit);
    }
}

/**
 * Load user info from localStorage
 */
function loadUserInfo() {
    try {
        const stored = localStorage.getItem('gloafrix_chatbot_user');
        if (stored) {
            const userData = JSON.parse(stored);
            chatbotState.userInfoCollected = true;
            chatbotState.userName = userData.name;
            chatbotState.userContact = userData.contact;
            console.log('✅ User info loaded from storage');
        }
    } catch (e) {
        console.error('Error loading user info:', e);
    }
}

/**
 * Save user info to localStorage
 */
function saveUserInfo(name, contact) {
    try {
        const userData = { name, contact, timestamp: Date.now() };
        localStorage.setItem('gloafrix_chatbot_user', JSON.stringify(userData));
        chatbotState.userInfoCollected = true;
        chatbotState.userName = name;
        chatbotState.userContact = contact;
        console.log('✅ User info saved to storage');
    } catch (e) {
        console.error('Error saving user info:', e);
    }
}

// ============================================
// CHATBOT TOGGLE LOGIC
// ============================================

/**
 * Toggle chatbot window open/close
 */
function toggleChatbot() {
    if (chatbotState.isOpen) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

/**
 * Open chatbot window
 */
function openChatbot() {
    const button = document.getElementById('chatbotButton');
    const window = document.getElementById('chatbotWindow');
    
    button.classList.add('active');
    window.classList.add('active');
    chatbotState.isOpen = true;
    
    // If first time opening, show greeting
    if (chatbotState.messageHistory.length === 0) {
        setTimeout(() => {
            if (!chatbotState.userInfoCollected) {
                // Request user info first
                requestUserInfo();
            } else {
                // Show greeting with user's name
                showBotMessage(`Hi ${chatbotState.userName}! ${CHATBOT_CONFIG.botGreeting}`);
                showQuickReplies();
            }
        }, 300);
    }
    
    // Focus input
    const input = document.getElementById('chatbotInput');
    if (input && chatbotState.userInfoCollected) {
        setTimeout(() => input.focus(), 400);
    }
}

/**
 * Close chatbot window
 */
function closeChatbot() {
    const button = document.getElementById('chatbotButton');
    const window = document.getElementById('chatbotWindow');
    
    button.classList.remove('active');
    window.classList.remove('active');
    chatbotState.isOpen = false;
}

// ============================================
// USER INFO COLLECTION
// ============================================

/**
 * Request user information before first interaction
 */
function requestUserInfo() {
    chatbotState.waitingForUserInfo = true;
    
    const welcomeMsg = 'Welcome to GloAfrix! Before we start, I\'d like to know who I\'m talking to. 😊';
    const formHTML = `
        <div class="user-info-form">
            <div class="form-group">
                <label for="userName">Your Full Name</label>
                <input type="text" id="userName" placeholder="John Doe" required>
            </div>
            <div class="form-group">
                <label for="userContact">Email or Phone Number</label>
                <input type="text" id="userContact" placeholder="john@example.com or +233 XX XXX XXXX" required>
            </div>
            <button type="button" class="form-submit-btn" onclick="submitUserInfo()">Continue</button>
        </div>
    `;
    
    showBotMessage(welcomeMsg);
    showBotMessage(formHTML, true); // true = raw HTML
}

/**
 * Submit user information
 */
function submitUserInfo() {
    const nameInput = document.getElementById('userName');
    const contactInput = document.getElementById('userContact');
    
    if (!nameInput || !contactInput) return;
    
    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();
    
    if (!name || !contact) {
        alert('Please fill in both fields');
        return;
    }
    
    // Save to localStorage
    saveUserInfo(name, contact);
    
    // Show confirmation and proceed
    showUserMessage(`My name is ${name} and you can reach me at ${contact}`);
    
    setTimeout(() => {
        showBotMessage(`Great to meet you, ${name}! ${CHATBOT_CONFIG.botGreeting}`);
        chatbotState.waitingForUserInfo = false;
        showQuickReplies();
    }, 800);
}

/**
 * Handle user info form submit (alternative method)
 */
function handleUserInfoSubmit(e) {
    e.preventDefault();
    submitUserInfo();
}

// ============================================
// MESSAGE HANDLING
// ============================================

/**
 * Send user message
 */
function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSend');
    
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Show user message
    showUserMessage(message);
    
    // Clear input
    input.value = '';
    sendBtn.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message and respond
    setTimeout(() => {
        hideTypingIndicator();
        const response = getResponse(message);
        showBotMessage(response);
        sendBtn.disabled = false;
        input.focus();
    }, 1000 + Math.random() * 500); // Random delay for natural feel
}

/**
 * Handle quick reply button click
 */
function handleQuickReply(question) {
    // Show user's selected question
    showUserMessage(question);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get and show response
    setTimeout(() => {
        hideTypingIndicator();
        const response = getResponse(question);
        showBotMessage(response);
    }, 800);
}

/**
 * Get response from knowledge base
 */
function getResponse(question) {
    const lowerQuestion = question.toLowerCase().trim();
    const kb = CHATBOT_CONFIG.knowledgeBase;
    
    // Exact match
    if (kb[lowerQuestion]) {
        return kb[lowerQuestion];
    }
    
    // Partial match (keyword search)
    for (const [key, value] of Object.entries(kb)) {
        if (lowerQuestion.includes(key) || key.includes(lowerQuestion)) {
            return value;
        }
    }
    
    // Check for individual words
    const words = lowerQuestion.split(' ');
    for (const word of words) {
        if (word.length > 3 && kb[word]) { // Only check words > 3 chars
            return kb[word];
        }
    }
    
    // Default response
    return kb['default'];
}

// ============================================
// MESSAGE DISPLAY
// ============================================

/**
 * Show bot message
 */
function showBotMessage(content, isHTML = false) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (isHTML) {
        contentDiv.innerHTML = content;
    } else {
        contentDiv.textContent = content;
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    // Save to history
    chatbotState.messageHistory.push({ type: 'bot', content });
}

/**
 * Show user message
 */
function showUserMessage(content) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = chatbotState.userName ? chatbotState.userName.charAt(0).toUpperCase() : '👤';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    // Save to history
    chatbotState.messageHistory.push({ type: 'user', content });
}

/**
 * Show quick reply buttons
 */
function showQuickReplies() {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    
    const quickRepliesDiv = document.createElement('div');
    quickRepliesDiv.className = 'quick-replies';
    
    CHATBOT_CONFIG.quickReplies.forEach(question => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = question;
        btn.onclick = () => handleQuickReply(question);
        quickRepliesDiv.appendChild(btn);
    });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<strong>Common questions:</strong>';
    contentDiv.appendChild(quickRepliesDiv);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.classList.add('active');
        scrollToBottom();
    }
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.classList.remove('active');
    }
}

/**
 * Scroll messages to bottom
 */
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (messagesContainer) {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Clear chat history (for testing)
 */
function clearChatHistory() {
    chatbotState.messageHistory = [];
    const messagesContainer = document.getElementById('chatbotMessages');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }
    console.log('Chat history cleared');
}

/**
 * Reset user info (for testing)
 */
function resetUserInfo() {
    localStorage.removeItem('gloafrix_chatbot_user');
    chatbotState.userInfoCollected = false;
    chatbotState.userName = null;
    chatbotState.userContact = null;
    console.log('User info reset');
}

/**
 * Export chat transcript
 */
function exportChatTranscript() {
    const transcript = chatbotState.messageHistory.map(msg => 
        `[${msg.type.toUpperCase()}]: ${msg.content}`
    ).join('\n\n');
    
    console.log('=== CHAT TRANSCRIPT ===\n' + transcript);
    return transcript;
}

// ============================================
// KNOWLEDGE BASE MANAGEMENT
// ============================================

/**
 * Add new Q&A to knowledge base
 * Usage: addKnowledge('new question', 'answer to the question')
 */
function addKnowledge(question, answer) {
    const key = question.toLowerCase().trim();
    CHATBOT_CONFIG.knowledgeBase[key] = answer;
    console.log(`✅ Added: "${question}" → "${answer}"`);
}

/**
 * Load knowledge from external JSON file
 * Usage: loadKnowledgeFromJSON('knowledge.json')
 */
async function loadKnowledgeFromJSON(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        Object.assign(CHATBOT_CONFIG.knowledgeBase, data);
        console.log('✅ Knowledge base loaded from JSON');
    } catch (error) {
        console.error('Error loading knowledge base:', error);
    }
}

// ============================================
// EXPOSE GLOBAL FUNCTIONS
// ============================================

// Make functions available globally for onclick handlers
window.toggleChatbot = toggleChatbot;
window.closeChatbot = closeChatbot;
window.sendMessage = sendMessage;
window.handleQuickReply = handleQuickReply;
window.submitUserInfo = submitUserInfo;
window.clearChatHistory = clearChatHistory;
window.resetUserInfo = resetUserInfo;
window.addKnowledge = addKnowledge;
window.loadKnowledgeFromJSON = loadKnowledgeFromJSON;