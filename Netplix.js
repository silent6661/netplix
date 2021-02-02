const axios = require('axios');
const puppeter = require('puppeteer');
const readline = require('readline');
var fs = require('fs')
const moment = require('moment');
const { resolve } = require('path');
const domain = process.env.EMAIL_DOMAIN_FILTER||'@blogger.com';


async function getName() {
    return new Promise(async function(resolve, reject) {
        axios.get(`https://randomuser.me/api/`).then(res => {
            dataName = res.data.results;
            resolve(dataName);

        }).catch(err => console.log(err))

    });
}

async function cardNumber() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('[-] Masukan Card Number    = ', (answer) => {
            rl.close();
            resolve(answer)
        });
    })
}

async function fCvv() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('[-] Masukan CVV    = ', (answer) => {
            rl.close();
            resolve(answer)
        });
    })
}

async function noHP() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('[-] Masukan No HP  = ', (answer) => {
            rl.close();
            resolve(answer)
        });
    })
}

async function OTP() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('[-] Masukan OTP    = ', (answer) => {
            rl.close();
            resolve(answer)
        });
    })
}

async function fLanjut() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('[-] Matikan VPN jika sudah mematikan tekan Y : ', (answer) => {
            rl.close();
            resolve(answer)
        });
    })
}

async function pilihNegara() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('[-] Pilih Negara (m, p, t) : ', (answer) => {
            rl.close();
            resolve(answer)
        });
    })
}

async function fLanjutCode() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('[-] Lanjut Create Account? Tekan Y : ', (answer) => {
            rl.close();
            resolve(answer)
        });
    })
}

async function addAccount(pass,cardnumber,cvv){
    moment.locale();
    moment().format('l');
    const today = new Date();
    const tanggal = moment().add(30, 'days').calendar();
    fs.writeFile("Oktober.txt",   "Email          = " + "ehhoetl1." + dataName[0].login.username +"@blogger.com" +"\n"+
                                "Password       = " + pass +"\n"+
                                "Expired        = " + tanggal + "\n"+
                                "Card Number    = " + cardnumber +"\n"+
                                "CVV            = " + cvv + "\n"+
                                "Created        = " + today + "\n\n\n", { flag: 'a+' }, function(err) {
        if(err) {
            return console.log(err);
        }else{
            resolve("[-] Success, Account kamu sudah disimpan di Oktober.txt")
        }   
    });
}

async function loadTXT(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(name, "utf8", (err, data) => {
            if (err) reject(err);
            let splitData = data.split("\r\n");
            resolve(splitData);
        });
    });
}

async function saveFile(value) {
    return new Promise((resolve, reject) => {
        fs.appendFile("success.txt", value, (err) => {
            if (err) reject(err);
            resolve(value);
        });
    });
}

