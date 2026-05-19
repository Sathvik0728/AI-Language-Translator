const languages = {

    "auto":"Detect Language",
    "en":"English",
    "hi":"हिन्दी",
    "te":"తెలుగు",
    "ta":"தமிழ்",
    "ml":"മലയാളം",
    "kn":"ಕನ್ನಡ",
    "mr":"मराठी",
    "gu":"ગુજરાતી",
    "bn":"বাংলা",
    "pa":"ਪੰਜਾਬੀ",
    "ur":"اردو",
    "ar":"العربية",
    "fr":"Français",
    "de":"Deutsch",
    "es":"Español",
    "it":"Italiano",
    "pt":"Português",
    "ru":"Русский",
    "ja":"日本語",
    "ko":"한국어",
    "zh-CN":"中文",
    "tr":"Türkçe",
    "nl":"Nederlands",
    "pl":"Polski",
    "th":"ไทย",
    "vi":"Tiếng Việt",
    "id":"Bahasa Indonesia",
    "el":"Ελληνικά",
    "sv":"Svenska",
    "uk":"Українська",
    "ro":"Română",
    "hu":"Magyar",
    "cs":"Čeština",
    "da":"Dansk",
    "fi":"Suomi",
    "no":"Norsk",
    "sk":"Slovenčina",
    "bg":"Български",
    "hr":"Hrvatski",
    "lt":"Lietuvių",
    "lv":"Latviešu",
    "sl":"Slovenščina",
    "et":"Eesti",
    "fa":"فارسی",
    "he":"עברית",
    "ms":"Bahasa Melayu",
    "sw":"Kiswahili",
    "af":"Afrikaans",
    "sq":"Shqip",
    "sr":"Српски"
};


/* ELEMENTS */

const sourceLanguage =
document.getElementById(
"sourceLanguage"
);

const targetLanguage =
document.getElementById(
"targetLanguage"
);

const inputText =
document.getElementById(
"inputText"
);

const outputText =
document.getElementById(
"outputText"
);

const charCount =
document.getElementById(
"charCount"
);

const outputCount =
document.getElementById(
"outputCount"
);

const translatedBox =
document.getElementById(
"translatedBox"
);

const themeBtn =
document.getElementById(
"themeBtn"
);


/* LOAD LANGUAGES */

function loadLanguages(){

    for(let code in languages){

        sourceLanguage.innerHTML += `

        <option value="${code}">
            ${languages[code]}
        </option>`;

        targetLanguage.innerHTML += `

        <option value="${code}">
            ${languages[code]}
        </option>`;
    }

    sourceLanguage.value =
    "auto";

    targetLanguage.value =
    "en";
}

loadLanguages();


/* CHARACTER COUNT */

inputText.addEventListener(

"input",

()=>{

    charCount.innerText =
    inputText.value.length;
});


/* HIDE LABEL */

translatedBox.style.display =
"none";


/* TRANSLATE */

async function translateText(){

    const text =
    inputText.value.trim();

    const source =
    sourceLanguage.value;

    const target =
    targetLanguage.value;

    if(text === ""){

        outputText.value = "";

        translatedBox.style.display =
        "none";

        outputCount.innerText = "0";

        return;
    }

    outputText.value =
    "Translating...";

    try{

        const response =
        await fetch("/translate",{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                text:text,

                source:source,

                target:target
            })
        });

        const data =
        await response.json();

        outputText.value =
        data.translated;

        outputCount.innerText =
        data.translated.length;

        translatedBox.style.display =
        "block";
    }

    catch(error){

        console.log(error);

        outputText.value =
        "Translation Failed";
    }
}


/* SWAP */

function swapLanguages(){

    if(
        sourceLanguage.value ===
        "auto"
    ){

        alert(
        "Cannot swap Detect Language"
        );

        return;
    }

    let tempLanguage =
    sourceLanguage.value;

    sourceLanguage.value =
    targetLanguage.value;

    targetLanguage.value =
    tempLanguage;

    let tempText =
    inputText.value;

    inputText.value =
    outputText.value;

    outputText.value =
    tempText;
}


/* COPY */

function copyText(){

    if(
        outputText.value.trim() === ""
    ){

        return;
    }

    navigator.clipboard.writeText(
        outputText.value
    );

    alert("Copied");
}


/* CLEAR */

function clearText(){

    inputText.value = "";

    outputText.value = "";

    charCount.innerText = "0";

    outputCount.innerText = "0";

    translatedBox.style.display =
    "none";
}


/* SHARE */

function shareText(){

    if(
        navigator.share
    ){

        navigator.share({

            text:outputText.value
        });
    }
}


/* VOICE INPUT */

function startVoice(){

    const SpeechRecognition =

    window.SpeechRecognition ||

    window.webkitSpeechRecognition;

    if(!SpeechRecognition){

        alert(
        "Use Google Chrome"
        );

        return;
    }

    const recognition =
    new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult =
    function(event){

        const transcript =

        event.results[0][0]
        .transcript;

        inputText.value =
        transcript;

        charCount.innerText =
        transcript.length;
    };

    recognition.onerror =
    function(){

        alert(
        "Voice input failed"
        );
    };
}


/* SPEAK OUTPUT */

function speakTranslation(){

    const text =
    outputText.value.trim();

    if(text === ""){

        return;
    }

    speechSynthesis.cancel();

    const speech =

    new SpeechSynthesisUtterance(
        text
    );

    speech.lang =
    targetLanguage.value;

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(
        speech
    );
}


/* DARK MODE */

let darkMode = false;

