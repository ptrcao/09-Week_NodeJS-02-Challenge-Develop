import fetch from 'node-fetch';

const input = 'ptrsdadsad342erdsscao';

fetch(`https://api.github.com/users/${input}`)
.then( response => {
    console.log('response: ' + response);
    return response.json();
}) //Converting the response to a JSON object
.then( data => {
    console.log('data: ' + data);
    if(data.message){
        console.log('data.message: ' + data.message);
        if(data.message === 'Not Found'){
            return 'User was not found, please use a valid username.'; 
        }
    }
    else{
    return true;
    }
})