(async () => {
    console.log(`
        █▄▀ █▀▀ █▀█ ░░█ ▄▀█ █▀█ █▀█ █▀▄ █ ░ █▀▀ █▀█ █▀▄▀█
        █░█ ██▄ █▀▄ █▄█ █▀█ █▀▄ █▄█ █▄▀ █ ▄ █▄▄ █▄█ █░▀░█
    `);
    console.log('Made with love and desire of nuyul by Haris, Rivai and Arief\n');
    let loadData = await loadTXT("empas.txt");
    let loadLink = await loadTXT("link.txt");
    let selectRegion = await pilihNegara();
    let sgd = "";
    let dataIncrement = 0;
    let linkIncrement = 0;
    while (dataIncrement < loadData.length) {
        let explodeEmpas = loadData[dataIncrement].split("|"); // index 0 For Email, index 1 For Password
        let i = 0;
        accLoop:
        while (true) {
            let explodeRegion = loadLink[linkIncrement].split("|") // Index 0 Link, Index 1 IMEI, Index 2 Region

            if (explodeRegion[2].indexOf(selectRegion) === -1) {
                console.log(`[-] Bukan Link ${selectRegion}... Repeat`);
                linkIncrement++;
                continue;
            }

            const browserGa = await puppeter.launch({
                headless: true,
                slowMo: 10,
                executablePath: 'C:\\Users\\hmuna\\Downloads\\Netflix\\node_modules\\puppeteer\\.local-chromium\\win64-818858\\chrome-win\\chrome.exe',

            });

            console.log(`[-] Link Sekarang => ${explodeRegion[0]}`);
            const context = await browserGa.createIncognitoBrowserContext();
            const page = await context.newPage();
            await page.goto(explodeRegion[0]);
            const element_try = await page.$("h1.stepTitle");
            sgd = await page.evaluate(element_try => element_try.innerText, element_try);

            if (sgd.indexOf("Sorry, something went wrong.") !== -1 || sgd.indexOf("Hmm… Something’s wrong with this link.") !== -1 || sgd.indexOf("Sign into your Netflix account") !== -1 || sgd.indexOf("Sorry, this offer from XIAOMI has already been used.") !== -1) {
                linkIncrement++;
                console.log(`[-] Link 6 Month Error!... repeat`);
                browserGa.close();
                continue;
            }

            await page.goto("https://www.netflix.com/login");
            let wrongPass = false;
            while (true) {
                console.log("[-] Mulai Login Netflix");
                console.log(`[-] ${explodeEmpas[0]}|${explodeEmpas[1]}`);
                if (!wrongPass) {
                    const input_email = "#id_userLoginId";
                    await page.waitForTimeout(3000);
                    await page.type(input_email, explodeEmpas[0].trim());
                }
                await page.waitForTimeout(3000);
                const input_password = "#id_password";
                await page.type(input_password, explodeEmpas[1].trim());
                await page.waitForTimeout(3000);
                page.keyboard.press('Enter');
                await page.waitForNavigation();
                if (await page.$("div.ui-message-contents > b") !== null || await page.$("div.ui-message-contents") !== null) {
                    let element_try = await page.$("div.ui-message-contents");
                    sgd = await page.evaluate(element_try => element_try.innerText, element_try);
                    console.log(sgd);
                    console.log("\n");
                    if (sgd.indexOf("We are having technical difficulties and are actively working on a fix. Please try again in a few minutes.") !== -1) {
                        console.log("To many logon attemp, skipped...");
                        break accLoop;
                    }
                    wrongPass = true;
                } else {
                    break;
                }   
            }
            if (await page.$(".list-profiles .profile-gate-label") !== null) {
                await page.goto(explodeRegion[0]);
                page.keyboard.press('Tab');
                page.keyboard.press('Tab');
                page.keyboard.press('Tab');
                page.keyboard.press('Enter');
                await page.waitForNavigation();
                await page.waitForTimeout(3000);
                page.keyboard.press('Tab');
                let element_try = await page.$("div.stepHeader > h1.stepTitle");
                sgd = await page.evaluate(element_try => element_try.innerText, element_try);
                console.log(sgd);
                if (sgd.indexOf("Sorry, this offer from") !== -1 || sgd.indexOf("Maaf, penawaran ini dari XIAOMI tidak dapat ditukarkan di akun Netflix ini") !== -1) {
                    let dateNow = moment().format("Y/M/D H:m:s");
                    await saveFile(`${explodeEmpas[0]}|${explodeEmpas[1]}|${dateNow}\n`);
                    browserGa.close();
                    break;
                }
                page.keyboard.press('Enter');
                await page.waitForNavigation();
            } else {
                await page.goto(explodeRegion[0]);
                page.keyboard.press('Tab');
                page.keyboard.press('Tab');
                page.keyboard.press('Tab');
                page.keyboard.press('Enter');
                await page.waitForNavigation();
                await page.waitForTimeout(3000);
                page.keyboard.press('Tab');
                page.keyboard.press('Enter');
                await page.waitForNavigation();
                await page.waitForTimeout(3000);
                page.keyboard.press('Tab');
                page.keyboard.press('Tab');
                page.keyboard.press('Tab');
                page.keyboard.press('Tab');
                page.keyboard.press('Space');
                await page.waitForTimeout(3000);
                page.keyboard.press('Tab');
                page.keyboard.press('Enter');
                await page.waitForNavigation();
                await page.waitForTimeout(2000);
            }
            browserGa.close();
            console.log(`[-] Sukses Mengambil Voc [${i}].... Repeat`);
            console.log("\n");
            i++;
        }
        dataIncrement++;
    }
    console.log("Selesai...");
})()