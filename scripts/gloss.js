// Advanced linguistic analysis functions
function getCase(term, doc) {
  if (term.has("'s")) return 'GEN';  // Genitive case
  if (term.pronouns().length > 0) {
    const pronoun = term.pronouns().text().toLowerCase();
    if (['i', 'we', 'he', 'she', 'they'].includes(pronoun)) return 'NOM';
    if (['me', 'us', 'him', 'her', 'them'].includes(pronoun)) return 'ACC';
  }
  return null;
}

function getNumber(term) {
  if (term.isPlural()) return 'PL';
  return 'SG';
}

function getPerson(term) {
  const pronounMap = {
    'i': '1', 'we': '1',
    'you': '2',
    'he': '3', 'she': '3', 'it': '3', 'they': '3'
  };
  const pronoun = term.pronouns().text().toLowerCase();
  return pronounMap[pronoun] || '3';  // Default to 3rd person
}

function getTense(verb) {
  // Handle past participles with -en
  if (verb.text().match(/[a-z]en$/)) return 'PST.PTCP';
  if (verb.has('will')) return 'FUT';
  if (verb.has('had')) return 'PST.PRF';
  if (verb.has('have')) return 'PRF';
  if (verb.isPast()) return 'PST';
  if (verb.has('ing')) return 'PROG';
  return 'PRS';
}

function getMood(verb) {
  if (verb.has('would') || verb.has('could') || verb.has('should')) return 'COND';
  if (verb.has('may') || verb.has('might')) return 'SBJV';
  if (verb.has('must') || verb.has('have to')) return 'NEC';
  return 'IND';
}

function getVoice(verb) {
  if (verb.has('been') && verb.has('by')) return 'PASS';
  return 'ACT';
}

function getAspect(verb) {
  if (verb.has('been') && verb.has('ing')) return 'PROG';
  if (verb.has('have') || verb.has('had')) return 'PRF';
  if (verb.has('ing')) return 'PROG';
  return 'IPFV';
}

function analyzeMorphemes(word, doc) {
  const term = doc.match(word);
  
  // Basic info
  let pos = term.terms(0).pos;
  let tags = [];
  
  // Check for dialectal features first
  const dialectalFeatures = getDialectalFeatures(term, doc);
  if (dialectalFeatures.length > 0) {
    tags.push(...dialectalFeatures);
  }
  
  // Nouns
  if (term.nouns().length > 0) {
    const nounCase = getCase(term, doc);
    const number = getNumber(term);
    tags.push('N');
    if (nounCase) tags.push(nounCase);
    tags.push(number);
  }
  
  // Verbs 
  else if (term.verbs().length > 0) {
    const tense = getTense(term);
    const mood = getMood(term);
    const voice = getVoice(term);
    const aspect = getAspect(term);
    const person = getPerson(term);
    
    tags.push('V');
    tags.push(tense);
    tags.push(mood);
    tags.push(voice);
    tags.push(aspect);
    if (person) tags.push(person + 'SG');
  }
  
  // Adjectives
  else if (term.adjectives().length > 0) {
    tags.push('ADJ');
    if (term.has('er')) tags.push('CMPR');
    if (term.has('est')) tags.push('SUPR');
  }
  
  // Adverbs
  else if (term.adverbs().length > 0) {
    tags.push('ADV');
  }
  
  // Determiners
  else if (term.has('#Determiner')) {
    tags.push('DET');
  }
  
  // Prepositions
  else if (term.has('#Preposition')) {
    tags.push('PREP');
  }
  
  // Pronouns
  else if (term.pronouns().length > 0) {
    const pronCase = getCase(term, doc);
    tags.push('PRON');
    if (pronCase) tags.push(pronCase);
  }
  
  // Default to part of speech if no specific tags
  if (tags.length === 0) {
    tags.push(pos.toUpperCase());
  }

  return {
    original: word,
    gloss: tags.join('.')
  };
}

function createLeipzigGloss(text) {
  const doc = nlp(text);
  const sentences = doc.sentences();
  let result = [];
  
  sentences.forEach(sentence => {
    const words = sentence.terms().map(t => t.text);
    let glosses = [];
    let syntacticInfo = [];
    
    // Get clause structure
    const mainVerb = sentence.verbs(0);
    const subject = sentence.match('#Subject').text();
    const object = sentence.match('#Object').text();
    
    words.forEach((word, idx) => {
      const analysis = analyzeMorphemes(word, doc);
      
      // Add syntactic role if applicable
      if (word === subject) {
        analysis.gloss += '[SUBJ]';
      } else if (word === object) {
        analysis.gloss += '[OBJ]';
      }
      
      // Format with HTML
      glosses.push(
        `<div class="gloss-unit">
          <div class="gloss-word">${word}</div>
          <div class="gloss-morphemes">
            ${analysis.original}
          </div>
          <div class="gloss-grammar">
            <abbr title="${getFullGlossDescription(analysis.gloss)}">${analysis.gloss}</abbr>
          </div>
        </div>`
      );
    });

    // Add sentence level analysis
    const sentenceType = sentence.questions().length ? 'INT' : 'DECL';
    const sentenceMood = sentence.has('would|could|should') ? 'COND' : 
                        sentence.has('may|might') ? 'SBJV' : 'IND';
    
    result.push({
      original: sentence.text(),
      interlinear: glosses.join('\n'),
      sentenceType: sentenceType,
      sentenceMood: sentenceMood,
      clausalStructure: `${subject ? 'SUBJ-' : ''}${mainVerb ? 'V-' : ''}${object ? 'OBJ' : ''}`.replace(/-$/, '')
    });
  });
  
  return result;
}

