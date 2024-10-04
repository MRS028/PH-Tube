// 1-Fetch,Load and show catagories

// time function
const getTimeSring = (time) => {
  // const day = parseInt(time/86400);
  const hour = parseInt(time / 3600);
  let second = time % 3600;
  const minute = parseInt(second / 60);
  second = second % 60;
  return ` ${hour} hour ${minute} minutes ${second} secons ago`;
};

const removeBtnClass = () => {
const buttons =document.getElementsByClassName('category-btn');
for(let btn of buttons){
  btn.classList.remove("bg-red-500","text-white")
}
};


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
const loadCategoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeBtnClass();
      const activeBtn= document.getElementById(`btn-${id}`);
      console.log(activeBtn);
      activeBtn.classList.add("bg-red-500","text-white");
      displayvideos(data.category)
    })
    .catch((error) => console.log(error));
};

// const cardDemo = {};

const displayvideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px]  flex flex-col gap-5 justify-center items-center">
    <img src="Assets/Icon.png">
    <h2 class="text-4xl text-center font-bold">No Content Here.</h2>
    </div>
    `;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute right-2 text-xs bottom-2 bg-black rounded p-1 text-white">${getTimeSring(
              video.others.posted_date
            )}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
         <div>
         <img class="w-10 h-10 rounded-full object-cover" src=${
           video.authors[0].profile_picture
         }/>
         </div>
         <div>
         <h2 class="font-bold">${video.title}</h2>
         <div class="flex items-center">
           <p>${video.authors[0].profile_name}</p>
           ${
             video.authors[0].verified === true
               ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
               : ""
           }
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
    // create button
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn  font-bold">
    ${item.category}
    </button>
    `;

    categoryContainer.append(buttonContainer);
  });
};
loadCategories();
loadVideos();
