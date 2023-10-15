const pathArray = window.location.pathname.split('/');
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

//function to update post
const updatePost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();    
    const post = document.querySelector('#post').value.trim();
    
    //Send the Post data
    const postResponse = await fetch('/api/post/'+pathArray[2], {
        method: 'PUT',
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

//function to delete a post
const deletePost = async (event) => {
    event.preventDefault();    
    
    //Send the Post data
    const postResponse = await fetch('/api/post/'+pathArray[2], {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }); 
    const postInfo = await postResponse.json();
    //If response is Ok, then redirect to the post page. 
    if (postResponse.ok) {        
        document.location.replace('/dashboard');
        } else {
        alert('Failed delete post.');
        }

}

//Function to submit a new comment to the database
const createComment = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim(); 
    
    //Send the Post data
    const commentResponse = await fetch('/api/comment/'+pathArray[2], {
        method: 'POST',
        body: JSON.stringify({comment}),
        headers: { 'Content-Type': 'application/json' },
    }); 
    const commentInfo = await commentResponse.json();
    //If response is Ok, then redirect to the post page. 
    if (commentResponse.ok) {        
        document.location.replace('/post/'+commentInfo.post_id);
        } else {
        alert('Failed save comment.');
        }

}

if(window.location.pathname === '/post-new') {
    document.querySelector('#new-post').addEventListener('submit', createPost);
}

if(pathArray[1] === 'post-update') {
    document.querySelector('#update-post').addEventListener('submit', updatePost);
    document.querySelector('#delete-post').addEventListener('click', deletePost);
}

if(pathArray[1] === 'post') {
    document.querySelector('#create-comment').addEventListener('submit', createComment);
}

