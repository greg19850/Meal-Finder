const search = document.getElementById('search');
const submitBtn = document.querySelector('.search-btn');
const randomBtn = document.getElementById('random');
const resultHeading = document.getElementById('result-heading')
const mealsEl = document.getElementById('meals')
const single_mealEl = document.getElementById('single-meal');

// Search meal and fetch API

function searchMeal(e) {
  e.preventDefault();

  const mealName = search.value

  if (mealName.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals === null) {
          resultHeading.innerHTML = `<p> There are no results for '${mealName}'. Try again!`;
        } else {
          resultHeading.innerHTML = `<h2>Search results for '${mealName}' :</h2>`

          mealsEl.innerHTML = data.meals.map(meal => `
          <div class='meal'>
            <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
            <div class='meal-info' data-mealID='${meal.idMeal}'>
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `)
            .join('')
        }
      })
    search.value = ''
  } else alert('Please enter meal name!')
}

function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDom(meal)
    })
}

function addMealToDom(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else break;
  }

  single_mealEl.innerHTML = `
  <div class='single-meal'>
    <h1>${meal.strMeal}</h1>
    <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
    <div class='single-meal-info'>
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class='main'>
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
      ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
  </div>
  `;
}

function selectMealID(e) {
  const mealInfo = e.path.find(meal => {
    if (meal.classList) {
      return meal.classList.contains('meal-info')
    } else return
  })

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID')
    getMealByID(mealID)
  }
}

function randomMealSearch() {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = ''

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDom(meal)
    })
}

mealsEl.addEventListener('click', selectMealID);
submitBtn.addEventListener('click', searchMeal);
randomBtn.addEventListener('click', randomMealSearch);
