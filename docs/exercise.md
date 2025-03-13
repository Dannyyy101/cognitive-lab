# Exercise
Eine Exercise besteht immer aus einer ID, einer Frage und einer Antwort. Dabei kann die Frage jegliche Komponenten wie Text oder Bilder beinhalten. Die Antwort muss immer eine eindeutige Antwort in Form eines Textes besitzen. Daher kann für die Antwort nur eine Komponente gewählt werden, z.B. Text oder Multiple-Choice.

### Beispiel:
```json
{
  "id": "hjkd-klok-2jdiw-dji4",
  "question": {"<Komponent>"},
  "answer": {"<Komponent>"},
  "authorId": "1234-klok-2jdiw-dji4",
  "createdOn": "2025-10-14",
  "lastEdited": "2025-10-14",
  "documentationUrl"
}
```

# Komponente
Eine Komponente besitzt immer einen Typ, aus dem später für das Programm hervorgeht, um welche Art von Komponente es sich handelt. Dies ist auch für die Type Safety essenziell. Da bisher keine künstliche Intelligenz verwendet werden kann, muss auf andere Weise sichergestellt werden, dass bei einer Textantwort nur ein Teil übereinstimmen muss. Dies muss vom Fragen-Ersteller angegeben werden, z.B.: „Das Brandenburger Tor hat /5/ Torbögen.“ Hier muss die Antwort des Nutzers eine „5“ beinhalten. Wird keine Markierung angegeben, so muss die gesamte Eingabe des Nutzers mit der Antwort übereinstimmen. Satzzeichen und Groß-/Kleinschreibung werden dabei nicht beachtet.

### Beispiel:
```json
{
  "text": "Das ist eine Frage?",
  "type": "text"
}

{
  "multipleChoices": ["1", "2", "3"],
  "correctAnswer": "2",
  "type": "multipleChoice"
}
```