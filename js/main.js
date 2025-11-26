(() => {

  // Variables

  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  // Functions

  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes)

      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);

        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;

        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;

        selected.appendChild(titleElement);
        selected.appendChild(textElement);
      });
    })
    .catch(error =>{
            console.log(error);
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "The track didn’t load. Please try refreshing to get the beat back!";

            const modelViewer = document.querySelector("#model");
            modelViewer.appendChild(errorMessage);
        })
  }
  loadInfoBoxes();

  function loadMaterialInfo() {

    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materialInfo => {
      console.log(materialInfo)

        materialInfo.forEach(material => {
            const clone = materialTemplate.content.cloneNode(true);

            const materialHeading = clone.querySelector(".material-heading");
            materialHeading.textContent = material.heading;

            const materialDescription = clone.querySelector(".material-description");
            materialDescription.textContent = material.description;

      materialList.appendChild(clone);
    })
    })
    .catch(error =>{
            console.log(error);
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "The track didn’t load. Please try refreshing to get the beat back!";
            materialList.appendChild(errorMessage);
        })
  }
  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event Listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();