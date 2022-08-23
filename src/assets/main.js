//Web para encontrar APIs: https://rapidapi.com/
//En esta ocasión vamos a utlizar la API de Youtube V3
const API = "https://youtube-v31.p.rapidapi.com/search?channelId=UCYbggI6qVceWa1_1dfH0hMA&part=snippet%2Cid&order=date&maxResults=5";

//Vamos a emplear la plantilla que aparece en rapidapi para JavaScript -> fetch, pero modificándola
const content = null || document.querySelector("#content"); //Hacemos la llamada al div con id="content"
//La variable options la dejamos tal cual nos aparece en rapidapi
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'bc0e9a99b3msh56ccbe05ad81df1p1a5709jsnc1d906d3e634',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};
//Modificamos el códifo fetch estructurado con then y catch, ya que en su lugar utilizaremos la lógica del async/await
async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);  //hacemos uso del fetch y en esta ocasión le pasamos la variable options
    const data = await response.json();
    return data;
}
//Vamos a crear una función que se invoca a sí misma
(async () => {
    //Dentro de try{} estará el llamado de la API y el template de html para interpretar los datos a iterar por cada objeto, en este caso, cuando analizamos la salida de la API en rapidapi, hay una jerarquía de los datos, están los “items”, el “snippet” de cada item, luego “thumbnails” y éste a su vez los tamaños de la imagen (nos interesa con la más alta resolución “high”), también nos interesa mostrar la descripción y el nombre de cada vídeo
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0, 4).join("")}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();