export const sanitizeFileName = (name: string) => {
    return name
        .normalize("NFD") // Unicode Normalisierung
        .replace(/[\u0300-\u036f]/g, "") // Entfernt diakritische Zeichen
        .replace(/[^a-zA-Z0-9._-]/g, "_") // Erlaubt nur Buchstaben, Zahlen, Punkte, Unterstriche und Bindestriche
        .toLowerCase();
}