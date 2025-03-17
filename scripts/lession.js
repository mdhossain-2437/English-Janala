const showLoader = () => {
	const loader = document.getElementById("loader");
	loader.classList.remove("hidden");
	const lessonContainr = document.getElementById("lessonContainer");
	lessonContainr.classList.add("hidden");
};
const hideLoader = () => {
	const loader = document.getElementById("loader");
	loader.classList.add("hidden");
	const lessonContainr = document.getElementById("lessonContainer");
	lessonContainr.classList.remove("hidden");
};
const fetchButtons = () => {
	fetch("https://openapi.programming-hero.com/api/levels/all")
		.then((response) => response.json())
		.then((btns) => showButton(btns.data));
};
const showButton = (btns) => {
	const btnContainer = document.getElementById("btnContainer");
	for (const btn of btns) {
		const buttons = document.createElement("button");
		buttons.className = "btn btn-sm md:btn-md btn-outline btn-primary";
		buttons.onclick = () => fetchLessons(btn.level_no);
		buttons.id = `btn-${+btn.level_no}`;
		buttons.innerHTML = `<i class="fa-solid fa-book-open"></i>Lesson - ${btn.level_no}
        `;
		btnContainer.appendChild(buttons);
	}
};

fetchButtons();

const fetchLessons = (id) => {
	showLoader();
	fetch(`https://openapi.programming-hero.com/api/level/${id}`)
		.then((response) => response.json())
		.then((lessons) => {
			const button = document.getElementById(`btn-${id}`);
			const allButtons = document.querySelectorAll("#btnContainer button");
			// console.log(allButtons);
			allButtons.forEach((btn) => btn.classList.remove("btn-active"));
			button.classList.add("btn-active");
			// console.log(button);
			showLessons(lessons.data);
		})
		.catch((error) => {
			console.log(error);
			hideLoader();
		});
};
const fetchVocabulary = (id) => {
	fetch(`https://openapi.programming-hero.com/api/word/${id}`)
		.then((response) => response.json())
		.then((vocabulary) => modal(vocabulary.data));
};

const modal = (vocabulary) => {
	const modal = document.getElementById("activateModal");
	modal.showModal();
	const modalDiv = document.getElementById("modalContainer");
	modalDiv.innerHTML = "";
	const div = document.createElement("div");
	div.classList.add(
		"border-slate-200",
		"border",
		"text-left",
		"p-3",
		"md:p-6",
		"rounded-xl",
		"font-semibold",
		"text-xl",
		"md:text-2xl"
	);
	div.innerHTML = `
        <h1 class="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 lg:mb-8">
            ${vocabulary.word} (
            <i onclick="pronounceWord('${
							vocabulary.word
						}')" class="fa-solid fa-microphone-lines cursor-pointer">
            </i>: 
            ${vocabulary.pronunciation})
        </h1>

        <h2 class="md:mb-2.5">Meaning</h2>
        <h2 class="font-medium bangla">${vocabulary.meaning || "অর্থ নেই"}</h2>

        <h2 class="mt-4 md:mt-6 lg:mt-8">Example</h2>
        <p class="font-normal md:mt-2">${vocabulary.sentence}</p>

        <h2 class="font-medium bangla mt-4 md:mt-6 lg:mt-8">সমার্থক শব্দ গুলো</h2>
    `;
	const synonymsDiv = document.createElement("div");
	synonymsDiv.classList.add(
		"flex",
		"gap-2",
		"md:mt-2.5",
		"font-normal",
		"text-xl"
	);
	if (!vocabulary.synonyms || vocabulary.synonyms.length === 0) {
		const span = document.createElement("span");
		span.innerText = "সমার্থক শব্দ নেই";
		synonymsDiv.appendChild(span);
	}
	for (const synonym of vocabulary.synonyms) {
		const button = document.createElement("button");
		button.classList.add("btn");
		button.innerText = synonym;
		synonymsDiv.appendChild(button);
	}
	div.appendChild(synonymsDiv);
	modalDiv.appendChild(div);
};

function pronounceWord(word) {
	console.log(word);
	const utterance = new SpeechSynthesisUtterance(word);
	utterance.lang = "en-EN";
	window.speechSynthesis.speak(utterance);
}

const showLessons = (lessons) => {
	const lessonContainer = document.getElementById("lessonContainer");
	lessonContainer.innerHTML = "";
	if (!lessons || lessons.length === 0) {
		const lessonDiv = document.createElement("div");
		lessonDiv.classList.add(
			"flex",
			"flex-col",
			"items-center",
			"justify-center",
			"py-12",
			"col-span-3",
			"text-center"
		);
		lessonDiv.innerHTML = `
            <img class="w-[120px]" src="./assets/alert-error.png" alt="">
            <h3 class="text-sm my-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
            <h1 class="text-4xl font-medium">নেক্সট Lesson এ যান</h1>
        `;
		lessonContainer.appendChild(lessonDiv);
		hideLoader();
		return;
	}
	for (const lesson of lessons) {
		const lessonDiv = document.createElement("div");
		lessonDiv.innerHTML = `
            <div class="py-8 md:py-10 lg:py-12 px-4 md:px-6 drop-shadow-sm inter bg-white rounded-xl">
                <div class="md:h-[150px] lg:h-[160px]">
                    <h2 class="text-3xl font-bold">
                        ${lesson.word}
                    </h2>
                    <h3 class="text-xl font-medium my-4 md:my-6">
                        Meaning/ pronunciation
                    </h3>
                    <h1 class="text-3xl bangla font-semibold">
                        "${lesson.meaning || "অর্থ নেই"}/ ${
			lesson.pronunciation
		}"
                    </h1>
                </div>
                <div class="flex justify-between mt-6 md:mt-14">
                    <button onclick="fetchVocabulary(${lesson.id})" class="btn">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button onclick= "pronounceWord('${
											lesson.word
										}')" class="btn">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `;
		lessonContainer.appendChild(lessonDiv);
	}
	setTimeout(() => {
		hideLoader();
	}, 100);
};
