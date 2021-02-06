window.addEventListener("load", () => {
  let lon;
  let lat;
  let temperatureDesc = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let wIcon = document.querySelector(".wIcon");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const key = `9caf8174a4ab4541b61182837210502`;
      const api = `http://api.weatherapi.com/v1/current.json?key=9caf8174a4ab4541b61182837210502&q=${lat}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_f } = data.current;
          const { text, icon } = data.current.condition;
          const { country, localtime, name, tz_id } = data.location;
          //set DOM Elements from the API
          temperatureDegree.textContent = temp_f;
          temperatureDesc.textContent = text;
          locationTimezone.textContent = tz_id;
          wIcon.innerHTML = icon;
          //   wIcon.HTMLImageElement.crossOrigin = { icon };
          //   //set Icon
          //   setIcons(icon, document.querySelector(".icon"));
        });
      //Change temperature to Celsius/Farenheit
      temperatureSection.addEventListener("click", () => {
        if (temperatureSpan.textContent === "F") {
          temperatureSpan.textContent = "C";
        } else {
          temperatureSpan.textContent = "F";
        }
      });
    });
  } else {
    h1.textContent = "IT DOESNT WORK";
  }

  //   function setIcons(icon, iconID) {
  //     const skycons = new Skycons({ color: "white" });
  //     const currentIcon = icon.replace(icon).toUppercase();
  //     skycons.play();
  //     return skycons.set(iconID, Skycons[currentIcon]);
  //   }
});
