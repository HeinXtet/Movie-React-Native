import request from './network'
let apiKey = '961277648f1e28c74788bade62b3b24c'

function get(path) {
    return request({
        url: path + "?api_key=" + apiKey,
        method: 'GET'
    });
}

function person(page) {
    return (
        request({
            url: 'person/popular?api_key=' + apiKey + '&language=en-US&page=' + page,
            method: 'GET'
        })
    )
}

function search(query, page) {
    let url = "search/movie?api_key=" + apiKey + "&query=" +
        query +
        "&page=" + page + "&include_adult=true"
    return request({
        url: url,
        method: 'GET'
    });
}


function create({ subject, content }) {
    return request({
        url: '/example/create',
        method: 'POST',
        data: {
            subject,
            content
        }
    });
}

const ExampleService = {
    get, create, search,person
}

export default ExampleService;