//Type conversions
const role = {
    1: "Teacher",
    2: "Student",
    3: "Staff",
    4: "Parent",
    5: "Workplace Instructor",
    6: "Management",
    7: "Generic/Default"
}
const htmlEntities = {
    "!": "&#33",
    "\"": "&#34",
    "#": "&#35",
    "$": "&#36",
    "%": "&#37",
    "&": "&amp",
    "'": "&#39",
    "(": "&#40",
    ")": "&#41",
    "*": "&#42",
    "+": "&#43",
    ",": "&#44",
    "-": "&#45",
    ".": "&#46",
    "/": "&#47",
    "0": "&#48",
    "1": "&#49",
    "2": "&#50",
    "3": "&#51",
    "4": "&#52",
    "5": "&#53",
    "6": "&#54",
    "7": "&#55",
    "8": "&#56",
    "9": "&#57",
    ":": "&#58",
    "<": "&lt",
    ": ": "&#61",
    ">": "&gt",
    "?": "&#63",
    "@": "&#64",
    "A": "&#65",
    "B": "&#66",
    "C": "&#67",
    "D": "&#68",
    "E": "&#69",
    "F": "&#70",
    "G": "&#71",
    "H": "&#72",
    "I": "&#73",
    "J": "&#74",
    "K": "&#75",
    "L": "&#76",
    "M": "&#77",
    "N": "&#78",
    "O": "&#79",
    "P": "&#80",
    "Q": "&#81",
    "R": "&#82",
    "S": "&#83",
    "T": "&#84",
    "U": "&#85",
    "V": "&#86",
    "W": "&#87",
    "X": "&#88",
    "Y": "&#89",
    "Z": "&#90",
    "[": "&#91",
    "\\": "&#92",
    "]": "&#93",
    "^": "&#94",
    "_": "&#95",
    "`": "&#96",
    "a": "&#97",
    "b": "&#98",
    "c": "&#99",
    "d": "&#100",
    "e": "&#101",
    "f": "&#102",
    "g": "&#103",
    "h": "&#104",
    "i": "&#105",
    "j": "&#106",
    "k": "&#107",
    "l": "&#108",
    "m": "&#109",
    "n": "&#110",
    "o": "&#111",
    "p": "&#112",
    "q": "&#113",
    "r": "&#114",
    "s": "&#115",
    "t": "&#116",
    "u": "&#117",
    "v": "&#118",
    "w": "&#119",
    "x": "&#120",
    "y": "&#121",
    "z": "&#122",
    "{": "&#123",
    "|": "&#124",
    "}": "&#125",
    "~": "&#126",
    "À": "&Agrave",
    "Á": "&Aacute",
    "Â": "&Acirc",
    "Ã": "&Atilde",
    "Ä": "&Auml",
    "Å": "&Aring",
    "Æ": "&AElig",
    "Ç": "&Ccedil",
    "È": "&Egrave",
    "É": "&Eacute",
    "Ê": "&Ecirc",
    "Ë": "&Euml",
    "Ì": "&Igrave",
    "Í": "&Iacute",
    "Î": "&Icirc",
    "Ï": "&Iuml",
    "Ð": "&ETH",
    "Ñ": "&Ntilde",
    "Ò": "&Ograve",
    "Ó": "&Oacute",
    "Ô": "&Ocirc",
    "Õ": "&Otilde",
    "Ö": "&Ouml",
    "Ø": "&Oslash",
    "Ù": "&Ugrave",
    "Ú": "&Uacute",
    "Û": "&Ucirc",
    "Ü": "&Uuml",
    "Ý": "&Yacute",
    "Þ": "&THORN",
    "ß": "&szlig",
    "à": "&agrave",
    "á": "&aacute",
    "â": "&acirc",
    "ã": "&atilde",
    "ä": "&auml",
    "å": "&aring",
    "æ": "&aelig",
    "ç": "&ccedil",
    "è": "&egrave",
    "é": "&eacute",
    "ê": "&ecirc",
    "ë": "&euml",
    "ì": "&igrave",
    "í": "&iacute",
    "î": "&icirc",
    "ï": "&iuml",
    "ð": "&eth",
    "ñ": "&ntilde",
    "ò": "&ograve",
    "ó": "&oacute",
    "ô": "&ocirc",
    "õ": "&otilde",
    "ö": "&ouml",
    "ø": "&oslash",
    "ù": "&ugrave",
    "ú": "&uacute",
    "û": "&ucirc",
    "ü": "&uuml",
    "ý": "&yacute",
    "þ": "&thorn",
    "ÿ": "&yuml",
    " ": "&nbsp",
    "¡": "&iexcl",
    "¢": "&cent",
    "£": "&pound",
    "¤": "&curren",
    "¥": "&yen",
    "¦": "&brvbar",
    "§": "&sect",
    "¨": "&uml",
    "©": "&copy",
    "ª": "&ordf",
    "«": "&laquo",
    "¬": "&not",
    "­": "&shy",
    "®": "&reg",
    "¯": "&macr",
    "°": "&deg",
    "±": "&plusmn",
    "²": "&sup2",
    "³": "&sup3",
    "´": "&acute",
    "µ": "&micro",
    "¶": "&para",
    "¸": "&cedil",
    "¹": "&sup1",
    "º": "&ordm",
    "»": "&raquo",
    "¼": "&frac14",
    "½": "&frac12",
    "¾": "&frac34",
    "¿": "&iquest",
    "×": "&times",
    "÷": "&divide",
    "∀": "&forall",
    "∂": "&part",
    "∃": "&exist",
    "∅": "&empty",
    "∇": "&nabla",
    "∈": "&isin",
    "∉": "&notin",
    "∋": "&ni",
    "∏": "&prod",
    "∑": "&sum",
    "−": "&minus",
    "∗": "&lowast",
    "√": "&radic",
    "∝": "&prop",
    "∞": "&infin",
    "∠": "&ang",
    "∧": "&and",
    "∨": "&or",
    "∩": "&cap",
    "∪": "&cup",
    "∫": "&int",
    "∴": "&there4",
    "∼": "&sim",
    "≅": "&cong",
    "≈": "&asymp",
    "≠": "&ne",
    "≡": "&equiv",
    "≤": "&le",
    "≥": "&ge",
    "⊂": "&sub",
    "⊃": "&sup",
    "⊄": "&nsub",
    "⊆": "&sube",
    "⊇": "&supe",
    "⊕": "&oplus",
    "⊗": "&otimes",
    "⊥": "&perp",
    "⋅": "&sdot",
    "Α": "&Alpha",
    "Β": "&Beta",
    "Γ": "&Gamma",
    "Δ": "&Delta",
    "Ε": "&Epsilon",
    "Ζ": "&Zeta",
    "Η": "&Eta",
    "Θ": "&Theta",
    "Ι": "&Iota",
    "Κ": "&Kappa",
    "Λ": "&Lambda",
    "Μ": "&Mu",
    "Ν": "&Nu",
    "Ξ": "&Xi",
    "Ο": "&Omicron",
    "Π": "&Pi",
    "Ρ": "&Rho",
    "Σ": "&Sigma",
    "Τ": "&Tau",
    "Υ": "&Upsilon",
    "Φ": "&Phi",
    "Χ": "&Chi",
    "Ψ": "&Psi",
    "Ω": "&Omega",
    "α": "&alpha",
    "β": "&beta",
    "γ": "&gamma",
    "δ": "&delta",
    "ε": "&epsilon",
    "ζ": "&zeta",
    "η": "&eta",
    "θ": "&theta",
    "ι": "&iota",
    "κ": "&kappa",
    "λ": "&lambda",
    "μ": "&mu",
    "ν": "&nu",
    "ξ": "&xi",
    "ο": "&omicron",
    "π": "&pi",
    "ρ": "&rho",
    "ς": "&sigmaf",
    "σ": "&sigma",
    "τ": "&tau",
    "υ": "&upsilon",
    "φ": "&phi",
    "χ": "&chi",
    "ψ": "&psi",
    "ω": "&omega",
    "ϑ": "&thetasym",
    "ϒ": "&upsih",
    "ϖ": "&piv",
    "Œ": "&OElig",
    "œ": "&oelig",
    "Š": "&Scaron",
    "š": "&scaron",
    "Ÿ": "&Yuml",
    "ƒ": "&fnof",
    "ˆ": "&circ",
    "˜": "&tilde",
    " ": "&ensp",
    " ": "&emsp",
    " ": "&thinsp",
    "‌": "&zwnj",
    "‍": "&zwj",
    "‎": "&lrm",
    "‏": "&rlm",
    "–": "&ndash",
    "—": "&mdash",
    "‘": "&lsquo",
    "’": "&rsquo",
    "‚": "&sbquo",
    "“": "&ldquo",
    "”": "&rdquo",
    "„": "&bdquo",
    "†": "&dagger",
    "‡": "&Dagger",
    "•": "&bull",
    "…": "&hellip",
    "‰": "&permil",
    "′": "&prime",
    "″": "&Prime",
    "‹": "&lsaquo",
    "›": "&rsaquo",
    "‾": "&oline",
    "€": "&euro",
    "™": "&trade",
    "←": "&larr",
    "↑": "&uarr",
    "→": "&rarr",
    "↓": "&darr",
    "↔": "&harr",
    "↵": "&crarr",
    "⌈": "&lceil",
    "⌉": "&rceil",
    "⌊": "&lfloor",
    "⌋": "&rfloor",
    "◊": "&loz",
    "♠": "&spades",
    "♣": "&clubs",
    "♥": "&hearts",
    "♦": "&diams"
}
const weekdays = ["maantai", "tiistai", "keskiviikko", "torstai", "perjantai"]

