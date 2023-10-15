//Function to submit a new post to the database
const createPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;    
    const post = document.querySelector('#post').value;
    
    //Send the Post data
    const postResponse = await fetch('/api/post/', {
        method: 'POST',
        body: JSON.stringify({title, post}),
        headers: { 'Content-Type': 'application/json' },
    }); 
    const postInfo = await postResponse.json();
    //If response is Ok, then redirect to the post page. 
    if (postResponse.ok) {        
        document.location.replace('/post/'+postInfo.id);
        } else {
        alert('Failed save post.');
        }

}

const updatePost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();    
    const post = document.querySelector('#post').value.trim();
    const pathArray = window.location.pathname.split('/');
    
    //Send the Post data
    const postResponse = await fetch('/api/post/'+pathArray[2], {
        method: 'put',
        body: JSON.stringify({title, post}),
        headers: { 'Content-Type': 'application/json' },
    }); 
    const postInfo = await postResponse.json();
    //If response is Ok, then redirect to the post page. 
    if (postResponse.ok) {        
        document.location.replace('/post/'+postInfo.id);
        } else {
        alert('Failed update post.');
        }

}

if(window.location.pathname === '/post-new') {
    document.querySelector('#new-post').addEventListener('submit', createPost);
}

if(window.location.pathname.includes('post-update')) {
    document.querySelector('#update-post').addEventListener('submit', updatePost);
}