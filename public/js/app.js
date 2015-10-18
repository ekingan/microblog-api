$(document).ready(function() {


	//CREATE NEW POST
	//submit new post form
	$('.post-form').on('submit', function (event){ 
		event.preventDefault();
		//create variable of post
		var blogPost = $('#write-post').val();
		console.log(blogPost);
		//check that input is not empty
			if (blogPost !== ''){
			//ajax post to server
				$.ajax({
					url: '/api/posts',
					type: 'POST',
					data: $(this).serialize()
				}) //when post data is submitted, post to page
					.done( function(data) {
						console.log("you successfully posted: ", data);
						console.log("this is the blog post: ", blogPost);
						console.log('submit called');
					 
						$('.posts').prepend( makeHTMLString(blogPost) );
						$('.post-form')[0].reset();
						$('#write-post').focus();
					})
				//if failed notify
					.fail(function(data){
						console.log("failed to post");
					});

			} else {
			console.log("the form is empty");
			}
	});
	
		
	

			
		
	//event handler for delete
	$('.posts').on('click', '.close', function(event){
		event.preventDefault();

		var postID = $(this).data().id;
		console.log(postID);
		var postToDelete = $(this).closest('li');
		console.log(postToDelete);

		$.ajax({
			url: '/api/posts/' + postID,
			type: "DELETE"
		})
		.done(function(data) {
			console.log(data);
			$(postToDelete).remove();
		})
		.fail(function(data){
			console.log("failed to delete post");
		});

	});



	var makeHTMLString = function(blogPost){
		return "<li class='list-group-item'>" + blogPost + "<button data-id=? type='button' class='close'>x</button></li>";

	};
});



















