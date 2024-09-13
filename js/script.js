const api =
  "https://script.google.com/macros/s/AKfycbxfatxC05jucoy763t158AWIgNd6SRp7o0fKivSJHPre9VuzlJTDo2fXrmWpA3Uc2jXIQ/exec";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

renderService();

async function getServiceData() {
  try {
    const response = await fetch(`${api}?sheetName=Service`);
    if (!response) {
      throw new Error("Network Error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

function renderService() {
  const serviceData = getServiceData();
  serviceData.then((sData) => {
    const { data } = sData;
    if (data.length > 0) {
      let content = ``;
      data.map((item) => {
        content += `<li><a class="dropdown-item" href="service.html?id=${item.id}">${item.nama}</a></li>`;
      });

      const serviceMenu = document.querySelector("#service-menu");
      serviceMenu.innerHTML = content;
    }
  });
}

async function getDetailService() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  try {
    const response = await fetch(`${api}?sheetName=Service&serviceId=${id}`);
    if (!response) {
      throw new Error("network error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

function renderDetailService() {
  const detailService = getDetailService();
  detailService.then((sData) => {
    const { data } = sData;
    const { nama, deskripsi, harga, cover } = data;
    document.getElementById("cover").src = cover;
    document.getElementById("harga").innerHTML = rupiah(harga);
    document.getElementById("judul").innerHTML = nama;
    document.getElementById("deskripsi").innerHTML = deskripsi;
  });
}
