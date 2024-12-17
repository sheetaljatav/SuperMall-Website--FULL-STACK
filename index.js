// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const appSettings = {
    databaseURL: "https://plaground-51fc5-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const usersRef = ref(database, "users");

// DOM Elements
const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
// Navbar DOM Element
const navbar = document.getElementById("navbar");
const homeContainer = document.getElementById("home-container");
const profileContainer = document.getElementById("profile-container");
const cartContainer = document.getElementById("cart-container");

const loginEmailEl = document.getElementById("login-email");
const loginPasswordEl = document.getElementById("login-password");
const loginButtonEl = document.getElementById("login-button");
const signupFirstNameEl = document.getElementById("signup-first-name");
const signupLastNameEl = document.getElementById("signup-last-name");
const signupEmailEl = document.getElementById("signup-email");
const signupPasswordEl = document.getElementById("signup-password");
const signupButtonEl = document.getElementById("signup-button");
const goToSignupLink = document.getElementById("go-to-signup");
const goToLoginLink = document.getElementById("go-to-login");
const profileButtonEl = document.getElementById("profile-button");
const saveProfileButton = document.getElementById("save-profile");
const bioInput = document.getElementById("profile-bio");
const photoInput = document.getElementById("photo");
const backToHomeButton = document.getElementById("back-to-home");
const userTypeSelect = document.getElementById("user-type");
const logoutButtonEl = document.getElementById("logout-button");
const cartButtonEl = document.getElementById("cart-link");
const backToHomeFromCartButtonEl = document.getElementById("back-to-home-from-cart");
const scrollContainer = document.querySelector(".scroll-container");
const scrollLeftButton = document.querySelector(".scroll-left");
const scrollRightButton = document.querySelector(".scroll-right");




// Cart Elements
const cartList = document.getElementById("cart-list");  // Cart list element
const successMessage = document.getElementById("success-message");  // Success message element


// Product Sections to hide/show
const trendingSection = document.getElementById("trending-section");
const womenSection = document.getElementById("women-section");
const menSection = document.getElementById("men-section");
const shoesSection = document.getElementById("shoes-section");

// Navigation Functions
function showPage(pageId) {
    // Hide all containers
    loginContainer.style.display = "none";
    signupContainer.style.display = "none";
    homeContainer.style.display = "none";
    profileContainer.style.display = "none";
    cartContainer.style.display = "none";
    
    // Hide the sections for the product categories initially
    trendingSection.classList.add("hidden");
    womenSection.classList.add("hidden");
    menSection.classList.add("hidden");
    shoesSection.classList.add("hidden");

    // Show the selected container
    document.getElementById(pageId).style.display = "block";

    // Show or hide the navbar based on the page
    if (pageId === "home-container") {
        navbar.style.display = "flex"; // Show navbar

        // Show product sections on home page
        trendingSection.classList.remove("hidden");
        womenSection.classList.remove("hidden");
        menSection.classList.remove("hidden");
        shoesSection.classList.remove("hidden");
    } else {
        navbar.style.display = "none"; // Hide navbar
    }
}

// Add to Cart Functionality
function addToCart(productName) {
    // Add the product to the cart list
    const cartItem = document.createElement("li");
    cartItem.textContent = productName;
    cartList.appendChild(cartItem); // Append the cart item to the cart list

    // Display success message
    successMessage.textContent = `${productName} has been added to the cart.`; // Success message text
    successMessage.classList.remove("hidden"); // Make the success message visible

    // Hide the success message after 3 seconds
    setTimeout(() => {
        successMessage.classList.add("hidden"); // Hide the success message after 3 seconds
    }, 3000);
}

// Event Listeners
loginButtonEl.addEventListener("click", function () {
    const email = loginEmailEl.value.trim();
    const password = loginPasswordEl.value.trim();

    if (email && password) {
        console.log("Logging in...");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userEmail", email);
        showPage("home-container"); // Show home page after login
    } else {
        alert("Please fill out all fields.");
    }
});

signupButtonEl.addEventListener("click", function () {
    const firstName = signupFirstNameEl.value.trim();
    const lastName = signupLastNameEl.value.trim();
    const email = signupEmailEl.value.trim();
    const password = signupPasswordEl.value.trim();

    if (firstName && lastName && email && password) {
        // Save data to Firebase
        push(usersRef, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        console.log("Data saved to Firebase!");
        showPage("home-container"); // Show home page after signup
    } else {
        alert("Please fill out all fields.");
    }
});

goToSignupLink.addEventListener("click", function () {
    showPage("signup-container");
});

goToLoginLink.addEventListener("click", function () {
    showPage("login-container");
});

profileButtonEl.addEventListener("click", function () {
    showPage("profile-container");
});

cartButtonEl.addEventListener("click", function () {
    showPage("cart-container");
});

backToHomeFromCartButtonEl.addEventListener("click", function () {
    showPage("home-container");
});

document.getElementById("home-link").addEventListener("click", () => {
    showPage("home-container"); // Reload Home Page
});

saveProfileButton.addEventListener("click", () => {
    const bio = bioInput.value.trim();
    const userType = userTypeSelect.value;
    
    if (!userType || userType === "") {
        alert("Please select a user type.");
        return;
    }

    if (bio && photoInput.files.length > 0) {
        // Get the selected file (image)
        const file = photoInput.files[0];
        
        // Read the file as base64
        const reader = new FileReader();
        reader.onloadend = function () {
            const photoURL = reader.result;  // Base64 image URL

            // Save bio, photo, and user type to Firebase or localStorage
            // Here we are using localStorage for simplicity, but you can use Firebase to store data
            localStorage.setItem("userBio", bio);
            localStorage.setItem("userType", userType);
            localStorage.setItem("userPhoto", photoURL);

            alert("Profile data saved successfully!");

            // Navigate to view profile page
            showPage("view-profile-container");
            // Display the saved profile data on the view profile page
            displayProfileData();
        };

        // Read the photo file
        reader.readAsDataURL(file);
    } else {
        alert("Please fill out all fields and choose a photo.");
    }
});

backToHomeButton.addEventListener("click", function () {
    showPage("home-container");
});

logoutButtonEl.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    // Redirect to login page
    showPage("login-container");
});

// Scroll Right and Left functionality
scrollRightButton.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: scrollContainer.offsetWidth, behavior: "smooth" });
});

scrollLeftButton.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -scrollContainer.offsetWidth, behavior: "smooth" });
});

// Add to 
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const productName = button.getAttribute("data-product-name"); // Get product name from button's data attribute
        addToCart(productName); // Call the function to add to the cart
    });
});
