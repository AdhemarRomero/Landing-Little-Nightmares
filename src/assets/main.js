const API = 'https://youtube-v31.p.rapidapi.com/search?q=little%20nightmares%20Gameplay%20en%20Espa%C3%B1ol&part=snippet%2Cid&regionCode=PE&maxResults=9&order=date';

const content = null || document.getElementById('content');
const errorContent = null || document.getElementById('Error');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '97bd638d33msh96194d38d87b9d7p176989jsnb5971d62b395',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
      ${videos.items.map(video => `
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
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
      </a>
      `).slice(0, 8).join('')}
    `;

    content.innerHTML = view;
  } catch (error) {
    console.log(error);
    errorContent.innerHTML = `<p style="font-size: 1.3rem;"><span class="text-yellow-800" style="display: inline-block;font-size: 2rem; font-weight: bold;">Error 404</span> - videos no encontrados</p>`;
  }
})();