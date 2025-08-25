if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sconv/sw.js');
}

let won_kzt_currency = 0.380; // 1 won = kzt_won_currency KZT
let rub_kzt_currency = 6.46;  // 1 rub = rub_kzt_currency KZT
let usd_kzt_currency = 539;   // 1 usd = usd_kzt_currency KZT

const tableBtn = document.getElementById('table-btn');
const input = document.getElementById('input');
const quantityInput = document.getElementById('quantity');
const calculateBtn = document.getElementById('convert-btn');
const resultKzt = document.getElementById('convert-result-kzt');
const resultRub = document.getElementById('convert-result-rub');
const resultUsd = document.getElementById('convert-result-usd');

function calculate()
{
    resultKzt.innerHTML = '';
    resultRub.innerHTML = '';
    resultUsd.innerHTML = '';

    if(!input.value) {
        return;
    }

    const won_kzt_currency_input = +document.getElementById('won_kzt_currency').value;
    const rub_kzt_currency_input = +document.getElementById('rub_kzt_currency').value;
    const usd_kzt_currency_input = +document.getElementById('usd_kzt_currency').value;

    console.log(won_kzt_currency_input, rub_kzt_currency_input, usd_kzt_currency_input);

    if(won_kzt_currency_input) {
        won_kzt_currency = won_kzt_currency_input;
    }

    if(rub_kzt_currency_input) {
        rub_kzt_currency = rub_kzt_currency_input;
    }

    if(usd_kzt_currency_input) {
        usd_kzt_currency = usd_kzt_currency_input;
    }

    const won = parseFloat(input.value);
    const quantity = parseFloat(quantityInput.value);

    const kzt = won * won_kzt_currency;
    const rub = Math.round(kzt / rub_kzt_currency * 100) / 100;
    const usd = Math.round(kzt / usd_kzt_currency * 100) / 100;

    const totalKzt = kzt * quantity;
    const totalRub= rub * quantity;
    const totalUsd = usd * quantity;

    const printKzt = kzt.toLocaleString('ru');
    const printRub = rub.toLocaleString('ru');
    const printUsd = usd.toLocaleString('ru');

    const printTotalKzt = totalKzt.toLocaleString('ru');
    const printTotalRub = totalRub.toLocaleString('ru');
    const printTotalUsd = totalUsd.toLocaleString('ru');

    resultKzt.innerHTML = `${printKzt} &#8376; x ${quantity} = ${printTotalKzt} &#8376;`;
    resultRub.innerHTML = `${printRub} &#8381; x ${quantity} = ${printTotalRub} &#8381;`;
    resultUsd.innerHTML = `${printUsd} &#36; x ${quantity} = ${printTotalUsd} &#36;`;
}

tableBtn.addEventListener('click', function(){
    const table = document.getElementById('table');

    table.classList.toggle('table-opened');
});

input.addEventListener('change', calculate);
quantityInput.addEventListener('change', calculate);
calculateBtn.addEventListener('click', calculate);