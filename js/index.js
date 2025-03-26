function loadLevels(){
  fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res)=>res.json())
  .then((data)=>displayLevels(data.data));
}

const loadWordDetail=(wordId)=>{
  console.log(wordId);
  const url=`https://openapi.programming-hero.com/api/word/${wordId}`;
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>displayWordDetails(data.data));
}

const displayWordDetails=(word)=>{
console.log(word);
document.getElementById("word_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML=`
  
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <!-- Modal Container -->
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
          <!-- Modal Content -->
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">
              ${word.word} :
              <span class="inline-flex items-center">
               <img class="w-[18px] h-[24px]" src="assets/speaker-filled-audio-tool.png" alt=""> 
                ( ${word.pronunciation} )
              </span>
            </h2>
            
            <div class="mb-4">
              <h3 class="font-bold text-lg">Meaning</h3>
              <p class="text-gray-800">${word.meaning}</p>
            </div>
            
            <div class="mb-4">
              <h3 class="font-bold text-lg">Example</h3>
              <p class="text-gray-800">${word.sentence}</p>
            </div>
            
            <div class="mb-6">
              <p class="text-gray-800 mb-2">সমার্থক শব্দ গুলো</p>
              <div class="flex flex-wrap gap-2">
                <button class="bg-gray-200 px-4 py-2 rounded-md text-gray-700">${word.synonyms[0]}</button>
                <button class="bg-gray-200 px-4 py-2 rounded-md text-gray-700 flex items-center">
                ${word.synonyms[1]}
                </button>
                <button class="bg-gray-200 px-4 py-2 rounded-md text-gray-700">${word.synonyms[2]}</button>
              </div>
            </div>
            
            <form method="dialog">
                    <button class="bg-[#422AD5] text-white px-6 py-2 rounded font-medium hover:bg-indigo-900 transition">Complete Learning</button>
                  </form>
          </div>
        </div>
      </div>
  `;

};

const loadCatagoryWord=(id)=>{
  //id=id-100;
  console.log(id);
  const url=`https://openapi.programming-hero.com/api/level/${id}`;
console.log(url);

fetch(url)
.then((res)=>res.json())
.then((data)=>displayWord(data.data));
const lessonSelect=document.getElementById("lesson-section");
lessonSelect.remove();
};

function displayLevels(data){
  const levelContainer=document.getElementById("level-container");
  for(let dat of data){
    const levelDiv=document.createElement("div");

    levelDiv.innerHTML=`
    <button onclick="loadCatagoryWord('${dat.level_no}')" id="btn-${dat.id}" class="border border-indigo-600 text-indigo-600 rounded px-4 py-2 flex items-center hover:bg-[#422AD5]">
                <img src="assets/fa-book-open.png" alt="Book" class="h-4 mr-2"> Lesson-${dat.level_no}
            </button>
    `;

    levelContainer.append(levelDiv);
  }
}
loadLevels();

// load word
/* {
    "id": 1,
    "level": 3,
    "word": "Abundant",
    "meaning": null,
    "pronunciation": "অবানডান্ট"
}*/
function loadWord(){
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((response)=>response.json())
  .then((data)=>displayWord(data.data))
}
const displayWord=(data)=>{
const wordContainer=document.getElementById("word-container");

wordContainer.innerHTML="";

if(data.length==0){
  wordContainer.innerHTML=`
  <div
        class="py-20 col-span-full flex flex-col justify-center items-center text-center"
      >
        <img class="w-[120px]" src="assets/alert-error.png" alt="" />
        <p class="text-[13px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-2xl font-bold">
            নেক্সট Lesson এ যান
        </h2>
      </div>
  `;
}
const limitedWords = data.slice(0, 6);
for(let dat of limitedWords){
  console.log(dat);

  const wordCard=document.createElement("div");
  wordCard.innerHTML=`
  <div class="max-w-xs mx-auto bg-white rounded-lg shadow-md p-6 text-center">
  <h3 class="text-xl font-bold mb-2">${dat.word}</h3>
  <p class="text-sm text-gray-600 mb-3">Meaning /Pronunciation</p>
  <div class="flex justify-center items-center mb-2">
    <div class="w-1.5 h-1.5 bg-secondary rounded-full"></div>
  </div>
  <p class="text-lg mb-6">${dat.meaning}</p>
  
  <div class="flex justify-between">
    <button onclick=loadWordDetail(${dat.id}) class="bg-blue-100 p-2 rounded-lg">
      <img src="assets/fa-circle-question.png" alt="Info" class="h-5 w-5">
    </button>
    
    <button class="w-[45px] h-[45px] bg-blue-100 p-2 rounded-lg">
        <img src="assets/speaker-filled-audio-tool.png" alt="">
      
    </button>
  </div>
</div>
  `;
  wordContainer.append(wordCard);
}
}; 
//loadWord();



/*{"status":true,"message":"successfully fetched all the categories","categories":[{"category_id":"1001","category":"Music"},{"category_id":"1003","category":"Comedy"},{"category_id":"1005","category":"Drawing"}]} */