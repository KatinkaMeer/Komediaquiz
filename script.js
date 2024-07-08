let currentCategoryIndex = 0;

function generateLikertScale(name, weight, inverted) {
    let scaleHtml = '<div class="likert-scale" data-weight="' + weight + '">';
    const values = inverted ? [4, 3, 2, 1, 0] : [0, 1, 2, 3, 4];
    const approval = inverted ? ["stimme zu", "stimme eher zu", "teil/teils", "stimme eher nicht zu", "stimme nicht zu"] : ["stimme nicht zu", "stimme eher nicht zu", "teils/teils", "stimme eher zu", "stimme zu"];
    for (let value of values) {
        scaleHtml += '<label style="display: inline-block; text-align:center;"><input type="radio" name="' + name + '" value="' + value + '">' + "</br>" + "&nbsp &nbsp" + approval[value] + "&nbsp &nbsp" + '</label>';
    }
    scaleHtml += '</div>';
    return scaleHtml;
}

function generateCategoryCard(category, index) {
    let cardHtml = '<div class="card mb-3" style="border: 2px solid #004c93">';
    cardHtml += '<div class="card-header"><h2>' + category.name + '</h2></div>';
    cardHtml += '<div class="card-body"><ul class="list-group list-group-flush">';

    category.questions.forEach((question, questionIndex) => {
        const name = 'q' + index + '.' + (questionIndex + 1);
        cardHtml += '<li class="list-group-item" data-category="' + category.name + '">';
        cardHtml += '<h5>' + question.text + '</h5>';
        //cardHtml += '<p>Gewichtung ' + question.weight + '</p>'; //only for debug
        cardHtml += generateLikertScale(name, question.weight, question.inverted);
        cardHtml += '</li>';
    });

    cardHtml += '</ul></div></div>';
    return cardHtml;
}

function displayCategory(index) {
    const category = categories[index];
    document.getElementById('content').innerHTML = generateCategoryCard(category, index);
    document.getElementById('prevButton').style.visibility = index > 0 ? 'visible' : 'hidden';
    document.getElementById('nextButton').style.display = index < categories.length - 1 ? 'inline-block' : 'none';
    document.getElementById('saveButton').style.display = index === categories.length - 1 ? 'inline-block' : 'none';
}

function nextCategory() {
    if (currentCategoryIndex < categories.length - 1) {
        saveAnswers();
        currentCategoryIndex++;
        displayCategory(currentCategoryIndex);
    }
}

function prevCategory() {
    if (currentCategoryIndex > 0) {
        saveAnswers();
        currentCategoryIndex--;
        displayCategory(currentCategoryIndex);
    }
}

displayCategory(currentCategoryIndex);

const categorynames = categories.map(cat => cat.name);
let categorySums = new Array(categorynames.length).fill(0);

function saveAnswers() {
    categorySums[currentCategoryIndex] = 0;

    // Iterate through all checked radio inputs in the current category
    document.querySelectorAll(`#content input[type="radio"]:checked`).forEach((radio) => {
        const value = parseInt(radio.value);
        const weight = parseFloat(radio.closest('.likert-scale').dataset.weight);

        categorySums[currentCategoryIndex] += value * weight;
    });

    updateChart();
}

function showResults() {
    saveAnswers();
    document.getElementById("resultsContainer").style.display = 'block';
    document.getElementById("resultsContainer").scrollIntoView({ behavior: 'smooth'});
}

const data = {
    labels: categorynames,
    datasets: [{
        label: 'Deine Antworten',
        data: categorySums,
        fill: true,
        backgroundColor: 'rgba(236, 114, 6, 0.2)',  // Lighter shade with 20% opacity
        borderColor: 'rgb(236, 114, 6)',  // Primary color
        pointBackgroundColor: 'rgb(236, 114, 6)',  // Primary color
        pointBorderColor: '#fff',  // White border for points
        pointHoverBackgroundColor: '#fff',  // White background when hovering over points
        pointHoverBorderColor: 'rgb(236, 114, 6)'  // Primary color border when hovering
    }, {
        label: 'Vergleichswert',
        data: [18, 15, 10, 18, 18, 18, 12],
        fill: true,
        backgroundColor: 'rgba(169, 169, 169, 0.2)',  // Light gray with 20% opacity
        borderColor: 'rgb(169, 169, 169)',  // Gray color
        pointBackgroundColor: 'rgb(169, 169, 169)',  // Gray color
        pointBorderColor: '#fff',  // White border for points
        pointHoverBackgroundColor: '#fff',  // White background when hovering over points
        pointHoverBorderColor: 'rgb(169, 169, 169)'  // Gray color border when hovering
    }]
};

const config = {
    type: 'radar',
    data: data,
    options: {
        animation: {
            duration: 0
        },
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                    lineWidth: 3
                },
                suggestedMin: 0,
                suggestedMax: 24
            }
        }
    },
};

const myRadarChart = new Chart(
    document.getElementById('myRadarChart'),
    config
);

function updateChart() {
    myRadarChart.data.datasets[0].data = categorySums;
    myRadarChart.update();
};


//showResults(); //only for debug