//Data parser
class Parser {
    //Formatting functions. Internal
    toUTF8(data){
        let symb = Object.keys(htmlEntities)
        for(let i = 0; symb.length > i; i++){
            let toConvert = htmlEntities[symb[i]]
            let to = symb[i]
            data = data.split(toConvert + ";").join(to)
            data = data.split(toConvert.toLowerCase() + ";").join(to.toLowerCase())
        }
        return data
    }
    toCallsign(data){
        if(data.includes(", ")){
            return [0, data.split(", ")[1]]
        }else if(data.includes(" (") && data.includes(")")){
            return [1, data.split(" (")[1].replace(")", "")]
        }else {
            return null
        }
    }
    toName(data){
        if(data.includes(", ")){
            return data.split(", ")[0]
        }else if(data.includes(" (") && data.includes(")")){
            return data.split(" (")[0]
        }else {
            return null
        }
    }
    toRoom(data){
        return {
            id: data.kortti,
            shortName: data.lyhenne,
            name: data.nimi
        }
    }
    toTeacher(data){
        return {
            id: data.kortti,
            callsign: data.lyhenne,
            name: data.nimi
        }
    }
    //Normal functions

    async messages(data){
        return new Promise(async (resolve, reject) => {
            try {
                let construct = []
                for(let i = 0; data.length > i; i++){
                    construct.push({
                        title: data[i].Subject,
                        timestamp: data[i].TimeStamp,
                        folder: data[i].Folder,
                        author: {
                            id: data[i].SenderId,
                            role: role[data[i].SenderType],
                            name: this.toName(data[i].Sender),
                            callsign: this.toCallsign(data[i].Sender)[0] == 1 ? this.toCallsign(data[i].Sender)[1] : null,
                            class: this.toCallsign(data[i].Sender)[0] == 2 ? this.toCallsign(data[i].Sender)[1] : null
                        },
                        id: data[i].Id
                    })
                }
                resolve(construct)
            }
            catch(err){
                reject(err)
            }
        })
    }
    async message(data){
        return new Promise(async (resolve, reject) => {
            try {
                resolve({
                    title: data.Subject,
                    timestamp: data.TimeStamp,
                    folder: data.Folder,
                    author: {
                        id: data.SenderId,
                        role: role[data.SenderType],
                        name: data.Sender.split(" (")[0],
                        callsign: this.toCallsign(data.Sender)[0] == 1 ? this.toCallsign(data.Sender)[1] : null,
                        class: this.toCallsign(data.Sender)[0] == 2 ? this.toCallsign(data.Sender)[1] : null
                    },
                    permissions: {
                        forward: data.AllowForward,
                        reply: data.AllowReply
                    },
                    content: this.toUTF8(data.ContentHtml.replace(/(<(\/p|p)>)/g, "").replace(/(\\[a-z])/g, ""))
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    async schedule(data){
        return new Promise(async (resolve, reject) => {
            try {
                let tmp = data
                data = '{"data": [' + data.split("[")[1].split("]")[0] + "]}"
                data = JSON.parse(data).data
                let schedule = []
                for(let i = 0; data.length > i; i++){
                    let entry = data[i]
                    schedule.push({
                        id: entry.Id,
                        weekday: weekdays.indexOf(entry.ViikonPaiva.toLowerCase()),
                        date: entry.Date,
                        start: entry.Start,
                        end: entry.End,
                        name: entry.Text["0"],
                        fullName: entry.LongText["0"],
                        duringBreak: entry.MinuuttiSij != "0",
                        position: {
                            x: entry.X1 != 0 ? entry.X1 * 0.001 : 0,
                            y: entry.Y1 //how tf does this function
                        },
                        students: parseInt(entry.OppCount["0"].split(" ")[0]),
                        book: null, //TODO: Is this data available?
                        rooms: this.toRoom(entry.HuoneInfo["0"]["0"]),
                        teachers: this.toTeacher(entry.OpeInfo["0"]["0"])
                    })
                }
                let periods = tmp.split('<ul class="dropdown-menu">')[1].split('</ul>')[0]
                periods = periods.replace(/ {1,}</g, "<").replace(/<li role=".{1,}">/g, "").replace(/<\/li>/g, "").replace(/\n|\r/g, "").replace(/                    /g, "").replace(/<\/a>/g, "").split("\">")
                let _periods = []
                for(let e = 0; periods.length > e; e++){
                    let name = periods[e]
                    name = name.split("<")
                    if(name[0] != "") _periods.push(name[0])
                }
                periods = _periods
                resolve({
                    data: schedule,
                    periods: periods
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    classStudents(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let results = [];
                data.match(/<tr(.*?)<\/tr>/gms).forEach((result) => {
                    let name = result.split('<td>')[1].split('</td>')[0].trim();
                    results.push(name);
                });
                resolve(results);
            }
            catch(err){
                reject(err)
            }
        })
    }
    selfClass(data) {
         try {
            return data.split('<a href="/profiles/students/classes/')[1].split('" class="')[0];
         } catch (e) {
             return undefined;
         }
    }
    async format(data){
        return new Promise(async (resolve, reject) => {
            try {
                resolve(JSON.parse(data))
            }
            catch(err){
                reject(err)
            }
        })
    }
    //..etc
}
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory()
    } else {
        parser = new Parser()
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return new Parser()
}));