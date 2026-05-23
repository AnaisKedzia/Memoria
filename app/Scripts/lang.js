function getLang() {
    let lang = localStorage.getItem("lang");
    let langSelection = document.getElementById("lang")

    if (!lang) {
        lang = langSelection.value;
        localStorage.setItem("lang", lang)
        return lang
    } else {
        langSelection.value = lang;
        return lang
    }
}

//Acquisition des éléments de traduction en chargeant le fichier JSON correspondant.
export const lang = {
    translation: {},
    currentLang: "",

    async load() {
        this.currentLang = getLang();
        let translationList = await loadLang(this.currentLang)
        this.translation = translationList;
        translatePage();
        setDocumentLang(this.currentLang);
    },

    // Traduction d'un élément dynamique avant affichage.
    translate(key) {
        return this.translation[key];
    }
}


async function loadLang(lang) {
    let response;
    let translation;

    switch (lang) {
        case "Français":
            response = await fetch("/Scripts/languages/fr.json");
            translation = await response.json();
            return translation
        case "English":
            response = await fetch("/Scripts/languages/eng.json");
            translation = await response.json();
            return translation
        case "한국어":
            response = await fetch("/Scripts/languages/kr.json");
            translation = await response.json();
            return translation
    }
}

async function translatePage() {
    let elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((e) => {
        let key = e.getAttribute("data-i18n");
        let attribute = e.getAttribute("data-i18n-attr");
        if (attribute) translateAttribute(e, attribute);
        if (key in lang.translation) {
            e.textContent = lang.translation[key];
        }
    })
}

function translateAttribute(item, str) {
    let [attribute, key] = str.split(":");
    if (lang.translation[key]) {
        item[attribute] = lang.translation[key];
    }
}

function saveLangChange() {
    let langSelection = document.getElementById("lang");
    let selectedLang = langSelection.value;
    localStorage.setItem("lang", selectedLang);
    lang.load();

    setDocumentLang(selectedLang);
    }

function setDocumentLang(lang) {
    let languages = {
        Français: "fr",
        English: "eng",
        한국어: "ko"
    }

    document.documentElement.lang = languages[lang];
}

document.getElementById("lang").addEventListener("change", saveLangChange)
lang.load();
