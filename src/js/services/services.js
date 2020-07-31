const postData = async (url, object) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: object,
    };

    const response = await fetch(url, options);

    return await response.json();
};

const getResources = async (url) => {
    const request = await fetch(url);

    if(!request.ok) {
        throw new Error(`Can not fetch ${url}, status ${request.status}`);
    }
    
    return await request.json();
};

export {postData};
export {getResources};