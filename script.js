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
        console.log(data);

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


submitBtn.addEventListener('click', searchMeal)