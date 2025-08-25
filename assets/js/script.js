if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sconv/sw.js');
}

const kzt_won_currency = 0.380; // 1 won = kzt_won_currency KZT
const rub_kzt_currency = 6.46;  // 1 rub = rub_kzt_currency KZT
const usd_kzt_currency = 539;   // 1 usd = usd_kzt_currency KZT

const rub_won_k = kzt_won_currency / rub_kzt_currency;
const usd_kzt_k = kzt_won_currency / usd_kzt_currency;

const tableBtn = document.getElementById('table-btn');
const input = document.getElementById('input');
const quantityInput = document.getElementById('quantity');
const resultKzt = document.getElementById('convert-result-kzt');
const resultRub = document.getElementById('convert-result-rub');
const resultUsd = document.getElementById('convert-result-usd');

tableBtn.addEventListener('click', function(){
    const table = document.getElementById('table');

    table.classList.toggle('table-opened');
});

input.addEventListener('change', calculate);
quantityInput.addEventListener('change', calculate);

function calculate()
{
    resultKzt.innerHTML = '';
    resultRub.innerHTML = '';
    resultUsd.innerHTML = '';

    if(!input.value) {
        return;
    }

    const won = parseFloat(input.value);
    const quantity = parseFloat(quantityInput.value);

    const kzt = won * kzt_won_currency;
    const rub = kzt * rub_won_k;
    const usd = kzt * usd_kzt_k;

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