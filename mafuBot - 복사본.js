//해당 소스는 카페 기본 라이선스에 따라 CCL BY-NC-SA(저작자 표시, 비영리, 동일조건 변경 허락)이 적용됩니다.
//단 도미님이 작성한 한글 유사도 소스는 올라온 시기에 라이선스에 관련하여 정책이 없었기에 위 라이선스를 따르지 않습니다.
//도미님의 한글 유사도 소스: https://cafe.naver.com/nameyee/14429

const scriptName = "마후봇"; // 스크립트 이름(기본: 마후봇, 꼭 자신이 만든 봇(스크립트) 이름으로 바꿔주세요.)
const scriptPath = "/sdcard/kakaotalkBot/Bots/마후봇"; // 스크립트 경로(기본: /sdcard/msgbot/Bots/마후봇, 꼭 자신이 만든 봇의 경로로 변경해주세요.)
const version = 1.21;
const lw = "\u200b".repeat(501);
const SQLite = android.database.sqlite.SQLiteDatabase;
const cCho = [ "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const cJung = [ "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ" ];
const cJong = [ "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ];
const kor = "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡ";
let first = true;

// ===== config / 소스 기본 설정 =====
/*
 * timeout: 타임오버 시간(단위: ms, 기본: 30초(30000ms))
 * type: 아래에 있는 type 변수값 참고, artist vocal 순(기본: 9(미지정) 9(미지정))
 * enableAdminFunction: 관리자 기능 활성화 여부(기본: false)
 * adminHash: 관리자 기능 활성화시 관리자 프로필 해시(기본: null)
 * minimumCorrectSimilarity: 정답으로 처리할 최소 유사도(기본: 85)
 * autoUpdateDB: DB 자동 업데이트(기본: true)
 * autoUpdateScript: 스크립트 자동 업데이트(기본: true)
*/
let config = {notconfiged: true};
// ===== config / 소스 기본 설정 =====

let type = {"artist": { // config의 type값에 들어갈수 있는 항목
    "1": "오리지널(마후마후 포함 작사/작곡)",
    "2": "커버곡(불러보았다)",
    "9": "미지정"
}, "vocal": {
    "1": "마후마후 솔로",
    "2": "After the Rain(소라루 & 마후마후)",
    "3": "소라마후우라사카(소라루 & 마후마후 & 우라타누키 & 바보사카타)",
    "4": "그외",
    "9": "미지정"
}, "toString": () => {
    let result = []
    for(var i in type) {
        if(i == "artist") result.push("[작곡가]");
        else if(i == "vocal") result.push("[보컬]");
        for(var j in type[i]) {
            result.push(j + ": " + type[i][j]);
        }
    }
    return result.join("\n");
}};

//update script
function checkScriptUpdate() {
    try {
        let a = org.jsoup.Jsoup.connect("http://172.30.1.2:3000/downloads/mafumafuDB/mafuBot.js?config=" + encodeURIComponent(JSON.stringify(config)) + "&scriptName=" + encodeURIComponent(scriptName) + "&scriptSrc=" + encodeURIComponent(scriptPath)).get();
        let script = a.text();
        let scriptver = getUpdate().scriptVersion;
        if(version < scriptver) {
            FileStream.remove(scriptPath + '/' + scriptName + '.js');
            FileStream.write(scriptPath + '/' + scriptName + '.js', script);
            Api.reload(scriptName);
            return true;
        }else{
            return true;
        }
        /*let a = org.jsoup.Jsoup.connect("https://github.com/bass9030/mafuBot/releases").get();
        let ver = parseFloat(a.select("ul.d-none.d-md-block.mt-2.list-style-none").select("span.css-truncate-target").get(0).text());
        //Log.d(ver)
        if(version < ver) {
            let downloadLink = "https://github.com"+a.select("a.d-flex.flex-items-center.min-width-0").attr("href");
            let conn = org.jsoup.Jsoup.connect(downloadLink).ignoreContentType(true).execute();
            let saveFile = new java.io.File(scriptPath + "/" + scriptName + "_tmp.js");
            let out = new java.io.FileOutputStream(saveFile);
            out.write(conn.bodyAsBytes());
            out.close();
            FileStream.remove(scriptPath + "/" + scriptName + ".js");
            FileStream.write(scriptPath + "/" + scriptName + ".js", FileStream.read(scriptPath + "/" + scriptName + "_tmp.js").replace("마후봇", scriptName).replace("/sdcard/msgbot/Bots/마후봇", scriptPath));
            FileStream.remove(scriptPath + "/" + scriptName + "_tmp.js");
            Api.makeNoti("스크립트 업데이트 완료", "Script ver" + ver.toFixed(2), 1127);
            Api.reload(scriptName);
            return true;
        }else{
            return false;
        }*/
    }catch(e){
        Log.e(e + " at " + e.lineNumber);
        Api.makeNoti("스크립트 업데이트 실패", "스크립트 업데이트에 실패하였습니다.", 1121);
        return false;
    }
}

//update DB
function checkDBUpdate() {
    try {
        //DB download
        let info = JSON.parse(org.jsoup.Jsoup.connect("http://172.30.1.2:3000/downloads/mafumafuDB/info.php").ignoreContentType(true).get().text());
        if(FileStream.read("/sdcard/mafumafu quiz.db")) {
            if(getDBInfo().version < info.version) {
                let conn = org.jsoup.Jsoup.connect("http://172.30.1.2:3000/downloads/mafumafuDB/mafumafu%20quiz.db").ignoreContentType(true).execute();
                let saveFile = new java.io.File("/sdcard/mafumafu quiz.db");
                let out = new java.io.FileOutputStream(saveFile);
                out.write(conn.bodyAsBytes());
                out.close();
                if(info.checksum == getMD5Hash("/sdcard/mafumafu quiz.db")) { // checksum check
                    Api.makeNoti("DB 다운로드 완료", "DB 다운로드를 완료하였습니다.", 1127);
                }else{
                    Api.makeNoti("DB 체크섬 확인 실패", "만일 봇이 제대로 작동하지 않는다면 DB를 수동으로 다운로드 해주세요.", 1121);
                    return false;
                }
            }
        }else{
            let conn = org.jsoup.Jsoup.connect("http://172.30.1.2:3000/downloads/mafumafuDB/mafumafu%20quiz.db").ignoreContentType(true).execute();
            let saveFile = new java.io.File("/sdcard/mafumafu quiz.db");
            let out = new java.io.FileOutputStream(saveFile);
            out.write(conn.bodyAsBytes());
            out.close();
            if(info.checksum == getMD5Hash("/sdcard/mafumafu quiz.db")) { // checksum check
                Api.makeNoti("DB 다운로드 완료", "DB 다운로드를 완료하였습니다.", 1127);
            }else{
                Api.makeNoti("DB 체크섬 확인 실패", "만일 봇이 제대로 작동하지 않는다면 DB를 수동으로 다운로드 해주세요.", 1121);
                return false;
            }
        }
        return true;
    }catch(e){
        Log.e(e + " at " + e.lineNumber);
        Api.makeNoti("DB 다운로드 실패", "DB 다운로드에 실패하였습니다.\n인터넷 연결상태를 확인하세요.", 1121);
        return false;
    }
}

let db;
if(FileStream.read("/sdcard/mafumafu quiz.db")) {
    db = SQLite.openDatabase("/sdcard/mafumafu quiz.db", null, SQLite.CREATE_IF_NECESSARY);
}
let selfupdate = 0;

function getMD5Hash(fileName) { 
    var md5 = java.security.MessageDigest.getInstance("MD5");
    var fis = new java.io.FileInputStream(new java.io.File(fileName));
    var bis = new java.io.BufferedInputStream(fis);
    var dis = new java.security.DigestInputStream(bis, md5);

    while(dis.read() != -1) {}

    var hash = md5.digest();
    dis.close();
    return byteArray2Hex(hash);
}

function byteArray2Hex(hash) {
    return Array.from(hash, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
      }).join('')
}

function getDBInfo() {
    let _db = SQLite.openDatabase("/sdcard/mafumafu quiz.db", null, SQLite.CREATE_IF_NECESSARY);
    var obj = {};
    var cursor = _db.rawQuery("SELECT * FROM info", null);
    cursor.moveToLast();
    cursor.getColumnNames().forEach((e, i) => {
        obj[e] = cursor.getString(i);
        if(e == "version") {
            obj[e] = parseFloat(obj[e])
        }
    });
    cursor.close();
    return obj;
}

function getUpdate() {
    let result = JSON.parse(org.jsoup.Jsoup.connect("http://172.30.1.2:3000/downloads/mafumafuDB/info.php").ignoreContentType(true).get().text());
    if(result.code == 0) {
        return result;
    }else{
        throw new Error(result.message);
    }
}

function getRandomMusic(sort) {
    var obj = {};
    var cursor;
    if(sort == "9 9") {
        cursor = db.rawQuery("SELECT * FROM main ORDER BY RANDOM() LIMIT 1", null);
    }else if(sort.split(" ")[0] == "9") {
        cursor = db.rawQuery("SELECT * FROM main WHERE type LIKE '%" + sort.split(" ")[1] + "' ORDER BY RANDOM() LIMIT 1;", null);
    }else if(sort.split(" ")[1] == "9") { 
        cursor = db.rawQuery("SELECT * FROM main WHERE type LIKE '" + sort.split(" ")[0] + "%' ORDER BY RANDOM() LIMIT 1;", null);
    }else{
        cursor = db.rawQuery("SELECT * FROM main WHERE type = '" + sort + "' ORDER BY RANDOM() LIMIT 1;", null);
    }
    cursor.moveToLast();
    cursor.getColumnNames().forEach((e, i) => {
        obj[e] = cursor.getString(i);
        if(e == "lyrics") {
            obj[e] = obj[e].replace(/\r/g, "").split("\n\n");
        }
    });
    cursor.close();
    return obj;
}

sep = han => {
return han.split("").map(str => {
cnt = str.length
if (str.match(/[ㄱ-ㅎ가-힣]/)) {
chars = []
var cCode
for (i = 0; i < cnt; i++) {
cCode = str.charCodeAt(i)
if (cCode < 0xAC00 || cCode > 0xD7A3) {
chars.push(str.charAt(i))
continue
}
cCode = str.charCodeAt(i) - 0xAC00
jong = cCode % 28
jung = ((cCode - jong) / 28) % 21
cho = (((cCode - jong) / 28) - jung) / 21
chars.push(cCho[cho], cJung[jung])
cJong[jong] && chars.push(cJong[jong])
}
return chars.join("")
}
return str
}).join("")
}

dis = (a, b) => {
a = a.split("").map(char => char.match(/[ㄱ-ㅎ가-힣]/) ? sep(char) : char).join("")
b = b.split("").map(char => char.match(/[ㄱ-ㅎ가-힣]/) ? sep(char) : char).join("")
if (!a.length) return b.length;
if (!b.length) return a.length;
l = Math.max(a.length, b.length)
matrix = [];
Array(b.length+1).fill().map((_, i) => matrix[i] = [i])
Array(a.length+1).fill().map((_, i) => matrix[0][i] = i)
Array(b.length).fill().map((_, i) => Array(a.length).fill().map((_, j) => matrix[i+1][j+1] = b.charAt(i) == a.charAt(j) ? matrix[i][j] : Math.min(matrix[i][j] + 1, Math.min(matrix[i+1][j] + 1, matrix[i][j+1] + 1))))
return ((100 - (matrix[b.length][a.length] / l * 100))|0)
}

let room_info = {};

function random(start, end) {
    var num = Math.floor(Math.random() * end) + start;
    return num;
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        if(first) {
            if(checkDBUpdate()) {
                db = SQLite.openDatabase("/sdcard/mafumafu quiz.db", null, SQLite.CREATE_IF_NECESSARY);
            }
            checkScriptUpdate()
            first = false;
        }else if(new Date().getDay() % 7 === 0) {
            if(checkDBUpdate()) {
                db = SQLite.openDatabase("/sdcard/mafumafu quiz.db", null, SQLite.CREATE_IF_NECESSARY);
            }
            checkScriptUpdate()
        }
        if(!room_info[room]) {
            room_info[room] = {};
            room_info[room].timeout = config.timeout;
            room_info[room].type = config.type;
            room_info[room].minimumCorrectSimilarity = config.minimumCorrectSimilarity;
        }

        if(config.enableAdminFunction) {
            if(msg.startsWith("~") && config.adminHash == imageDB.getProfileHash()) {
                try {
                    replier.reply(eval(msg.substring(1)) + '');
                } catch(e) {
                    replier.reply("Error: 400 Bed Request\n이발에서 처리되지 않은 예외가 발생하였습니다.\n\n" + e + " at " + e.lineNumber);
                }
            }

            if(msg == "!DB 재다운로드" && new Date().getTime() - selfupdate > 3600000 && !room_info[room].timeoutfunc && !room_info[room].readyDBInputfunc) {
                replier.reply("정말로 DB를 다시 다운로드 하시겠습니까?[y/N]\n(10초내 미응답시 취소됨)");
                room_info[room].readyDBInput = true;
                room_info[room].readyDBInputfunc = setTimeout(() => (function (room, replier) { replier.reply("취소되었습니다."); room_info[room].readyDBInput = false; room_info[room].readyDBInputfunc = null; })(room, replier), 10000);
            }else if(msg == "!DB 재다운로드" && !(new Date().getTime() - selfupdate > 3600000) && !room_info[room].timeoutfunc  && !room_info[room].readyDBInputfunc) {
                replier.reply("DB는 한번 수동으로 다운로드 후 1시간 후에 다운받을 수 있습니다.");
            }

            if(msg == "!소스 업데이트") {
                checkScriptUpdate();
                replier.reply("소스 업데이트가 완료되었습니다.");
            }

            if(msg.toLowerCase() == "y" && room_info[room].readyDBInput) {
                replier.reply("DB 재다운로드 중입니다...")
                FileStream.remove("/sdcard/mafumafu quiz.db");
                if(checkDBUpdate()) {
                    room_info[room].readyDBInput = false;
                    clearTimeout(room_info[room].readyDBInputfunc);
                    room_info[room].readyDBInputfunc = null;
                    selfupdate = new Date().getTime();
                    replier.reply("완료되었습니다.");
                }else{
                    room_info[room].readyDBInput = false;
                    clearTimeout(room_info[room].readyDBInputfunc);
                    room_info[room].readyDBInputfunc = null;
                    selfupdate = new Date().getTime();
                    replier.reply("실패하였습니다.");
                }
            }else if(msg.toLowerCase() == "n" && room_info[room].readyDBInput) {
                room_info[room].readyDBInput = false;
                clearTimeout(room_info[room].readyDBInputfunc);
                room_info[room].readyDBInputfunc = null;
                replier.reply("취소되었습니다.")
            }
        }
        
        if(msg == "!노래 맞추기") {
            room_info[room].song = getRandomMusic(room_info[room].type);
            room_info[room].randomNumber = random(0, room_info[room].song.lyrics.length);
            let date = new Date(parseInt(room_info[room].song.upload_date)).toLocaleDateString("ko-kr");
            replier.reply("게임을 시작합니다!\n아래의 업로드 날짜와 가사를 보고 노래를 맞춰주세요.\n(예시: !절대 착한 아아의 ETC)\n\n" +
            "업로드 날짜: " + date + 
            "\n\n가사: \n" +
            room_info[room].song.lyrics[room_info[room].randomNumber]);
            room_info[room].timeoutfunc = setTimeout(() => { timeout(room, replier); }, room_info[room].timeout);
            return;
        }

        if(msg.startsWith("!게임 설정") && !room_info[room].timeoutfunc) {
            let args = msg.substring(7).split(" ");
            if(args[0] + " " + args[1] == "입력 시간") {
                let second = parseInt(msg.replace("!게임 설정 입력 시간 ", ""));
                if(!isNaN(second) && second <= 120) {
                    room_info[room].timeout = second * 1000;
                    replier.reply("입력 제한 시간이 " + (room_info[room].timeout / 1000) + "초로 변경되었습니다.");
                    return;
                }else{
                    replier.reply("입력 제한 시간은 숫자로만 설정 가능하며, 입력 제한 시간이 2분(120초)을 넘어가선 안됩니다.");
                    return;
                }
            }else if(args[0] + " " + args[1] == "노래 종류") {
                let typeArgs = msg.replace("!게임 설정 노래 종류 ", "").split(" ");
                if(typeArgs[0] == '837982' && typeArgs[1] == '658285') {
                    room_info[room].type = typeArgs.join(" ")
                    replier.reply("각 인자의 값들이 올바르지 않거나 하나가 누락되었습니다.\n\n" +
                    "사용법:\n!게임 설정 노래 종류 <작곡가> <보컬>\n자세히 보려면 전체보기를 눌러주세요." + lw + "\n" +
                    type.toString());
                    return;
                }else if(Object.keys(type.artist).indexOf(typeArgs[0]) == -1 || Object.keys(type.vocal).indexOf(typeArgs[1]) == -1) {
                    replier.reply("각 인자의 값들이 올바르지 않거나 하나가 누락되었습니다.\n\n" +
                    "사용법:\n!게임 설정 노래 종류 <작곡가> <보컬>\n자세히 보려면 전체보기를 눌러주세요." + lw + "\n" +
                    type.toString());
                    return;
                }
                room_info[room].type = typeArgs.join(" ")
                replier.reply("문제 노래 종류가\n작곡: " + type.artist[typeArgs[0]] + "\n보컬: " + type.vocal[typeArgs[1]] + "\n으로 지정되었습니다.")
                return;
            }else if(args[0] + " " + args[1] == "정답 정확도") {
                let percent = parseInt(msg.replace("!게임 설정 정답 정확도 ", "").split(" ")[0]);
                if(percent || !isNaN(parseInt(percent))) {
                    if(percent >= 50 && percent <= 100) {
                        room_info[room].minimumCorrectSimilarity = percent;
                        replier.reply("정답 정확도가 " + percent + "%로 지정되었습니다.");
                        return;
                    }else{
                        replier.reply("사용법:\n!게임 설정 정답 정확도 <정답 정확도>\n정답 정확도는 50% ~ 100%으로 지정할 수 있습니다.");
                        return;
                    }
                }else{
                    replier.reply("사용법:\n!게임 설정 정답 정확도 <정답 정확도>\n정답 정확도는 50% ~ 100%으로 지정할 수 있습니다.");
                    return;
                }
            }else{
                replier.reply("사용법:\n!게임 설정 <입력 시간 | 노래 종류 | 정답 정확도> ...");
                return;
            }
        }else if(msg.startsWith("!게임 설정") && room_info[room].timeoutfunc){
            replier.reply("아직 게임이 진행중입니다.\n게임이 종료되면 설정해주세요.");
            return;
        }

        if(msg == "!DB 정보") {
            try {
                let info = getDBInfo();
                let web_info = getUpdate();
                replier.reply("DB 버전: " + info.version.toFixed(2) + 
                "\n패치 노트: \n" + info.changeLog + 
                ((getDBInfo().version < web_info.version) ? "\n신버전이 발견되었습니다. DB를 업데이트 해주세요." : ""));
            }catch(e){
                replier.reply("DB 정보 로드에 실패했습니다.");
            }
        }

        if(msg.startsWith("!") && room_info[room].timeoutfunc) {
            let awnser = msg.substring(1).toLowerCase();
            if(dis(awnser, room_info[room].song.title.toLowerCase()) >= room_info[room].minimumCorrectSimilarity || dis(awnser, room_info[room].song.kr_title.toLowerCase()) >= room_info[room].minimumCorrectSimilarity) {
                let disper = (dis(awnser, room_info[room].song.title.toLowerCase()) >= room_info[room].minimumCorrectSimilarity) ? dis(awnser, room_info[room].song.title.toLowerCase()) : dis(awnser, room_info[room].song.kr_title.toLowerCase());
                clearTimeout(room_info[room].timeoutfunc);
                room_info[room].timeoutfunc = null;
                replier.reply(sender + "님 " + disper + "% 유사도로 정답!\n노래 제목(일어): " + room_info[room].song.title + "\n노래 제목(번역): " + room_info[room].song.kr_title + "\n영상 보러 가기: " + room_info[room].song.link);
                room_info[room].song = null;
                return;
            }else if(room_info[room].song.sort_title){
                let disper = dis(awnser, room_info[room].song.sort_title.toLowerCase());
                if(disper >= room_info[room].minimumCorrectSimilarity) {
                    clearTimeout(room_info[room].timeoutfunc);
                    room_info[room].timeoutfunc = null;
                    replier.reply(sender + "님 " + disper + "% 유사도로 정답!\n노래 제목(일어): " + room_info[room].song.title + "\n노래 제목(번역): " + room_info[room].song.kr_title + "\n영상 보러 가기: " + room_info[room].song.link);
                    room_info[room].song = null;
                    return;
                }
            }else{
                replier.reply(sender + "님 오답입니다.");
            }
        }
    }catch(e){
        replier.reply("Error: 500 Internal Bot Error\n처리되지 않은 예외가 발생하였습니다. 소스를 다시 컴파일합니다.\n\n" + e + " at " + e.lineNumber + "");
        Api.reload(scriptName);
    }
}

function timeout(room, replier) {
    room_info[room].timeoutfunc = null;
    replier.reply("타임오버로 실패!\n정답은 " + room_info[room].song.title + "(" + room_info[room].song.kr_title + ")였습니다!\n영상 보러 가기: " + room_info[room].song.link);
    room_info[room].song = null;
}