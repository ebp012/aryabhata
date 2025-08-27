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
        $('#scientificTab').style.fontSize = '12pt';
        $('#memoriseTab').style.fontSize = '12pt';
        // Navigation
        $('#homeTab span').innerHTML = translations.en.graphingTab;
        $('#scientificTab span').innerHTML = translations.en.scientificTab;
        $('#algebraTab span').innerHTML = translations.en.algebraTab;
        $('#unitsTab span').innerHTML = translations.en.unitsTab;
        $('#chemistryTab span').innerHTML = translations.en.chemistryTab;
        $('#learnTab span').innerHTML = translations.en.learnTab;
        $('#memoriseTab span').innerHTML = translations.en.memoriseTab;
        $('#parseTab span').innerHTML = translations.en.parseTab;
        $('#controlsTab span').innerHTML = translations.en.controlsTab;
        $('#graphing h1').innerHTML = translations.en.graphingTab;
        $('#scientific h1').innerHTML = translations.en.scientificTab;
        $('#algebra h1').innerHTML = translations.en.algebraTab;
        $('#units h1').innerHTML = translations.en.unitsTab;
        $('#chemistry h1').innerHTML = translations.en.chemistryTab;
        $('#learn h1').innerHTML = translations.en.learnTab;
        $('#memorise h1').innerHTML = translations.en.memoriseTab;
        $('#parse h1').innerHTML = translations.en.parseTab;
        $('#controls h1').innerHTML = translations.en.controlsTab;
        // Top row
        $('#xiv-title').innerHTML = translations.en.xivTitle;
        $('#xr-title').innerHTML = translations.en.xrTitle;
        $('#xi-title').innerHTML = translations.en.xiTitle;
        $('#graph-title').innerHTML = translations.en.graphTitle;
        $all('label[for="xiv-type-input"], label[for="xr-type-input"], label[for="xi-type-input"]').forEach(function(element) {
          element.innerHTML = translations.en.sliderInput;
        });
        // Bottom row
        $('#function-title').innerHTML = translations.en.functionTitle;
        if (nof == 1) $('#function-title').innerHTML = translations.en.functionTitle;
        else $('#function-title').innerHTML = translations.en.functionTitlePl;
        $('#trace-title').innerHTML = translations.en.traceTitle;
        $('#round-title').innerHTML = translations.en.roundTitle;
        $('#scale-title').innerHTML = translations.en.scaleTitle;
        // Graph settings
        $('label[for="graph-ticks"]').innerHTML = translations.en.graphTicks;
        $('label[for="graph-grids"]').innerHTML = translations.en.gridLines;
        $('label[for="graph-axes"]').innerHTML = translations.en.graphAxes;
        $('label[for="graph-points"]').innerHTML = translations.en.graphPoints;
        $('label[for="graph-scroll-xiv"]').innerHTML = translations.en.xivScroll;
        $('label[for="graph-advanced"]').innerHTML = translations.en.advancedOptions;
        break;
      case 'fr':
        $('#scientificTab').style.fontSize = '10pt';
        $('#memoriseTab').style.fontSize = '10pt';
        // Navigation
        $('#homeTab span').innerHTML = translations.fr.graphingTab;
        $('#scientificTab span').innerHTML = translations.fr.scientificTab;
        $('#algebraTab span').innerHTML = translations.fr.algebraTab;
        $('#unitsTab span').innerHTML = translations.fr.unitsTab;
        $('#chemistryTab span').innerHTML = translations.fr.chemistryTab;
        $('#learnTab span').innerHTML = translations.fr.learnTab;
        $('#memoriseTab span').innerHTML = translations.fr.memoriseTab;
        $('#parseTab span').innerHTML = translations.fr.parseTab;
        $('#controlsTab span').innerHTML = translations.fr.controlsTab;
        $('#graphing h1').innerHTML = translations.fr.graphingTab;
        $('#scientific h1').innerHTML = translations.fr.scientificTab;
        $('#algebra h1').innerHTML = translations.fr.algebraTab;
        $('#units h1').innerHTML = translations.fr.unitsTab;
        $('#chemistry h1').innerHTML = translations.fr.chemistryTab;
        $('#learn h1').innerHTML = translations.fr.learnTab;
        $('#memorise h1').innerHTML = translations.fr.memoriseTab;
        $('#parse h1').innerHTML = translations.fr.parseTab;
        $('#controls h1').innerHTML = translations.fr.controlsTab;
        // Top row
        $('#xiv-title').innerHTML = translations.fr.xivTitle;
        $('#xr-title').innerHTML = translations.fr.xrTitle;
        $('#xi-title').innerHTML = translations.fr.xiTitle;
        $('#graph-title').innerHTML = translations.fr.graphTitle;
        $all('label[for="xiv-type-input"], label[for="xr-type-input"], label[for="xi-type-input"]').forEach(function(element) {
          element.innerHTML = translations.fr.sliderInput;
        });
        // Bottom row
        if (nof == 1) $('#function-title').innerHTML = translations.fr.functionTitle;
        else $('#function-title').innerHTML = translations.fr.functionTitlePl;
        $('#trace-title').innerHTML = translations.fr.traceTitle;
        $('#round-title').innerHTML = translations.fr.roundTitle;
        $('#scale-title').innerHTML = translations.fr.scaleTitle;
        // Graph settings
        $('label[for="graph-ticks"]').innerHTML = translations.fr.graphTicks;
        $('label[for="graph-grids"]').innerHTML = translations.fr.gridLines;
        $('label[for="graph-axes"]').innerHTML = translations.fr.graphAxes;
        $('label[for="graph-points"]').innerHTML = translations.fr.graphPoints;
        $('label[for="graph-scroll-xiv"]').innerHTML = translations.fr.xivScroll;
        $('label[for="graph-advanced"]').innerHTML = translations.fr.advancedOptions;
        break;
    };
  },
};