themeBtn.addEventListener(

"click",

()=>{

    darkMode = !darkMode;

    if(darkMode){

        document.body.style.background =
        "#0f172a";

        document.querySelector(
        ".container"
        ).style.background =
        "#111827";

        document.querySelectorAll(
        ".card"
        ).forEach(card=>{

            card.style.background =
            "#1f2937";

            card.style.border =
            "1px solid #374151";
        });

        document.querySelectorAll(
        "textarea"
        ).forEach(textarea=>{

            textarea.style.background =
            "#111827";

            textarea.style.color =
            "white";
        });

        document.querySelectorAll(
        "select"
        ).forEach(select=>{

            select.style.background =
            "#111827";

            select.style.color =
            "white";
        });

        document.querySelectorAll(
        ".top-btn"
        ).forEach(btn=>{

            btn.style.background =
            "#1f2937";

            btn.style.color =
            "white";
        });

        document.querySelector(
        ".header-left h1"
        ).style.color =
        "white";

        document.querySelector(
        ".header-left p"
        ).style.color =
        "#d1d5db";

        themeBtn.innerHTML =
        "🌙 Dark Mode";
    }

    else{

        location.reload();
    }
});


/* WEBSITE LANGUAGE */

function changeWebsiteLanguage(){

    const lang =
    document.getElementById(
    "websiteLanguage"
    ).value;

    const text = {

        en:{

            title:
            "AI Language Translator",

            subtitle:
            "Translate text, voice and more with AI",

            source:
            "Source Language",

            target:
            "Target Language",

            translate:
            "✨ Translate",

            inputPlaceholder:
            "Enter text",

            outputPlaceholder:
            "Translation",

            translated:
            "✅ Translated",

            voiceInput:
            "🎤 Voice Input",

            speakOutput:
            "🔊 Speak Output",

            copyText:
            "📋 Copy Text",

            swap:
            "⇄ Swap Languages",

            clear:
            "🗑 Clear Text",

            powered:
            "Powered by AI",

            poweredText:
            "Our advanced AI model delivers accurate and context-aware translations.",

            dark:
            "☀️ Light Mode"
        },



        te:{

            title:
            "AI భాషా అనువాదకుడు",

            subtitle:
            "AI తో వాయిస్ మరియు టెక్స్ట్ అనువాదం",

            source:
            "మూల భాష",

            target:
            "లక్ష్య భాష",

            translate:
            "✨ అనువదించు",

            inputPlaceholder:
            "టెక్స్ట్ నమోదు చేయండి",

            outputPlaceholder:
            "అనువాదం",

            translated:
            "✅ అనువదించబడింది",

            voiceInput:
            "🎤 వాయిస్ ఇన్‌పుట్",

            speakOutput:
            "🔊 వాయిస్ అవుట్‌పుట్",

            copyText:
            "📋 కాపీ చేయి",

            swap:
            "⇄ భాషలు మార్చు",

            clear:
            "🗑 క్లియర్ చేయి",

            powered:
            "AI ద్వారా నడుస్తుంది",

            poweredText:
            "మా AI మోడల్ ఖచ్చితమైన అనువాదాలను అందిస్తుంది.",

            dark:
            "☀️ లైట్ మోడ్"
        },



        hi:{

            title:
            "AI भाषा अनुवादक",

            subtitle:
            "AI के साथ टेक्स्ट और वॉइस अनुवाद",

            source:
            "स्रोत भाषा",

            target:
            "लक्ष्य भाषा",

            translate:
            "✨ अनुवाद करें",

            inputPlaceholder:
            "टेक्स्ट दर्ज करें",

            outputPlaceholder:
            "अनुवाद",

            translated:
            "✅ अनुवादित",

            voiceInput:
            "🎤 वॉइस इनपुट",

            speakOutput:
            "🔊 वॉइस आउटपुट",

            copyText:
            "📋 कॉपी करें",

            swap:
            "⇄ भाषा बदलें",

            clear:
            "🗑 टेक्स्ट हटाएँ",

            powered:
            "AI द्वारा संचालित",

            poweredText:
            "हमारा AI मॉडल सटीक अनुवाद प्रदान करता है।",

            dark:
            "☀️ लाइट मोड"
        }
    };


    document.getElementById(
    "mainTitle"
    ).innerText =
    text[lang].title;


    document.getElementById(
    "mainSubtitle"
    ).innerText =
    text[lang].subtitle;


    document.getElementById(
    "sourceTitle"
    ).innerText =
    text[lang].source;


    document.getElementById(
    "targetTitle"
    ).innerText =
    text[lang].target;


    document.getElementById(
    "translateBtn"
    ).innerText =
    text[lang].translate;


    document.getElementById(
    "inputText"
    ).placeholder =
    text[lang].inputPlaceholder;


    document.getElementById(
    "outputText"
    ).placeholder =
    text[lang].outputPlaceholder;


    document.getElementById(
    "translatedBox"
    ).innerText =
    text[lang].translated;


    document.querySelectorAll(
    ".bottom-buttons button"
    )[0].innerText =
    text[lang].voiceInput;


    document.querySelectorAll(
    ".bottom-buttons button"
    )[1].innerText =
    text[lang].speakOutput;


    document.querySelectorAll(
    ".bottom-buttons button"
    )[2].innerText =
    text[lang].copyText;


    document.querySelectorAll(
    ".bottom-buttons button"
    )[3].innerText =
    text[lang].swap;


    document.querySelectorAll(
    ".bottom-buttons button"
    )[4].innerText =
    text[lang].clear;


    document.querySelector(
    ".powered h2"
    ).innerText =
    text[lang].powered;


    document.querySelector(
    ".powered p"
    ).innerText =
    text[lang].poweredText;


    document.getElementById(
    "themeBtn"
    ).innerText =
    text[lang].dark;
}