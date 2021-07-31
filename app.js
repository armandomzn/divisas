let inputs = document.getElementsByTagName("input");
let input = [...inputs];

input.forEach((i) => {
  i.addEventListener("change", function (e) {
    let factor = this.value / this.dataset.exchange;
    input.forEach((element) => {
      element.value = element.dataset.exchange * factor.toFixed(2);
    });
  });
});

async function getExchange(url = "http://api.exchangeratesapi.io/v1/latest?") {
  try {
    const response = await fetch(
      `${url}` +
        new URLSearchParams({
          access_key: "bc42cdb7473fe93ae57a59e9b20e8291",
        })
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

let array = ["MXN", "EUR", "USD", "JPY"];
getExchange()
  .then((data) => {
    console.log(data);
    array.forEach((element) => {
      document.getElementById(`${element}`).dataset.exchange =
        data.rates[element].toFixed(2);
      document.getElementById(`${element}`).value =
        data.rates[element].toFixed(2);
    });
    let currentRate = data.base;
    let r = document.createTextNode(currentRate);
    document.getElementById("rate").appendChild(r);
  })
  .catch((e) => {
    console.log(e);
  });
