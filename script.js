const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const historyList = document.getElementById("chat-history");
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-btn");

let chats = [];
let currentChat = [];
let hasSuggested = false;

/* 📱 Mobile sidebar toggle */
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

/* 🌟 Initial message */
addBotMessage("Hi 👋 I’m Gifty AI. Ask me for gift ideas 🎁");

/* Send handlers */
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

/* =============================
   MAIN SEND FUNCTION
============================= */
function sendMessage(textFromButton = null) {
  const text = (textFromButton || input.value).trim();
  if (!text) return;

  addUserMessage(text);
  currentChat.push({ role: "user", text });
  input.value = "";

  setTimeout(() => {
    const reply = getGiftyReply(text);
    addBotMessage(reply);
    currentChat.push({ role: "bot", text: reply });

    saveChat();
    attachButtonHandlers();
  }, 400);
}

/* =============================
   GIFTY INTELLIGENCE (MERGED)
============================= */
function getGiftyReply(message) {
  const userMessage = message.toLowerCase();
  let reply = "";

  /* 1️⃣ Q&A */
  const qaData = [
    { q: "what is gifty", a: "🎁 Gifty is an AI-powered assistant that helps you find perfect gifts for any occasion." },
    { q: "who created you", a: "💡 I was created by the Sindhu Sri Gavini to make gifting smarter and easier!" },
    { q: "how to use gifty", a: "Simply tell me the occasion or person, and I’ll suggest thoughtful gifts instantly." },
    { q: "what can you do", a: "I can suggest personalized gifts, share product links, and help you explore ideas for birthdays, anniversaries, farewells, and more!" },
    { q: "hi", a: "👋 Hi! I’m Gifty — your personal gifting assistant. What are you celebrating today?" },
    { q: "hello", a: "🌟 Hello there! Tell me your occasion and I’ll find amazing gift options for you!" }
  ];

  const match = qaData.find(pair => userMessage.includes(pair.q));
  if (match) return match.a;

  /* 2️⃣ Occasion buttons */
  if (userMessage.includes("gift") || userMessage.includes("occasion")) {
    return `
      💡 Here are some popular gift occasions you can explore 🎁<br><br>
      <div class="button-container">
        <button data-msg="birthday">🎂 Birthday</button>
        <button data-msg="anniversary">💖 Anniversary</button>
        <button data-msg="valentine">❤️ Valentine’s Day</button>
        <button data-msg="farewell">👋 Farewell</button>
        <button data-msg="annual">🏆 Annual Day</button>
      </div>
    `;
  }

  /* 3️⃣ Birthday */
  if (userMessage.includes("birthday")) {
    return `
      🎂 <b>Birthday Gift Ideas</b><br><br>
      <ul>
        <li><a href="https://www.amazon.in/s?k=birthday+explosion+box" target="_blank">🎁 Explosion Box – Amazon</a></li>
        <li><a href="https://www.amazon.in/s?k=personalized+birthday+mug" target="_blank">☕ Personalized Mug – Amazon</a></li>
        <li><a href="https://www.flipkart.com/search?q=birthday+gift+combo" target="_blank">🎉 Gift Combo – Flipkart</a></li>
        <li><a href="https://www.flipkart.com/search?q=birthday+greeting+card" target="_blank">🎈 Greeting Card – Flipkart</a></li>
      </ul>
    `;
  }

  /* 4️⃣ Anniversary */
  if (userMessage.includes("anniversary")) {
    return `
      💖 <b>Anniversary Gift Ideas</b><br><br>
      <ul>
        <li><a href="https://www.amazon.in/s?k=couple+photo+frame+anniversary" target="_blank">💞 Couple Frame – Amazon</a></li>
        <li><a href="https://www.amazon.in/s?k=heart+led+lamp+anniversary" target="_blank">💡 Heart LED Lamp – Amazon</a></li>
        <li><a href="https://www.flipkart.com/search?q=anniversary+gift+box" target="_blank">🎁 Gift Box – Flipkart</a></li>
        <li><a href="https://www.flipkart.com/search?q=romantic+candle+set" target="_blank">🕯️ Candle Set – Flipkart</a></li>
      </ul>
    `;
  }

  /* 5️⃣ Valentine */
  if (userMessage.includes("valentine")) {
    return `
      ❤️ <b>Valentine’s Day Gift Ideas</b><br><br>
      <ul>
        <li><a href="https://www.amazon.in/s?k=valentine+gift+hamper" target="_blank">💌 Gift Hamper – Amazon</a></li>
        <li><a href="https://www.amazon.in/s?k=love+explosion+box" target="_blank">💖 Love Explosion Box – Amazon</a></li>
        <li><a href="https://www.flipkart.com/search?q=valentine+gift+combo" target="_blank">🎁 Combo Set – Flipkart</a></li>
        <li><a href="https://www.flipkart.com/search?q=rose+teddy+gift" target="_blank">🌹 Rose Teddy – Flipkart</a></li>
      </ul>
    `;
  }

  /* 6️⃣ Farewell */
  if (userMessage.includes("farewell")) {
    return `
      👋 <b>Farewell Gift Ideas</b><br><br>
      <ul>
        <li><a href="https://www.amazon.in/s?k=farewell+mug" target="_blank">☕ Goodbye Mug – Amazon</a></li>
        <li><a href="https://www.amazon.in/s?k=farewell+diary" target="_blank">📖 Diary – Amazon</a></li>
        <li><a href="https://www.flipkart.com/search?q=farewell+gift+combo" target="_blank">🎁 Combo Gift – Flipkart</a></li>
        <li><a href="https://www.flipkart.com/search?q=pen+set+gift" target="_blank">🖊️ Pen Set – Flipkart</a></li>
      </ul>
    `;
  }

  /* 7️⃣ Annual Day */
  if (userMessage.includes("annual")) {
    return `
      🏆 <b>Annual Day Gift Ideas</b><br><br>
      <ul>
        <li><a href="https://www.amazon.in/s?k=corporate+trophy+gift" target="_blank">🏅 Trophy – Amazon</a></li>
        <li><a href="https://www.amazon.in/s?k=appreciation+plaque+award" target="_blank">🎖️ Plaque Award – Amazon</a></li>
        <li><a href="https://www.flipkart.com/search?q=employee+gift+set" target="_blank">🎁 Gift Set – Flipkart</a></li>
        <li><a href="https://www.flipkart.com/search?q=office+desk+decor+gift" target="_blank">🕯️ Desk Decor – Flipkart</a></li>
      </ul>
    `;
  }

  /* 8️⃣ Fallback */
  return "🤔 I’m not sure about that. Try asking about birthdays, anniversaries, farewells, or gifts!";
}

/* =============================
   BUTTON CLICK HANDLER
============================= */
function attachButtonHandlers() {
  document.querySelectorAll("button[data-msg]").forEach(btn => {
    btn.onclick = () => sendMessage(btn.dataset.msg);
  });
}

/* =============================
   UI HELPERS
============================= */
function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "user-message";
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(html) {
  const div = document.createElement("div");
  div.className = "bot-message";
  div.innerHTML = html;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* =============================
   CHAT HISTORY WITH PREVIEW
============================= */
function saveChat() {
  if (!currentChat.length) return;

  const title =
    currentChat.find(m => m.role === "user")?.text.slice(0, 30) || "New Chat";

  chats.push([...currentChat]);

  const item = document.createElement("li");
  item.textContent = title;
  item.onclick = () => loadChat(chats.length - 1);
  historyList.appendChild(item);

  currentChat = [];
}

function loadChat(index) {
  chatBox.innerHTML = "";
  chats[index].forEach(msg =>
    msg.role === "user"
      ? addUserMessage(msg.text)
      : addBotMessage(msg.text)
  );

  if (window.innerWidth < 768) sidebar.classList.remove("open");
}
