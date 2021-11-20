
// Variables & Selectors //

const mealButton = document.getElementById("generate-meal");
const recipe = document.getElementById("recipe");
const video = document.getElementById("video");

// Event Listeners ///

mealButton.addEventListener('click', () => {
    generateMeal();
});
document.addEventListener("DOMContentLoaded", () => {
    generateMeal();
})


// function to fetch meal data from the API //

function generateMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((response) => response.json())
        .then((response) => {
            createMeal(response.meals[0]);
        })
        .catch((error) => {
            console.log(error);
        })
}

// function with a for loop to grab the ingredients & portions
// set the inner html for the recipe

function createMeal(meal) {
        const ingredients = [];
        for(let i = 1; i <= 20; i++){
            if(meal[`strIngredient${i}`]){
                ingredients.push(
                    `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                );
            } else {
                break;
            }
        }
        console.log(ingredients);
        recipe.innerHTML = `
            <div class="img-thumb">
                <img src= "${meal.strMealThumb}" alt="Meal Image"/>
                
            </div>
            <div class="text"> 
            
                <h2 class="title"> ${meal.strMeal}</h2>
                
                <p><span class="bold">Category: </span> ${meal.strCategory}</p>
                <p class="instructions"> ${meal.strInstructions} </p>
                <h6>Ingredients -</h6>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                
            </div>
            `;
        
        video.innerHTML = `
            <div class="video-wrap">
                <h5>Video Recipe</h5>
                <iframe src="https://youtube.com/embed/${meal.strYoutube.slice(-11)}"/>
            </div>
        `;
    }
                
    
        









