// Language translations
const translations = {
  en: {
    // Alert variables
    noFileMessage: "No file selected!!!",
    // Home screen
    title: "Aryabhata",
    playBtn: "Play",
    // Settings
    settings: "Settings",
    selectLanguage: "Select your language:",
    close: "Close",
    // Game
    score: "Score",
    silver: "silver",
    reset: "Reset",
  },
  hi: {
    // Alert variables
    noFileMessage: "कोई CSV फ़ाइल चयनित नहीं है.",
    // Home screen
    title: "आर्यभट",
    playBtn: "खेलें",
    // Settings
    settings: "सेटिंग्स",
    selectLanguage: "भाषा चुनें:",
    close: "बंद",
    // Game
    score: "स्कोर",
    close: "बंद",
  },
  es: {
    // Alert variables
    noFileMessage: "No tienes un fichero de CSV en la selección.",
    // Home screen
    title: "Aryabhata",
    playBtn: "Jugar",
    // Game
    settings: "Configuraciones",
    selectLanguage: "Seleccionar tu idioma:",
    close: "Cerrar",
    // Game
    score: "Puntuación",
    silver: "plata",
    reset: "Cerrar",
  },
  ar: {
    // Alert variables
    noFileMessage: "لم يتم تحديد ملف CSV.",
    // Home screen
    title: "أريابهاتا - ويكيبيديا",
    playBtn: "لعب",
    // Settings
    settings: "الإعدادات",
    selectLanguage: "اختر اللغة:",
    close: "يغلق",
    // Game
    score: "الدرجة",
    silver: "فضي",
    reset: "يغلق",
  },
  fr: {
    // Alert variables
    noFileMessage: "Il n'y a fichier de CSV sélectionné.",
    // Home screen
    title: "Aryabhata",
    playBtn: "Jouer",
    // Settings
    settings: "Paramètres",
    selectLanguage: "Choisir ton langue:",
    close: "Fermer",
    // Game
    score: "Score",
    silver: "argent",
    reset: "Réinitialiser",
  },
  gu: {
    // Alert variables
    noFileMessage: "કોઈ CSV ફાઇલ પસંદ કરેલી નથી.",
    // Home screen
    title: "આર્યભટ્ટ",
    playBtn: "રમો",
    // Settings
    settings: "સેટિંગ્સ",
    selectLanguage: "ભાષા પસંદ કરો:",
    close: "બંધ",
    // Game
    score: "સ્કોર",
    reset: "બંધ",
  },
};

// Function to update language
function updateLanguage(lang) {
  const selectedLang = translations[lang];
  if (!selectedLang) return;

  // Update all text elements dynamically
  // Alert variables
  noFileMessage = selectedLang.noFileMessage;

  // Home screen
  document.querySelector("title").innerHTML = selectedLang.title;
  document.querySelector("h1#title").innerHTML = selectedLang.title;
  document.querySelector("#home #playBtn").innerHTML =
    '<i class="fa fa-gamepad"></i>&nbsp;' + selectedLang.playBtn;
  document.querySelector("#home #settingsBtn").innerHTML =
    '<i class="fa fa-gears"></i>&nbsp;' + selectedLang.settings;

  // Settings
  document.querySelector("#settings h2").innerHTML = selectedLang.settings;
  document.querySelector("#settings #selectLanguage").innerHTML =
    selectedLang.selectLanguage;

  // Game
  document.querySelector("#scoreText").innerHTML = selectedLang.score;
  langSilver = selectedLang.silver;
  document.querySelector("#langSilver").innerHTML = selectedLang.silver;
  document.querySelector("#resetBtn").innerHTML = selectedLang.reset;
}

// Add event listeners to language buttons
document.querySelectorAll("#settings .button").forEach((click) => {
  click.addEventListener("click", () => {
    const lang = click.getAttribute("data-lang");
    updateLanguage(lang);
  });
});
