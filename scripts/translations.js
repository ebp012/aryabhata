// Translations
var lang = navigator.language;
if (lang != 'en' && lang != 'fr') lang = 'en';
var translations = {
  en: {
    // Navigation
    launcherTab: 'Home',
    graphingTab: 'Graphing',
    scientificTab: 'Scientific',
    algebraTab: 'Algebra',
    unitsTab: 'Units',
    chemistryTab: 'Chemistry',
    learnTab: 'Learn',
    memoriseTab: 'Memorise',
    parseTab: 'Gloss',
    controlsTab: 'Controls',
    // Launcher Tab
    welcomeHeader: 'Welcome to Aryabhata!',
    welcomeText: 'Aryabhata is your <i>free</i> one-stop shop to a world of wonderful math, science, and linguistics tools.<br/>Below, you can find a variety of apps which you&#x0027;ll definitely find useful.',
    scientificHeader: 'Math and Science Tools',
    linguisticHeader: 'Memory and Linguistic Tools',
    // Graphing Tab
    functionsHeader: 'Functions',
    centreBtn: 'Centre',
    roundTitle: 'Round',
    scaleTitle: 'Scale',
    panningBtn: 'Panning',
    xivBtn: 'XI Viewport',
    gridlinesBtn: 'Gridlines',
    tickmarksBtn: 'Tickmarks',
  },
  fr: {
    // Navigation
    launcherTab: 'Acceuil',
    graphingTab: 'Graphe',
    scientificTab: 'Scientifique',
    algebraTab: 'Algebre',
    unitsTab: 'Unites',
    chemistryTab: 'Chimie',
    learnTab: 'Apprendre',
    memoriseTab: 'Se Rapeller',
    parseTab: 'Lustrer',
    controlsTab: 'Réglages',
    // Launcher Tab
    welcomeHeader: 'Bienvenue á Aryabhata!',
    welcomeText: 'Aryabhata est votre appli <i>gratuit</i> pour un monde des outiles mathématique, scientifique, et linguistique.<br/>Dessous, vous pouvez touver beaucoup des mini-applis que vous penserez très utiles.',
    scientificHeader: 'Outiles Scientifiques et Mathematiques',
    linguisticHeader: 'Outiles Linguistiques et pour le Memoire',
    // Graphing Tab
    functionsHeader: 'Fonctions',
    centreBtn: 'Centrer',
    roundTitle: 'Arrondir',
    scaleTitle: 'Échelonner',
    panningBtn: 'Fenêtre Primaire',
    xivBtn: 'Fenêtre XI',
    gridlinesBtn: 'Quadrillage',
    tickmarksBtn: 'Coches',
  },
  applyLang: function () {
    switch (lang) {
      case 'en':
        qs('#scientificTab').style.fontSize = '12pt';
        qs('#memoriseTab').style.fontSize = '12pt';
        // Navigation
        qs('#homeTab span').innerHTML = translations.en.launcherTab;
        qs('#graphingTab span').innerHTML = translations.en.graphingTab;
        qs('#scientificTab span').innerHTML = translations.en.scientificTab;
        qs('#algebraTab span').innerHTML = translations.en.algebraTab;
        qs('#unitsTab span').innerHTML = translations.en.unitsTab;
        qs('#chemistryTab span').innerHTML = translations.en.chemistryTab;
        qs('#learnTab span').innerHTML = translations.en.learnTab;
        qs('#memoriseTab span').innerHTML = translations.en.memoriseTab;
        qs('#parseTab span').innerHTML = translations.en.parseTab;
        qs('#controlsTab span').innerHTML = translations.en.controlsTab;
        qs('#graphing h1').innerHTML = translations.en.graphingTab;
        qs('#scientific h1').innerHTML = translations.en.scientificTab;
        qs('#algebra h1').innerHTML = translations.en.algebraTab;
        qs('#units h1').innerHTML = translations.en.unitsTab;
        qs('#chemistry h1').innerHTML = translations.en.chemistryTab;
        qs('#learn h1').innerHTML = translations.en.learnTab;
        qs('#memorise h1').innerHTML = translations.en.memoriseTab;
        qs('#parse h1').innerHTML = translations.en.parseTab;
        qs('#controls h1').innerHTML = translations.en.controlsTab;
        // Launcher Tab
        qs('#launcher-welcome-header').innerHTML = translations.en.welcomeHeader;
        qs('#launcher-welcome-text').innerHTML = translations.en.welcomeText;
        qs('#launcher-scientific').innerHTML = translations.en.scientificHeader;
        qs('#launcher-linguistic').innerHTML = translations.en.linguisticHeader;
        // Graphing Tab
        qs('#functions-header').innerHTML = translations.en.functionsHeader;
        qs('#graph-title').innerHTML = translations.en.graphingTab;
        qs('#function-title').innerHTML = translations.en.functionsHeader;
        qs('#centre-btn').innerHTML = translations.en.centreBtn;
        qs('#round-title').innerHTML = translations.en.roundTitle;
        qs('#scale-title').innerHTML = translations.en.scaleTitle;
        qs('#panning-btn').innerHTML = translations.en.panningBtn;
        qs('#xiviewport-btn').innerHTML = translations.en.xivBtn;
        qs('#gridlines-btn').innerHTML = translations.en.gridlinesBtn;
        qs('#tickmarks-btn').innerHTML = translations.en.tickmarksBtn;
        break;
      case 'fr':
        qs('#scientificTab').style.fontSize = '10pt';
        qs('#memoriseTab').style.fontSize = '10pt';
        // Navigation
        qs('#homeTab span').innerHTML = translations.en.launcherTab;
        qs('#graphingTab span').innerHTML = translations.fr.graphingTab;
        qs('#scientificTab span').innerHTML = translations.fr.scientificTab;
        qs('#algebraTab span').innerHTML = translations.fr.algebraTab;
        qs('#unitsTab span').innerHTML = translations.fr.unitsTab;
        qs('#chemistryTab span').innerHTML = translations.fr.chemistryTab;
        qs('#learnTab span').innerHTML = translations.fr.learnTab;
        qs('#memoriseTab span').innerHTML = translations.fr.memoriseTab;
        qs('#parseTab span').innerHTML = translations.fr.parseTab;
        qs('#controlsTab span').innerHTML = translations.fr.controlsTab;
        qs('#graphing h1').innerHTML = translations.fr.graphingTab;
        qs('#scientific h1').innerHTML = translations.fr.scientificTab;
        qs('#algebra h1').innerHTML = translations.fr.algebraTab;
        qs('#units h1').innerHTML = translations.fr.unitsTab;
        qs('#chemistry h1').innerHTML = translations.fr.chemistryTab;
        qs('#learn h1').innerHTML = translations.fr.learnTab;
        qs('#memorise h1').innerHTML = translations.fr.memoriseTab;
        qs('#parse h1').innerHTML = translations.fr.parseTab;
        qs('#controls h1').innerHTML = translations.fr.controlsTab;
        // Launcher Tab
        qs('#launcher-welcome-header').innerHTML = translations.fr.welcomeHeader;
        qs('#launcher-welcome-text').innerHTML = translations.fr.welcomeText;
        qs('#launcher-scientific').innerHTML = translations.fr.scientificHeader;
        qs('#launcher-linguistic').innerHTML = translations.fr.linguisticHeader;
        // Graphing Tab
        qs('#functions-header').innerHTML = translations.fr.functionsHeader;
        qs('#graph-title').innerHTML = translations.fr.graphingTab;
        qs('#function-title').innerHTML = translations.fr.functionsHeader;
        qs('#centre-btn').innerHTML = translations.fr.centreBtn;
        qs('#round-title').innerHTML = translations.fr.roundTitle;
        qs('#scale-title').innerHTML = translations.fr.scaleTitle;
        qs('#panning-btn').innerHTML = translations.fr.panningBtn;
        qs('#xiviewport-btn').innerHTML = translations.fr.xivBtn;
        qs('#gridlines-btn').innerHTML = translations.fr.gridlinesBtn;
        qs('#tickmarks-btn').innerHTML = translations.fr.tickmarksBtn;
        break;
    };
  },
};
