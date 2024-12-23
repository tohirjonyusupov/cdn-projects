const libraryName = new URLSearchParams(window.location.search).get('libraryName');
const infoBox = document.querySelector('.info-box');

axios.get(`https://api.cdnjs.com/libraries/${libraryName}`).then((response) => {
  const library = response.data;
  const tags = library.keywords;
  const versions = library.versions;
  infoBox.innerHTML = `
    <p><span class="libraryName">${library.name}</span> ${library.description}</p>
    <p><span>231k</span>GitHub package 0 known vulnerabilities</p>
    <p id="tags">Tags:</p>
  `

  tags.map((tag) => {
    document.getElementById('tags').innerHTML += `<span>${tag}</span> `
  })

  for (let i = versions.length - 1; i > 0; i--) {
    document.getElementById('versions').innerHTML += `<option value="${versions[i]}">${versions[i]}</option>`
  }

  library.assets[0].files.map((file) => {
    document.querySelector('.links').innerHTML += `<div class="link">${file}</div>`
  })
})