function getFullGlossDescription(gloss) {
  const descriptions = {
    'N': 'Noun',
    'V': 'Verb',
    'ADJ': 'Adjective',
    'ADV': 'Adverb',
    'DET': 'Determiner',
    'PREP': 'Preposition',
    'PRON': 'Pronoun',
    'NOM': 'Nominative case',
    'ACC': 'Accusative case',
    'GEN': 'Genitive case',
    'SG': 'Singular',
    'PL': 'Plural',
    'PRS': 'Present tense',
    'PST': 'Past tense',
    'FUT': 'Future tense',
    'PRF': 'Perfect aspect',
    'PROG': 'Progressive aspect',
    'IPFV': 'Imperfective aspect',
    'IND': 'Indicative mood',
    'SBJV': 'Subjunctive mood',
    'COND': 'Conditional mood',
    'ACT': 'Active voice',
    'PASS': 'Passive voice',
    'CMPR': 'Comparative',
    'SUPR': 'Superlative',
    '1SG': 'First person singular',
    '2SG': 'Second person singular',
    '3SG': 'Third person singular'
  };
  
  return gloss.split('.').map(tag => descriptions[tag] || tag).join(', ');
}

// Add AAVE and other dialectal patterns
function getDialectalFeatures(term, doc) {
  let features = [];
  
  // AAVE habitual 'be'
  if (term.text().toLowerCase() === 'be' && 
      !doc.match('will be|to be|would be|could be|should be').has(term)) {
    features.push('HAB'); // Habitual aspect
  }

  // Zero copula (implied 'be' in AAVE)
  if (doc.has('#Adjective') && !doc.has('is|am|are|was|were')) {
    features.push('ZCOP');
  }

  return features;
}

// Apply styles to the document
function applyGlossStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .gloss-container {
      margin: 20px 0;
      font-family: 'Consolas', monospace;
    }
    .gloss-sentence {
      margin-bottom: 30px;
      padding: 15px;
      background: rgba(255,255,255,0.05);
      border-radius: 5px;
    }
    .gloss-unit {
      display: inline-block;
      margin-right: 1em;
      vertical-align: top;
      text-align: left;
    }
    .gloss-word {
      font-weight: bold;
    }
    .gloss-morphemes {
      color: #666;
      font-size: 0.9em;
    }
    .gloss-grammar {
      color: #2167ff;
      font-size: 0.85em;
    }
    .gloss-grammar abbr {
      text-decoration: none;
      border-bottom: 1px dotted #666;
      cursor: help;
    }
    .sentence-analysis {
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px solid #eee;
      font-size: 0.9em;
      color: #666;
    }
    .gloss-dialectal {
      color: #9c27b0;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
}

document.querySelector("#submitBtnP").addEventListener("click", function(e) {
  const text = document.querySelector("#parseBoxP").value;
  const resultBox = document.querySelector("#resultBoxP");
  resultBox.innerHTML = ""; // Reset
  
  // Apply styles
  applyGlossStyles();
  
  // Process the text
  const analysis = createLeipzigGloss(text);
  
  analysis.forEach((sentence, idx) => {
    const sentenceDiv = document.createElement('div');
    sentenceDiv.className = 'gloss-sentence';
    
    // Sentence header
    sentenceDiv.innerHTML = `
      <div style="margin-bottom: 15px">
        <strong>Sentence ${idx + 1}</strong>
        <div style="font-style: italic; color: #666;">${sentence.original}</div>
      </div>
      
      <div class="gloss-container">
        ${sentence.interlinear}
      </div>
      
      <div class="sentence-analysis">
        <div><strong>Type:</strong> <abbr title="Sentence type">${sentence.sentenceType}</abbr></div>
        <div><strong>Mood:</strong> <abbr title="Grammatical mood">${sentence.sentenceMood}</abbr></div>
        <div><strong>Structure:</strong> <abbr title="Clause structure">${sentence.clausalStructure}</abbr></div>
        ${sentence.dialectalFeatures ? `
        <div><strong>Dialectal Features:</strong> 
          <span class="gloss-dialectal">${sentence.dialectalFeatures.join(', ')}</span>
        </div>` : ''}
      </div>
    `;
    
    resultBox.appendChild(sentenceDiv);
  });
});