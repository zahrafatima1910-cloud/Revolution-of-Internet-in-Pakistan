fetch("data/events.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {

        if (validateData(data)) {

            const source = document.getElementById("timeline-template").innerHTML;
            const template = Handlebars.compile(source);
            const html = template({ events: data });

            document.getElementById("timeline-container").innerHTML = html;

        } else {
            document.getElementById("timeline-container").innerHTML = html;
                "<p>Invalid data format.</p>";
        }
    })
    .catch(error => {
        document.getElementById("timeline-container").innerHTML =html;
            "<p>Error loading data.</p>";
        console.error("Fetch error:", error);
    });

function validateData(data) {
    return Array.isArray(data) &&
        data.every(item =>
            typeof item.year === "number" &&
            typeof item.title === "string" &&
            typeof item.description === "string"
        );
}
