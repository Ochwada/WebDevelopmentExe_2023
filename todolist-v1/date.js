// --- function - getDate
exports.getDate = () => {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    return today.toLocaleDateString("en-US", options);
}

// --- function - getDay

exports.getDay = ()=> {
    const today = new Date();

    const options = {
        weekday: "long",

    };

    return today.toLocaleDateString("en-US", options);
}
