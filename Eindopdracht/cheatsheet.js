const clearDOM = () => {
    const mainParent = document.getElementById("main");
    while (mainParent.firstChild) {
      mainParent.removeChild(mainParent.firstChild);

    }
}

const showMarsPhoto = json => {
    
  clearDOM();
    // console.log(json);
    for(let i = 0; i < 1; i++) {
        // console.log(json.photos[i].camera.full_name);

        const earthDate = document.createElement("h2");
        earthDate.textContent = `Life on Mars - ${json.photos[0].earth_date}`;
        document.querySelector("main").appendChild(earthDate);

        const roverName = document.createElement("h3");
        roverName.textContent = `${json.photos[0].rover.name} - ${json.photos[0].camera.full_name}`;
        document.querySelector("main").appendChild(roverName);

        const img = document.createElement("img");
        img.src = json.photos[i].img_src;
        document.querySelector("main").appendChild(img);
    }

};
 

const getBirthday = () => {
    const birthday = document.getElementById("birthday").value;
    return birthday;
    }
    
    const inputElement = document.getElementById("birthday");
    
    inputElement.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
        getBirthday(birthday);
        getData(birthday);
        }
      });

      const getData = async () => {
        let baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
        let birthday = getBirthday();
        let earth_date = `2019-${birthday}`;
        let API_KEY = "to5LG29lBPyr0XBCs8Kpps4q9D0GI0bm0d1RUvzq";
      
    
      await fetch(`${baseUrl}?earth_date=${earth_date}&api_key=${API_KEY}`)
        .then(response => response.json())
        .then(json => showMarsPhoto(json))
        .catch(error => {
          console.log(`We lost contact to the Rover due to ${error}`);
          const earthDateError = document.createElement("h2");
          earthDateError.textContent = `Sorry, no photos were taken on Mars 2019-${birthday}`;
          document.querySelector("main").appendChild(earthDateError);
        });
      };
