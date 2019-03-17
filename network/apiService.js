import request from './network'
let apiKey = '961277648f1e28c74788bade62b3b24c'

function get(path) {
    return request({
        url: path + "?api_key="+apiKey,
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
    get, create
}

export default ExampleService;