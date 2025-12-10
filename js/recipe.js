import { BASE_URL } from './info.js';

const showRecipe = (info) => {
    const recipeInfo = document.querySelector('#recipe-info');

    recipeInfo.querySelector('h2').innerText = info.strMeal;

    const thumbnail = recipeInfo.querySelector('img');
    thumbnail.src = info.strMealThumb;
    thumbnail.alt = info.strMeal;

    recipeInfo.querySelector('.recipe-area').innerText = info.strArea;
    recipeInfo.querySelector('.recipe-category').innerText = info.strCategory;

    recipeInfo.querySelector('#recipe-instructions').innerText = info.strInstructions;

    const MAX_INGREDIENTS = 20;

    const fragment = document.createDocumentFragment();
    for (let index = 1; index <= MAX_INGREDIENTS; index++) {
        const ingredient = info[`strIngredient${index}`].trim();
        if (ingredient === '') {
            break;
        }
        const item = document.createElement('li');
        item.innerText = ingredient + ', ' + info[`strMeasure${index}`].trim();

        fragment.append(item);
    }
    recipeInfo.querySelector('#recipe-ingredients ul').append(fragment);
};

const queryParams = new URLSearchParams(location.search);
const recipeID = queryParams.get('id');

fetch(`${BASE_URL}/lookup.php?i=${recipeID}`)
.then(response => response.json())
.then(data => {
    showRecipe(data.meals[0]);
})
.catch(error => console.log(error));