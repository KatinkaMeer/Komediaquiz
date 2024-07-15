let currentCategoryIndex = 0;

let initialLoad = true;

let transparencyMode = document.getElementById('switch1').checked;
function updateTransparencyMode() {
    transparencyMode = document.getElementById('switch1').checked;
    console.log("Transparency Mode is now: " + (transparencyMode ? "enabled" : "disabled"));
    setTimeout(() => {
        currentCategoryIndex = 0;
        displayCategory(currentCategoryIndex);
    }, 200);
    if (!transparencyMode) {
        unshowResults();
    }
}
document.getElementById('switch1').addEventListener('change', updateTransparencyMode);

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
    let cardHtml = '<div class="card mb-2" style="border: 2px solid #004c93">';
    cardHtml += '<div class="card-header mt-2"><h2>' + category.name + '</h2></div>';
    cardHtml += '<div class="card-body"><ul class="list-group list-group-flush">';

    category.questions.forEach((question, questionIndex) => {
        const name = 'q' + index + '.' + (questionIndex + 1);
        cardHtml += '<li class="list-group-item py-4" data-category="' + category.name + '">';
        cardHtml += '<h5>' + question.text + '</h5>';
        if (transparencyMode) {
            cardHtml += '<p>Gewichtung: ' + question.weight + "&nbsp&nbsp&nbsp Invertiert: " + question.inverted + '</p>';
        }
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
    if (!transparencyMode && !initialLoad) {
        initialLoad = false;
        document.getElementById("content").scrollIntoView({ behavior: 'instant'});
    }

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
        if (!transparencyMode) {
            unshowResults();
        }
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

function unshowResults() {
    document.getElementById("resultsContainer").style.display = 'none';
}

function showIndividualText() {
    var resultTextElement = document.getElementById('resultText');
    resultTextElement.innerHTML = "";
    let additionalText1 = "", additionalText2 = "", additionalText3 = "", additionalText4 = "";
    let additionalText5 = "", additionalText55 = "", additionalText6 = "";
    let additionalText7 = "", additionalText8 = "";
    let additionalText9 = "", additionalText10 = "";
    let additionalText11 = "";

    let c = [], d = [], e = [], f = [];

    let nahcat = [];
    let noMatch = [];

    i = 0;
    while (i < categorySums.length) {

        let categorysum = categorySums[i];
        let categoryname = categorynames[i];
        let opt =  optimum[i];
        let devianz = categorysum - opt;

        console.log("Kategorie: ", categoryname, " Summe: ", categorySums, " Abweichung vom Optimum: ", devianz);

        if (devianz > -3) {
            nahcat.push(categoryname);
        }

        if (devianz < -4.5) {
            noMatch.push(categoryname);
        }

        if (i < 3 && devianz > 3) {
            c.push(categoryname);

            if (c.length == 1) {
                additionalText1 = "im Bereich " + c[0];
                additionalText2 = "diesem Gebiet";
                additionalText3 = c[0];
                additionalText4 = "diesem Bereich";
            }
            if (c.length == 2) {
                additionalText1 = "in den Bereichen " + c[0] + " und " + c[1];
                additionalText2 = "diesen Gebieten";
                additionalText3 = c[0] + " oder " + c[1];
                additionalText4 = "diesen Bereichen";
            }
            if (c.length == 3) {
                additionalText1 = "in den drei Bereichen " + c[0] + ", " + c[1] + " und " + c[2];
                additionalText2 = "diesen Gebieten";
                additionalText3 = c[0] + ", " + c[1] + " oder " + c[2];
                additionalText4 = "diesen Bereichen";
            }
        }

        if (i < 3 && devianz < -3) {
            d.push(categoryname);

            if (d.length == 1) {
                additionalText5 = "Im Bereich " + d[0];
                additionalText55 = "diesem Bereich";
                additionalText6 = "dieser Bereich Teil des Studiums ist";
            }
            if (d.length == 2) {
                additionalText5 = "In den beiden Bereichen " + d[0] + " und " + d[1]; 
                additionalText55 = "diesen Bereichen";
                additionalText6 = "diese Bereiche Teil des Studiums sind";
            }
            if (d.length == 3) {
                additionalText5 = "In den drei Bereichen " + d[0] + ", " + d[1] + " und " + d[2];
                additionalText55 = "diesen Bereichen";
                additionalText6 = "diese Bereiche Teil des Studiums sind";
            }
        }

        if (i == 2 && additionalText1) {
            resultTextElement.innerHTML += `<br/> Deine Werte liegen ` + additionalText1 + ` deutlich über dem Vergleichswert.
                                            Dies deutet darauf hin, dass dein Interesse in ` + additionalText2 + ` möglicherweise sogar höher ist als erforderlich.
                                            Der Studiengang Komedia ist sehr vielseitig und deckt im Bachelor viele Grundlagen aus verschiedenen Disziplinen ab.
                                            Wenn du dich stark in ` + additionalText3 + ` vertiefen möchtest, könntest du andere Studiengänge der UDE in ` + additionalText4 + ` in Betracht ziehen.
                                            Dennoch gilt: Mehr Interesse ist besser als zu wenig!` + "<br/>";
        }

        if (i == 2 && additionalText5) {
            resultTextElement.innerHTML += "<br/>" + additionalText5 + ` liegen deine Werte deutlich unterhalb des Vergleichswerts.
                                            Dies könnte darauf hindeuten, dass dein Interesse an ` + additionalText55 + ` eher gering ist.
                                            Beachte, dass ` + additionalText6 + ` und ein grundlegendes Interesse sehr hilfreich ist, da du dich im Laufe des Studiums damit auseinandersetzen werden musst.
                                            Manche Module könnten dir daher möglicherweise schwerfallen, aber es wird stets mit den Grundlagen begonnen, sodass du diese Fächer dennoch meistern kannst, wenn du bereit bist dafür zu arbeiten.` + "<br/>";
        }

        if (i > 2 && i < 6 && devianz > 3) {
            e.push(categoryname);

            if (e.length == 1) {
                additionalText7 = "Im Bereich " + e[0];
                additionalText8 = "diesem Bereich";
            }
            if (e.length == 2) {
                additionalText7 = "In den Bereichen " + e[0] + " und " + e[1]; 
                additionalText8 = "diesen Bereichen";
            }
            if (e.length == 3) {
                additionalText7 = "In den Bereichen " + e[0] + ", " + e[1] + " und " + e[2];
                additionalText8 = "diesen Bereichen";
            }
        }

        if (i > 2 && i < 6 && devianz < -3) {
            f.push(categoryname);

            if (f.length == 1) {
                additionalText9 = "im Bereich " + f[0];
                additionalText10 = "Dieser Bereich ist";
            }
            if (f.length == 2) {
                additionalText9 = "in den beiden Bereichen " + f[0] + " und " + f[1]; 
                additionalText10 = "Diese Bereiche sind";
            }
            if (f.length == 3) {
                additionalText9 = "in den drei Bereichen " + f[0] + ", " + f[1] + " und " + f[2];
                additionalText10 = "Diese Bereiche sind";
            }
        }

        if (i == 5 && additionalText7) {
            resultTextElement.innerHTML += `<br/>` + additionalText7 + ` liegen deine Werte deutlich überhalb des Vergleichswerts.
                                            Dies zeigt, dass du in ` + additionalText8 + ` ausgezeichnete Voraussetzungen mitbringst!` + "<br/>";
        }

        if (i == 5 && additionalText9) {
            resultTextElement.innerHTML += `<br/> Deine Ergebnisse ` + additionalText9 + ` weichen deutlich vom Vergleichswert ab. `
                                            + additionalText10 + ` über das gesamte Studium hinweg von Bedeutung und somit ein wesentlicher Bestandteil.
                                            Wenn du dich mit den abgefragten Konzepten überhaupt nicht identifizieren kannst, könnte Komedia möglicherweise nicht die beste Option für dich sein.` + "<br/>";
        }

        if (i == 6 && devianz > 3) {
            resultTextElement.innerHTML += `<br/> Deine Werte im Bereich ` + categoryname + ` liegen deutlich über dem Vergleichswert.
                                            Das zeigt, dass du dir viele Berufe vorstellen kannst, die mit dem Komedia-Studiengang möglich sind.
                                            Es gibt darüberhinaus aber auch noch viele weitere Möglichkeiten, die du während des Studiums entdecken kannst!` + "<br/>";
        }

        if (i == 6 && devianz < -3) {
            resultTextElement.innerHTML += `<br/> Deine Werte im Bereich ` + categoryname + ` liegen deutlich unterhalb des Vergleichswerts.
                                            Mit einem Komedia-Abschluss gibt es viele verschiedene Berufsmöglichkeiten, von denen wir in diesem Quiz nur einen Bruchteil abgedeckt haben.
                                            Auch wenn du jetzt noch nicht weißt, welchen beruflichen Weg du einschlagen möchtest, hast du im Studium noch genug Zeit, dies herauszufinden.
                                            Mit einem Komedia-Abschluss stehen dir viele Wege offen!` + "<br/>";
        }

        i++;
    }

    if (nahcat.length == 1) {
        resultTextElement.innerHTML += "<br/>Lediglich in der Dimension " + nahcat[0] + " liegst du mit deinen Werten nah am Vergleichswert oder darüber.<br/>";
    }

    if (nahcat.length > 1) {
        let addCat = nahcat[0];
        let i = 1;
        while (i < nahcat.length-1) {
            addCat += ", " + nahcat[i];
            i++;
        }
        additionalText11 = "den Dimensionen " + addCat + " und " + nahcat[nahcat.length - 1];

        if (nahcat.length < 4) {
            additionalText12 = "Nur in "
        } else additionalText12 = "In "

        resultTextElement.innerHTML += "<br/>"+ additionalText12 + additionalText11 + " liegst du mit deinen Werten nah am Vergleichswert oder darüber.<br/>";

        console.log(nahcat.length, noMatch);

        if (nahcat.length > 4 && noMatch.length == 0) {
            resultTextElement.innerHTML += "<br/>Komedia scheint als Studiengang zu deinen Interessen und Fähigkeiten zu passen.<br/>";
        }
    }

    if (nahcat.length < 4 || noMatch.length > 2){
        resultTextElement.innerHTML += "<br/>Komedia scheint nicht besonders gut zu deinen Interessen und Fähigkeiten zu passen.<br/>"
    }
}

const data = {
    labels: categorynames,
    datasets: [{
        label: 'Deine Antworten',
        data: categorySums,
        fill: true,
        backgroundColor: 'rgba(97, 162, 124, 0.45)',  // Background color with 45% opacity
        borderColor: '#61a27c',  // Primary color
        pointBackgroundColor: '#61a27c',  // Primary color
        pointBorderColor: '#fff',  // White border for points
        pointHoverBackgroundColor: '#fff',  // White background when hovering over points
        pointHoverBorderColor: '#61a27c'  // Primary color border when hovering
    },
    {
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

document.addEventListener('DOMContentLoaded', function() {
    const infoIcon = document.getElementById('infoIcon');
    const infoContent = document.getElementById('infoContent');
    let hideTimeout;

    function showInfoContent() {
        clearTimeout(hideTimeout);
        infoContent.style.display = 'block';
    }

    function hideInfoContent() {
        hideTimeout = setTimeout(() => {
            infoContent.style.display = 'none';
        }, 200);
    }

    infoIcon.addEventListener('mouseover', showInfoContent);
    infoIcon.addEventListener('mouseout', hideInfoContent);
    infoContent.addEventListener('mouseover', showInfoContent);
    infoContent.addEventListener('mouseout', hideInfoContent);
});

async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });
    const resultsContainer = document.getElementById('resultsContainer');

    try {
        // Use html2canvas to convert the element to a canvas
        const canvas = await html2canvas(resultsContainer, { useCORS: true });
        
        // Get the image data as a Data URL
        const imgData = canvas.toDataURL('image/png');

        // Get the dimensions of the canvas
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Calculate dimensions to fit the PDF page
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        // Calculate the scaled dimensions
        const scaledWidth = imgWidth * scaleFactor * 0.9;
        const scaledHeight = imgHeight * scaleFactor * 0.9;

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 10, 10, scaledWidth, scaledHeight);

        // Save the PDF
        doc.save('KomediaQuizErgebnisse.pdf');
    } catch (error) {
        console.error('Error generating canvas: ', error);
    }
}