const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const banner = document.getElementById("banner");
const navbar = document.getElementById("navbar");
const faqSection = document.getElementById("faq");
const vocabularySection = document.getElementById("main");

const logoutBtn = document.getElementById("logoutBtn");
const faqBtn = document.getElementById("faqBtn");
const learnBtn = document.getElementById("learnBtn");

loginForm.addEventListener("submit", handleLogin);
logoutBtn.addEventListener("click", handleLogout);
faqBtn.addEventListener("click", () => scrollToSection(faqSection));
learnBtn.addEventListener("click", () => scrollToSection(vocabularySection));

function handleLogin(e) {
	e.preventDefault();
	const username = usernameInput.value.trim();
	const password = passwordInput.value.trim();

	if (!username) {
		alert("Please enter your name!");
		return Swal.fire("Error", "Please enter your name.", "error");
	}

	if (password !== "123456") {
		return Swal.fire("Error", "Password is incorrect.", "error");
	}

	Swal.fire("Success", `Welcome ${username}!`, "success").then(() => {
		banner.classList.add("hidden");
		navbar.classList.remove("hidden");
		vocabularySection.classList.remove("hidden");
		faqSection.classList.remove("hidden");
		document.getElementById("learn").scrollIntoView({
			behavior: "smooth",
		});
	});
}
function handleLogout() {
	Swal.fire({
		title: "Are you sure?",
		text: "You will be logged out!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Logout",
	}).then((result) => {
		if (result.isConfirmed) {
			banner.classList.remove("hidden");
			navbar.classList.add("hidden");
			vocabularySection.classList.add("hidden");
			faqSection.classList.add("hidden");
		}
	});
}

const toggle = (id) => {
	const checkbox = document.getElementById(id);
	console.log(checkbox.checked);
	const plus = document.getElementById(`plus-${id}`);
	const minus = document.getElementById(`minus-${id}`);
	if (checkbox.checked) {
		plus.style.display = "none";
		minus.style.display = "block";
	} else {
		plus.style.display = "block";
		minus.style.display = "none";
	}
};
function scrollToSection(section) {
	section.scrollIntoView({ behavior: "smooth" });
}

// Disable Right Click
document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});

// Disable Specific Key Combinations
document.addEventListener("keydown", function (event) {
	if (event.ctrlKey && ["c", "u", "s", "p"].includes(event.key.toLowerCase())) {
		event.preventDefault();
	}
});

// Disable Text Selection
document.addEventListener("selectstart", function (event) {
	event.preventDefault();
});

// Prevent Copy via Mouse
document.addEventListener("copy", function (event) {
	event.preventDefault();
});
