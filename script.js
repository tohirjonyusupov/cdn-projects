const cards = document.querySelector(".cards");

axios
  .get("https://api.cdnjs.com/libraries?limit=10")
  .then((response) => {
    const libraries = response.data.results;
    
    libraries.map((library) => {
      axios.get(`https://api.cdnjs.com/libraries/${library.name}?limit=1`).then((response) => {
        const library = response.data;
        const tags = library.keywords;
        cards.innerHTML += `
        <div class="card">
          <p onclick="goToNextPage('${library.name}')">${library.name} <span>@ ${library.version}</span></p>
          <p>${library.description}</p>
          <p id="tags">Tags: ${tags[0]}, ${tags[1]}, ${tags[2]}, ${tags[3]}</p>
        </div>
        `
      })
    });

  })
  .catch((err) => {
    console.log(err);
  });

function goToNextPage(library) {
  window.location.href = `library.html?libraryName=${library}`
}  