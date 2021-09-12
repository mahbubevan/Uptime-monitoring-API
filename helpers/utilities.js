const utilities = {}

// parse JSON string to Object 
utilities.parseJSON = (jsonString) => {
    let output = {}
    try {
        output = JSON.parse(jsonString)
    } catch (error) {
        output = {}
    }

    return output
}

module.exports = utilities