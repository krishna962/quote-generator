async function getQuote() {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const languageElement = document.getElementById("language");
  const sentimentElement = document.getElementById("sentiment");

  quoteElement.textContent = "Loading...";
  authorElement.textContent = "";
  languageElement.textContent = "🌐 Language: Detecting...";
  sentimentElement.textContent = "🧠 Sentiment: Calculating...";

  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    const { quote, author } = data;

    quoteElement.textContent = `"${quote}"`;
    authorElement.textContent = `– ${author}`;

    detectLanguage(quote);
    analyzeSentiment(quote);
  } catch (err) {
    quoteElement.textContent = "Failed to fetch quote.";
  }
}

function detectLanguage(text) {
  // Simple detection using regex for demonstration
  const lang = /[а-яА-ЯЁё]/.test(text) ? "Russian" :
               /[ñáéíóú]/.test(text) ? "Spanish" :
               /[ء-ي]/.test(text) ? "Arabic" :
               "English";

  document.getElementById("language").textContent = `🌐 Language: ${lang}`;
}

function analyzeSentiment(text) {
  // Simple keyword-based sentiment detection
  const positiveWords = ["love", "happy", "success", "inspire", "joy"];
  const negativeWords = ["fail", "sad", "pain", "hate", "bad"];

  const lowerText = text.toLowerCase();
  let score = 0;

  positiveWords.forEach(word => { if (lowerText.includes(word)) score++; });
  negativeWords.forEach(word => { if (lowerText.includes(word)) score--; });

  const sentiment =
    score > 0 ? "Positive 😊" :
    score < 0 ? "Negative 😟" :
    "Neutral 😐";

  document.getElementById("sentiment").textContent = `🧠 Sentiment: ${sentiment}`;
}

function copyToClipboard() {
  const text = document.getElementById("quote").textContent + "\n" + document.getElementById("author").textContent;
  navigator.clipboard.writeText(text)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Copy failed."));
}

function tweetQuote() {
  const quote = document.getElementById("quote").textContent;
  const author = document.getElementById("author").textContent;
  const tweet = `${quote} ${author}`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, "_blank");
}

function speakQuote() {
  const text = document.getElementById("quote").textContent;
  const speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech);
}

function saveFavorite() {
  const quote = document.getElementById("quote").textContent;
  const author = document.getElementById("author").textContent;
  const entry = `${quote} ${author}`;
  const favList = document.getElementById("favList");

  const li = document.createElement("li");
  li.textContent = entry;
  favList.appendChild(li);
}

// Load first quote on page load
getQuote();
