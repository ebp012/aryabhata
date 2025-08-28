// Translations
var lang = navigator.language;
if (lang != 'en' && lang != 'fr') lang = 'en';
var translations = {
  en: {
    // Navigation
    graphingTab: 'Graphing',
    scientificTab: 'Scientific',
    algebraTab: 'Algebra',
    unitsTab: 'Units',
    chemistryTab: 'Chemistry',
    learnTab: 'Learn',
    memoriseTab: 'Memorise',
    parseTab: 'Parse',
    controlsTab: 'Controls',
    // Top row
    xivTitle: 'x-i Viewport',
    xrTitle: 'x-r Trace',
    xiTitle: 'x-i Trace',
    graphTitle: 'Graph',
    sliderInput: 'Slider input?',
    // Bottom row
    functionTitle: 'Function',
    functionTitlePl: 'Functions',
    traceTitle: 'Trace',
    roundTitle: 'Round',
    scaleTitle: 'Scale',
    // Graph settings
    graphTicks: 'Tick marks?',
    gridLines: 'Grid lines?',
    graphAxes: 'Graph axes?',
    graphPoints: 'Graph points?',
    xivScroll: 'Scroll for x-iv?',
    advancedOptions: 'Advanced options?',
  },
  fr: {
    // Navigation
    graphingTab: 'Graphe',
    scientificTab: 'Scientifique',
    algebraTab: 'Algebre',
    unitsTab: 'Unites',
    chemistryTab: 'Chimie',
    learnTab: 'Apprendre',
    memoriseTab: 'Se Rapeller',
    parseTab: 'Parser',
    controlsTab: 'Réglages',
    // Top row
    xivTitle: 'Fenêtre d\'x-i',
    xrTitle: 'Traçage d\'x-r',
    xiTitle: 'Traçage d\'x-i',
    graphTitle: 'Graphe',
    sliderInput: 'Inputer par range?',
    // Row
    functionTitle: 'Fonction',
    functionTitlePl: 'Fonctions',
    traceTitle: 'Traçage',
    roundTitle: 'Arrondage',
    scaleTitle: 'Scalage',
    // Graph settings
    graphTicks: 'Coches des axes?',
    gridLines: 'Lignes de graphe?',
    graphAxes: 'Axes de graphe?',
    graphPoints: 'Points de graphe?',
    xivScroll: 'Defiller pour x-iv?',
    advancedOptions: 'Options avancées?',
  },
  applyLang: function () {
    switch (lang) {
      case 'en':
        qs('#scientificTab').style.fontSize = '12pt';
        qs('#memoriseTab').style.fontSize = '12pt';
        // Navigation
        qs('#homeTab span').innerHTML = translations.en.graphingTab;
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
        // Top row
        qs('#xiv-title').innerHTML = translations.en.xivTitle;
        qs('#xr-title').innerHTML = translations.en.xrTitle;
        qs('#xi-title').innerHTML = translations.en.xiTitle;
        qs('#graph-title').innerHTML = translations.en.graphTitle;
        qsa('label[for="xiv-type-input"], label[for="xr-type-input"], label[for="xi-type-input"]').forEach(function(element) {
          element.innerHTML = translations.en.sliderInput;
        });
        // Bottom row
        qs('#function-title').innerHTML = translations.en.functionTitle;
        if (nof == 1) qs('#function-title').innerHTML = translations.en.functionTitle;
        else qs('#function-title').innerHTML = translations.en.functionTitlePl;
        qs('#trace-title').innerHTML = translations.en.traceTitle;
        qs('#round-title').innerHTML = translations.en.roundTitle;
        qs('#scale-title').innerHTML = translations.en.scaleTitle;
        // Graph settings
        qs('label[for="graph-ticks"]').innerHTML = translations.en.graphTicks;
        qs('label[for="graph-grids"]').innerHTML = translations.en.gridLines;
        qs('label[for="graph-axes"]').innerHTML = translations.en.graphAxes;
        qs('label[for="graph-points"]').innerHTML = translations.en.graphPoints;
        qs('label[for="graph-scroll-xiv"]').innerHTML = translations.en.xivScroll;
        qs('label[for="graph-advanced"]').innerHTML = translations.en.advancedOptions;
        break;
      case 'fr':
        qs('#scientificTab').style.fontSize = '10pt';
        qs('#memoriseTab').style.fontSize = '10pt';
        // Navigation
        qs('#homeTab span').innerHTML = translations.fr.graphingTab;
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
        // Top row
        qs('#xiv-title').innerHTML = translations.fr.xivTitle;
        qs('#xr-title').innerHTML = translations.fr.xrTitle;
        qs('#xi-title').innerHTML = translations.fr.xiTitle;
        qs('#graph-title').innerHTML = translations.fr.graphTitle;
        qsa('label[for="xiv-type-input"], label[for="xr-type-input"], label[for="xi-type-input"]').forEach(function(element) {
          element.innerHTML = translations.fr.sliderInput;
        });
        // Bottom row
        if (nof == 1) qs('#function-title').innerHTML = translations.fr.functionTitle;
        else qs('#function-title').innerHTML = translations.fr.functionTitlePl;
        qs('#trace-title').innerHTML = translations.fr.traceTitle;
        qs('#round-title').innerHTML = translations.fr.roundTitle;
        qs('#scale-title').innerHTML = translations.fr.scaleTitle;
        // Graph settings
        qs('label[for="graph-ticks"]').innerHTML = translations.fr.graphTicks;
        qs('label[for="graph-grids"]').innerHTML = translations.fr.gridLines;
        qs('label[for="graph-axes"]').innerHTML = translations.fr.graphAxes;
        qs('label[for="graph-points"]').innerHTML = translations.fr.graphPoints;
        qs('label[for="graph-scroll-xiv"]').innerHTML = translations.fr.xivScroll;
        qs('label[for="graph-advanced"]').innerHTML = translations.fr.advancedOptions;
        break;
    };
  },
};