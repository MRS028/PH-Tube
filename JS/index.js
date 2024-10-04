// 1-Fetch,Load and show catagories
// Create loadCatagories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCetegories(data.categories))
    .catch((error) => console.log(error));
};
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayvideos(data.videos))
    .catch((error) => console.log(error));
};
const cardDemo = {};

const displayvideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class="h-[200px]">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2 flex gap-2">
         <div>
         <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
         </div>
         <div>
         <h2 class="font-bold">${video.title}</h2>
         <div class="flex items-center">
           <p>${video.authors[0].profile_name}</p>
           <img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">
         </div>
         </div>
    
    </div>
        `;
    videoContainer.append(card);
  });
};
// displayCatagories

const displayCetegories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);

    const button = document.createElement("button");
    button.classList = "btn justify-center font-bold";
    button.innerText = item.category;

    categoryContainer.appendChild(button);
  });
};
loadCategories();
loadVideos();
