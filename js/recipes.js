import { BASE_URL } from './info.js';

const MAX_RECIPES = 8;

const assignLink = (anchor, url, text) => {
    anchor.href = url;
    anchor.title = text;
};

const fragment = document.createDocumentFragment();
for (let index = 0; index < MAX_RECIPES; index++) {

    await fetch(`${BASE_URL}/random.php`)
    .then(response => response.json())
    .then(data => {
        data = data.meals[0];
        console.log(data);
        
        const mealCard = document.querySelector('#recipe-card').content.cloneNode(true);

        const linkURL = `recipe.htm?id=${data.idMeal}`;
        
        const headerLink = mealCard.querySelector('h3 > a');
        headerLink.innerText = data.strMeal;
        assignLink(headerLink, linkURL, data.strMeal);
        
        const pictureLink = mealCard.querySelector('a:has(img)');
        assignLink(pictureLink, linkURL, data.strMeal);

        const thumbnail = mealCard.querySelector('img');
        thumbnail.setAttribute('src', data.strMealThumb);
        thumbnail.setAttribute('alt', data.strMeal);
        
        mealCard.querySelector('.recipe-area').innerText = data.strArea;
        mealCard.querySelector('.recipe-category').innerText = data.strCategory;
        
        fragment.append(mealCard);
    })
    .catch(error => console.log(error));
}
document.querySelector('#recipe-list').append(fragment);