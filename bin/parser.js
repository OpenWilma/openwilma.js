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
const weekdays = ["maanantai", "tiistai", "keskiviikko", "torstai", "perjantai"]

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
    convertToScheduleTable(data){ //TODO: Does this even help at all?
        let table = {}
        for(let i = 0; data.length > i; i++){
            let day = data[i]
            if(table[day.position.x] == undefined) table[day.position.x] = {}
            table[day.position.x][day.position.y] = day
        }
        return table
    }
    fromMinutesToHoursAndMinutes(time){
        return (time / 60).toFixed(0) + ":" + (((time / 60).toString().split(".")[1] != undefined ? (60 * parseFloat("0." + (time / 60).toString().split(".")[1])).toFixed(0) : "00").toString().length < 2 ? "0" + ((time / 60).toString().split(".")[1] != undefined ? (60 * parseFloat("0." + (time / 60).toString().split(".")[1])).toFixed(0) : "00") : ((time / 60).toString().split(".")[1] != undefined ? (60 * parseFloat("0." + (time / 60).toString().split(".")[1])).toFixed(0) : "00")) 
    }
    toReverse(string){
        return string.split("").reverse().join("")
    }
    removeEmptyLines(string){
        string = string.split("\n")
        let n = []
        for(let i = 0; string.length > i; i++){
            if((string[i].replace(/\r/g, "").replace(/\n/g, "").replace(/ /g, "") == "") == false) n.push(string[i])
        }
        return n.join("\n")
    }
    escape(string){
        return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
    }
    convertHtmlToText(html) {
        html = html.replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/g, '[$2]($1)');
        html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
        html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
        html = html.replace(/<\/div>/ig, '\n');
        html = html.replace(/<\/li>/ig, '\n');
        html = html.replace(/<li>/ig, '  *  ');
        html = html.replace(/<\/ul>/ig, '\n');
        html = html.replace(/<\/p>/ig, '\n');
        html = html.replace(/<br\s*[\/]?>/gi, "\n");
        html = html.replace(/<[^>]+>/ig, '');
        return html;
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
                        date: entry.Date,
                        start: this.fromMinutesToHoursAndMinutes(entry.Start),
                        end: this.fromMinutesToHoursAndMinutes(entry.End),
                        name: entry.Text["0"],
                        fullName: entry.LongText["0"],
                        duringBreak: entry.MinuuttiSij != "0",
                        position: {
                            x: entry.X1 != 0 ? entry.X1 * 0.0001 : 0,
                            y: entry.Y1 != 0 ? entry.Y1 + 1 : entry.Y1
                        },
                        students: parseInt(entry.OppCount["0"].split(" ")[0]),
                        book: null, //TODO: Is this data available?
                        rooms: this.toRoom(entry.HuoneInfo["0"]["0"]),
                        teachers: this.toTeacher(entry.OpeInfo["0"]["0"]),
                        editor: {
                            added: entry.Lisaaja.Nimi,
                            edited: entry.Muokkaaja.Nimi
                        }
                    })
                }
                let periods = tmp.split('<ul class="dropdown-menu">')[1].split('</ul>')[0]
                periods = periods.replace(/ {1,}</g, "<").replace(/<li role=".{1,}">/g, "").replace(/<\/li>/g, "").replace(/\n|\r/g, "").replace(/                    /g, "").replace(/                /g, "").replace(/<\/a>/g, "").split("\">")
                let _periods = []
                for(let e = 0; periods.length > e; e++){
                    let name = periods[e]
                    name = name.split("<")
                    if(name[0] != "") _periods.push(name[0])
                }
                periods = _periods
                resolve({
                    data: this.convertToScheduleTable(schedule),
                    periods: periods
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    async schools(data){
        return new Promise(async (resolve, reject) => {
            try {
                let schools = []
                data = data.payload
                for(let i = 0; data.length> i; i++){
                    schools.push({
                        id: data[i].id,
                        name: data[i].caption,
                        additionalFeatures: data[i].features
                    })
                }
                resolve(schools)
            }
            catch(err){
                reject(err)
            }
        })
    }
    async classes(data){
        return new Promise(async (resolve, reject) => {
            try {
                let schools = []
                data = data.payload
                for(let i = 0; data.length> i; i++){
                    schools.push({
                        id: data[i].id,
                        name: data[i].caption,
                        messagePermissions: data[i].features.sendMessages,
                        classTeachers: data[i].supervisors
                    })
                }
                resolve(schools)
            }
            catch(err){
                reject(err)
            }
        })
    }
    async classStudents(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let results = [];
                let query = data.match(/<tr(.*?)<\/tr>/gms);
                if (query) {
                    query.forEach((result) => {
                        let name = result.split('<td>')[1].split('</td>')[0].trim();
                        results.push(name);
                    });
                }
                resolve(results);
            }
            catch(err){
                reject(err)
            }
        })
    }
    async newsEntry(data){
        return new Promise(async (resolve, reject) => {
            try {
                data = data.split('<!-- Sivukohtainen alue alkaa -->')[1].split('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 right">')[0]
                let title = data.split("<h2>")[1].split("</h2>")[0].trim()
                let html = this.removeEmptyLines(this.toReverse(this.toReverse(data.split('id="news-content">')[1].split('<div class="panel-body-padding-remover">')[0]).replace(">vid/<", ""))).trim()
                let content = this.convertHtmlToText(this.toUTF8(html));
              
                let authorData = data.split('<span class="vismaicon vismaicon-sm vismaicon-user">')[1].split("<span>")[1].split("</span>")[0].trim()
                let authorName = null
                let authorShort = null
                let authorId = null
                if(authorData.includes("/teachers/")){ //Has link
                    authorId = authorData.split("/teachers/")[1].split('"')[0]
                    authorName = authorData.split('class="ope profile-link">')[1].split("</a>")[0].split(" (")[1]
                    authorShort = authorData.split('class="ope profile-link">')[1].split("</a>")[0].split(" (")[0]
                }else {
                    authorShort = this.removeEmptyLines(data.split('<span class="vismaicon vismaicon-sm vismaicon-user">')[1].split("<span>")[1].split("</span>")[0]).trim().split(" (")[0]
                    authorName = this.toReverse(this.toReverse(this.removeEmptyLines(data.split('<span class="vismaicon vismaicon-sm vismaicon-user">')[1].split("<span>")[1].split("</span>")[0]).trim().split(" (")[1]).replace(")", ""))
                }
                let released = data.split('<span class="small semi-bold no-side-margin pull-right">')[1].split("<")[0].replace("Julkaistu ", "")
                let removedAt = data.split('<span class="small semi-bold no-side-margin pull-right">')[2].split("<")[0].replace("Poistuu ", "")
                // Attention to the end user to avoid XSS vulnerabilities: do not print html value as is straight to the user from JSON
                resolve({
                    title: title,
                    html: html,
                    content: content,
                    author: {
                        callsign: authorShort,
                        name: authorName
                    },
                    released: released,
                    toBeRemoved: removedAt
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    async news(data){
        return new Promise(async (resolve, reject) => {
            try {
                let perm = []
                let _perm = this.removeEmptyLines(data.split('<h2>Pysyvät tiedotteet</h2>')[1].split(/ {1,}<\/div>/g)[0]).split("\n")
                for(let i = 0; _perm.length > i; i++){
                    try {
                        let entry = _perm[i]
                        let id = entry.split('href="/news/')[1] != undefined ? entry.split('href="/news/')[1].split('"')[0] : null
                        if(id == null) continue //Creates an issue in parsing if not there
                        let title = entry.split('href="/news/' + id + '">')[1] != undefined ? entry.split('href="/news/' + id + '">')[1].split("</a>")[0] : null
                        perm.push({
                            id: id,
                            title: title.replace(/(^(\r\n)|(\r\n)$)/gm, "") //Removes some extra stuff from the begging and end of lines
                        })
                    }
                    catch(err){
                        console.log("OpenWilma response parsing error: ", err)
                    }
                }
                let old = []
                let _old = this.removeEmptyLines(data.split('<h2>Vanhat tiedotteet</h2>')[1].split(/ {1,}<\/div>/g)[0]).split("\n")
                for(let i = 0; _old.length > i; i++){
                    try {
                        let entry = _old[i]
                        let id = entry.split('href="/news/')[1] != undefined ? entry.split('href="/news/')[1].split('"')[0] : null
                        if(id == null) continue //Creates an issue in parsing if not there
                        let title = entry.split('href="/news/' + id + '">')[1] != undefined ? entry.split('href="/news/' + id + '">')[1].split("</a>")[0] : null
                        old.push({
                            id: id,
                            title: title.replace(/(^(\\r\\n)|(\\r\\n)$)/gm, "") //Removes some extra stuff from the begging and end of lines
                        })
                    }
                    catch(err){
                        console.log("Parsing error: ", err)
                    }
                }   
                let current = data.split('<div class="panel-body">')[3].replace(/( {1,}<)()()/g, "<").replace(/<div class="panel hidden-md-up">/g, "").split("</div>")
                let _current = []
                for(let i = 0; current.length > i; i++){
                    let entry = current[i]
                    entry = this.removeEmptyLines(entry)
                    if(entry == "") continue
                    let title = entry.split("<h3>")[1].split("</h3>")[0].replace(/^( {1,})/gm, "")
                    let type = 0
                    let id = entry.split("/news/")[1] != undefined ? entry.split("/news/")[1].split('"')[0] : null
                    if(id == null) type = 1
                    let authorId = entry.includes('<a href="/profiles/teachers') ? entry.split('<a href="/profiles/teachers/')[1].split('"')[0] : null
                    let authorName = entry.includes('class="profile-link" title="') ? entry.split('class="profile-link" title="')[1].split('"')[0] : (entry.includes('class="tooltip" title="') ? entry.split('class="tooltip" title="')[1].split('"')[0] : null)
                    let authorShort = entry.includes('class="profile-link" title="') ? entry.split('class="profile-link" title="' + authorName + '">')[1].split("<")[0] : (entry.includes('class="tooltip" title="') ? entry.split('class="tooltip" title="' + authorName + '">')[1].split("<")[0] : null)
                    let description = entry.includes('<p class="sub-text">') ? entry.split('<p class="sub-text">')[1].split("</p>")[0] : null
                    let date = entry.includes('<h2 class="no-border margin-bottom-inline no-bottom-padding">') ? entry.split('<h2 class="no-border margin-bottom-inline no-bottom-padding">')[1].split("<")[0] : null
                    _current.push({
                        id: id,
                        author: {
                            name: authorName,
                            callsign: authorShort,
                            id: authorId
                        },
                        description: description,
                        date: date,
                        type: type,
                        title: title.replace(/(^(\r\n)|(\r\n)$)/gm, "") //Removes some extra stuff from the begging and end of lines
                    })
                }
                current = _current
                resolve({
                    pinned: perm,
                    old: old,
                    latest: current
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    //selfClass(data) {
    //     try {
    //        return data.split('<a href="/profiles/students/classes/')[1].split('" class="')[0];
    //     } catch (e) {
    //         return undefined;
    //     }
    //}
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
