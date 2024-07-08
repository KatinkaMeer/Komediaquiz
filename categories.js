const categories = [
    {
        name: "Informatik",
        questions: [
            { text: "Ich interessiere mich für den Bereich der Mensch-Maschine-Interaktion und der Gestaltung von benutzerfreundlichen Anwendungen und bin bereit, mich damit auseinanderzusetzen.", weight: 2, inverted: false },
            { text: "Ich habe Interesse die grundlegenden Techniken der Programmierung zu erlernen und bin bereit, mir eine Programmiersprache anzueignen.", weight: 2, inverted: false },
            { text: "Ich interessiere mich für die Entwicklung und Gestaltung digitaler Medien und interaktiver Systeme (z.B. Sprachassistenten oder Roboter) und bin bereit, mich damit auseinanderzusetzen.", weight: 1, inverted: false },
            { text: "Ich habe Interesse an innovativen Technologien (z.B. Künstliche Intelligenz) und deren Anwendung und bin bereit mich damit auseinanderzusetzen.", weight: 1, inverted: false }
        ]
    },
    {
        name: "Psychologie",
        questions: [
            { text: "Ich finde es interessant zu erfahren, warum und wie Menschen im sozialen Kontext interagieren und bin bereit, mich damit auseinanderzusetzen.", weight: 1.25, inverted: false },
            { text: "Mich interessiert es, wie und warum Menschen Kaufentscheidungen treffen und bin bereit, mich damit auseinanderzusetzen.", weight: 1.25, inverted: false },
            { text: "Ich interessiere mich für die grundlegenden Mechanismen der menschlichen Wahrnehmung und Informationsverarbeitung und bin bereit, mich damit auseinanderzusetzen.", weight: 1.25, inverted: false },
            { text: "Ich interessiere mich für die Prozesse des menschlichen Lernens, Denkens und Problemlösens und bin bereit, mich damit auseinanderzusetzen.", weight: 1.25, inverted: false },
            { text: "Ich interessiere mich vor allem  für den Teilbereich klinischen Psychologie und Psychotherapie und bin bereit mich damit auseinanderzusetzen.", weight: 1, inverted: true }
        ]
    },
    {
        name: "BWL",
        questions: [
            { text: "Ich interessiere mich für grundlegende betriebswirtschaftliche Zusammenhänge und bin bereit, mich damit auseinanderzusetzen.", weight: 1.5, inverted: false },
            { text: "Ich finde es interessant, wie psychologische Kenntnisse für wirtschaftliche Zwecke genutzt werden und bin bereit, mich damit auseinanderzusetzen.", weight: 1.5, inverted: false },
            { text: "Ich habe Interesse daran, zu lernen, wie Unternehmen organisiert und strukturiert sind und bin bereit mich damit auseinanderzusetzen.", weight: 1.5, inverted: false },
            { text: "Ich interessiere mich dafür, mit welchen Strategien Unternehmen Gewinne maximieren und bin bereit mich damit auseinanderzusetzen.", weight: 1.5, inverted: false }
        ]
    },
    {
        name: "Interdisziplinarität",
        questions: [
            { text: "Es ist mir wichtig, mich in einem spezifischen Teilgebiet zu vertiefen.", weight: 1.33, inverted: true },
            { text: "Ich möchte gerne einen Überblick über verschiedene Themengebiete bekommen und die Grundlagen unterschiedlicher Bereiche erlernen.", weight: 1.33, inverted: false },
            { text: "Ich bevorzuge es, eine klare Vorstellung von meinem zukünftigen Karriereweg zu haben, anstatt mir verschiedene Möglichkeiten offen zu halten.", weight: 1.33, inverted: true },
            { text: "Ich habe Interesse daran, Wissen aus verschiedenen Disziplinen miteinander zu verknüpfen und Zusammenhänge zu erkennen.", weight: 2, inverted: false }
        ]
    },
    {
        name: "Persönlichkeit",
        questions: [
            { text: "Es fällt mir leicht, logische Zusammenhänge zu verstehen, und ich habe ein grundlegendes mathematisches Verständnis.", weight: 1, inverted: false },
            { text: "Ich interessiere mich dafür, theoretische Konzepte praktisch anzuwenden.", weight: 1, inverted: false },
            { text: "Ich interessiere mich bei technischen Anwendungen besonders für die Sicht des Nutzers.", weight: 1, inverted: false },
            { text: "Ich kann selbstständig und stukturiert arbeiten.", weight: 1, inverted: false },
            { text: "Ich bin neugierig und offen für aktuelle Themenbereiche.", weight: 1, inverted: false },
            { text: "Ich bin bereit, interaktiv und gemeinsam im Team an praktischen Fragestellungen zu arbeiten.", weight: 1, inverted: false }
        ]
    },
    {
        name: "Empirisches Arbeiten",
        questions: [
            { text: "Ich bin interessiert an der Planung, Durchführung und Auswertung empirischer Studien.", weight: 1, inverted: false },
            { text: "Ich bin offen dafür, mir Kenntnisse der Statistik und Forschungsmethoden anzueignen.", weight: 2, inverted: false },
            { text: "Ich bin bereit, methodisch Daten zu erheben, zu analysieren und die Ergebnisse strukturiert aufzuarbeiten.", weight: 1, inverted: false },
            { text: "Ich bin bereit, wissenschaftlich zu arbeiten und theoretische Hintergründe zu einem bestimmten Thema zu recharchieren.", weight: 2, inverted: false }
        ]
    },
    {
        name: "Berufsvorstellung",
        questions: [
            { text: "Ich kann mir vorstellen, später an der Gestaltung und Entwicklung von benutzerfreundlichen und ansprechenden Webseiten, Online Tools, Apps oder Spielen für verschiedene Plattformen zu arbeiten", weight: 1, inverted: false },
            { text: "Ich kann mir vorstellen, später Kundendaten zu analysieren und zu interpretieren (Consumer research), um daraus z.B Marketingstrategien zu entwickeln.", weight: 1, inverted: false },
            { text: "Ich kann mir vorstellen, im Social Media Bereich eines Unternehmens zu arbeiten, Beiträge zu planen und zu erstellen, um dessen Social Media Präsenz nach vorne zu treiben.", weight: 1, inverted: false },
            { text: "Ich kann mir vorstellen, in einem Beruf zu arbeiten, der Technik für Benutzer verständlich und zugänglich macht, sowie bei der Umsetzung von IT-Projekten zu unterstützen (z.B Usability-Engineers und IT-Consultants).", weight: 1, inverted: false },
            { text: "Ich kann mir vorstellen, Projekte zu leiten und zu koordinieren, sowie die interne und externe Kommunikation in einem Unternehmen zu verbessern.", weight: 1, inverted: false },
            { text: "Ich kann mir vorstellen, für Unternehmen mithilfe sozialer Medien und Online Tools Personal zu bewerben und zu gewinnen (z.B Human Resources).", weight: 1, inverted: false }
        ]
    },
];
