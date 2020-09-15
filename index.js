window.onload = () => {
  const nappi = document.getElementById('startExperiment');
  nappi.onclick = (e) => {
    console.log('painettu');
    startExperiment();
  }
  // startPairing();
}

const startExperiment = () => {
  const div = document.getElementById('start');
  div.style.display = 'none';
  const experiment = document.getElementById('experiment');
  experiment.style.display = 'flex';
  startPairing();
}

const startPairing = () => {
  const paikka = document.getElementById('experiment');
  // Ensin tyhjennetään
  while (paikka.firstChild) {
    paikka.removeChild(paikka.lastChild);
  }

  const i = getRandomIntInclusive(0,tekstit.length - 1);
  const teksti = tekstit[i];

  const kuva_i = getRandomIntInclusive(190, 210);
  const kuva = `https://placegoat.com/${kuva_i}`
  createPair(document.getElementById('experiment'), kuva, {teksti: teksti, index: i});
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

const createPair = (paikka, kuva_url, {teksti, index}) => {
  const container = document.createElement('div');
  container.className = "container";

  const row = document.createElement('div');
  row.className = "row align-items-center h-100";

  const col1 = document.createElement('div');
  col1.className = "col text-center";
  col1.setAttribute('id', 'kuva');
  const col2 = document.createElement('div');
  col2.className = "col text-center";
  col2.setAttribute('id', 'teksti');

  const img = document.createElement('img');
  img.setAttribute('src', kuva_url);
  img.setAttribute('alt', 'goat');

  const p = document.createElement('p');
  p.textContent = teksti;
  p.setAttribute('id', index);
  col2.appendChild(p);
  col1.appendChild(img);
  row.appendChild(col1);
  row.appendChild(col2);

  container.appendChild(row);
  paikka.appendChild(container);

  p.onclick = () => {
    lisaaData('text', kuva_url, teksti);
  }

  img.onclick = () => {
    lisaaData('image', kuva_url, teksti);
  }
}

const lisaaData = (valinta, kuva_url, teksti) => {
  data.push({
    valinta,
    kuva: kuva_url,
    teksti,
  });
  const paikka = document.getElementById('dataContent');
  const p = document.createElement('p');
  const now =  new Date(Date.now()).toISOString();
  p.textContent = now + " | " + "Clicked on: " +  valinta + " | " + kuva_url + " | " + teksti;
  paikka.appendChild(p);
  startPairing();
}
