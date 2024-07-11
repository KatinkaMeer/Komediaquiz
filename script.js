let currentCategoryIndex = 0;

function generateLikertScale(name, weight, inverted) {
    let scaleHtml = '<div class="likert-scale" data-weight="' + weight + '">';
    const values = inverted ? [4, 3, 2, 1, 0] : [0, 1, 2, 3, 4];
    const approval = inverted ? ["stimme zu", "stimme eher zu", "teil/teils", "stimme eher nicht zu", "stimme nicht zu"] : ["stimme nicht zu", "stimme eher nicht zu", "teils/teils", "stimme eher zu", "stimme zu"];
    for (let value of values) {
        scaleHtml += '<label class="mt-2" style="display: inline-block; text-align:center;"><input type="radio" name="' + name + '" value="' + value + '">' + "</br>" + "&nbsp &nbsp" + approval[value] + "&nbsp &nbsp" + '</label>';
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
        cardHtml += '<li class="list-group-item py-4" data-category="' + category.name + '">';
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
    document.getElementById("content").scrollIntoView({ behavior: 'instant'});
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
    showIndividualText();
}

function showResults() {
    saveAnswers();
    document.getElementById("resultsContainer").style.display = 'block';
    document.getElementById("resultsContainer").scrollIntoView({ behavior: 'smooth'});
}

function showIndividualText() {
    var resultTextElement = document.getElementById('resultText');
    resultTextElement.innerHTML = "";
    let additionalText1 = "";
    let additionalText2 = "";
    let additionalText3 = "";
    let additionalText4 = "";
    let additionalText5 = "";
    let additionalText55 = ""; 
    let additionalText6 = "";
    let additionalText7 = "";
    let additionalText8 = "";
    let additionalText9 = "";
    let additionalText10 = "";

    let c = [], d = [], e = [], f = [];

    i = 0;
    while (i < categorySums.length) {

        let categorysum = categorySums[i];
        let categoryname = categorynames[i];
        let opt =  optimum[i];
        let devianz = categorysum - opt;

        console.log("Kategorie: ", categoryname, " Summe: ", categorySums, " Abweichung vom Optimumg: ", devianz);

        if (i < 3 && devianz > 3) {
            c.push(categoryname);

            if (c.length == 1){
                additionalText1 = "mit deinem Wert im Bereich " + c[0];
                additionalText2 = "diesem Gebiet";
                additionalText3 = c[0];
                additionalText4 = "diesem Bereich";
            }
            if (c.length == 2){
                additionalText1 = "mit deinen Werten in den beiden Bereichen " + c[0] + " und " + c[1];
                additionalText2 = "diesen Gebieten";
                additionalText3 = c[0] + " oder " + c[1];
                additionalText4 = "diesen Bereichen";
            }
            if (c.length == 3){
                additionalText1 = "mit deinen Werten in den drei Bereichen " + c[0] + ", " + c[1] + " und " + c[2];
                additionalText2 = "in diesen Gebieten";
                additionalText3 = c[0] + ", " + c[1] + " oder " + c[2];
                additionalText4 = "diesen Bereichen";
            }
        }

        if (i < 3 && devianz < -3) {
            d.push(categoryname);

            if (d.length == 1){
                additionalText5 = "deinem Wert im Bereich " + d[0];
                additionalText55 = "diesem Bereich";
                additionalText6 = "dieser Bereich einen Teil des Studiums ausmacht";
            }
            if (d.length == 2){
                additionalText5= "deinen Wertem in den beiden Bereichen " + d[0] + " und " + d[1]; 
                additionalText55 = "diesen Bereichen"
                additionalText6 = "diese Bereiche einen Teil des Studiums ausmachen";
            }
            if (d.length == 3){
                additionalText5= "deinen Werten in den drei Bereichen " + d[0] + ", " + d[1] + " und " + d[2];
                additionalText55 = "diesen Bereichen"
                additionalText6 = "diese Bereiche einen Teil des Studiums ausmachen";
            }
        }

        if (i == 2 && additionalText1) {
            resultTextElement.innerHTML += `<br/> Du liegst ` + additionalText1 + ` deutlich oberhalb des Vergleichswerts. 
                                            Das heißt du hast eventuell mehr Interesse in ` + additionalText2 + ` als erforderlich. 
                                            Komedia ist ein sehr vielseitiger Studiengang, in dem vor allem im Bachelor viele Grundlagen gelehrt werden.
                                            Wenn du dich in ` + additionalText3 +  ` deutlich stärker vertiefen willst, dann schaue dir vielleicht andere Studiengänge der UDE in ` + additionalText4 + ` an.
                                            Aber trotzdem gilt für Komedia: Besser zu viel Interesse als zu wenig!`+"<br/>";
        }

        if (i == 2 && additionalText5) {
            resultTextElement.innerHTML += `<br/> Du liegst mit ` + additionalText5 + ` deutlich unterhalb des Vergleichswerts.
                                            Das heißt du hast eventuell nicht ganz so viel Interesse in ` + additionalText55 + `.
                                            Sei dir bewusst, dass ` + additionalText6 + `,
                                            für den ein gewisses Interesse und eine grundlegende Bereitschaft sich darin einzuarbeiten, erforderlich sind.
                                            Vielleicht würden dir daher manche Module nicht ganz leichtfallen,
                                            aber da stets mit den Grundlagen begonnen wird, kannst auch du diese meistern,
                                            wenn du Lust hast, dich damit auseinanderzusetzen!`+"<br/>";
        }

        if (i > 2 && i < 6 && devianz > 3) {
            e.push(categoryname);

            if (e.length == 1){
                additionalText7 = "deinem Wert im Bereich " + e[0];
                additionalText8 = "diesem Bereich";
            }
            if (e.length == 2){
                additionalText7 = "deinen Wertem in den beiden Bereichen " + e[0] + " und " + e[1]; 
                additionalText8 = "diesen Bereichen";
            }
            if (e.length == 3){
                additionalText7 = "deinen Werten in den drei Bereichen " + e[0] + ", " + e[1] + " und " + e[2];
                additionalText8 = "diesen Bereichen";
            }
        }

        if (i > 2 && i < 6 && devianz < -3) {
            f.push(categoryname);

            if (f.length == 1){
                additionalText9 = "deinem Wert im Bereich " + f[0];
                additionalText10 = "Dieser Bereich ist";
            }
            if (f.length == 2){
                additionalText9 = "deinen Wertem in den beiden Bereichen " + f[0] + " und " + f[1]; 
                additionalText10 = "Diese Bereiche sind";
            }
            if (f.length == 3){
                additionalText9 = "deinen Werten in den drei Bereichen " + f[0] + ", " + f[1] + " und " + f[2];
                additionalText10 = "Diese Bereiche sind";
            }
        }

        if (i == 5 && additionalText7) {
            resultTextElement.innerHTML += `<br/> Du liegst mit ` + additionalText7 + ` sogar deutlich oberhalb des Vergleichswerts.
                                            Super, du scheinst in ` + additionalText8 + ` die besten Voraussetzungen zu haben!<br/>`;
        }

        if (i == 5 && additionalText9) {
            resultTextElement.innerHTML += `<br/> Du liegst mit ` + additionalText9 +  ` deutlich unterhalb des Vergleichswerts. ` 
                                            + additionalText10 + ` über das gesamte Studium hinweg von Bedeutung und daher ein wesentlicher Bestandteil.
                                            Wenn du dich damit überhaupt nicht identifizieren kannst,
                                            scheint Komedia vermutlich nicht die beste Option für dich zu sein.<br/>`;
        }

        if (i == 6 && devianz > 3) {
            resultTextElement.innerHTML += `<br/> Du liegst mit deinem Wert im Bereich `+ categoryname + ` deutlich oberhalb des Vergleichswerts.
                                            Super, du kannst dir anscheinend viele Berufe vorstellen, die mit dem Komedia-Studiengang möglich sind.
                                            Das waren aber bei Weitem nicht alle und mit einem Komedia-Abschluss gibt es sehr vielseitige Optionen,
                                            die du während des Studiums noch entdecken kannst! <br/>`;
        }

        if (i == 6 && devianz < -3) {
            resultTextElement.innerHTML += `<br/> Du liegst mit deinem Wert im Bereich ` + categoryname + ` deutlich unterhalb des Vergleichswerts.
                                            Mit einem Abschluss in Komedia gibt es viele verschiedene Berufsmöglichkeiten, von denen wir in diesem Quiz nur einen Bruchteil abgedeckt haben.
                                            Auch wenn du jetzt noch nicht weißt, welchen beruflichen Weg du einschlagen möchtest, hast du im Studium noch genug Zeit,
                                            dir darüber Gedanken zu machen und herauszufinden, was dir am meisten Spaß macht.
                                            Mit Komedia stehen dir die Türen in vielen Bereichen offen! <br/>`;
        }

        i++;
    }
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
        data: optimum,
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