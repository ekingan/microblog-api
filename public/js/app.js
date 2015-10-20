$(document).ready(function() {


	//CREATE NEW POST
	//submit new post form
	$('.post-form').on('submit', function (event){ 
		event.preventDefault();
		
		//create variable of post
		var blogPost = $(this).serialize();
		console.log(blogPost);
		//check that input is not empty
			if (blogPost !== ''){
			//ajax post to server
				$.ajax({
					url: '/api/posts',
					type: 'POST',
					data: blogPost
				}) //when post data is submitted, post to page
					.done( function(data) {
						console.log("you successfully posted: ", blogPost);
						console.log("this is the blog post: ", blogPost);
						console.log('submit called');
					 
						$('.posts').prepend( makePostString(data) );
						// add handler for the submit event on the comment form
						$('.comment-form').on('submit', commentHandler);
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

	//event handler for comments
	// TODO add form
	var commentHandler = function(event){
		event.preventDefault();
		var commentPost = $(this).serialize();
		console.log('just before printing this');
		console.log($(this));
		console.log(commentPost);
		var postID = $(this).attr('data-id');
		console.log($(this));
			console.log('hi mom');
			console.log(commentPost);
			console.log(postID);

			if (commentPost !== ''){

				$.ajax({
					url: '/api/posts/' + postID +'/comments', 
					type: 'POST',
					data: commentPost
				})
					.done(function(data) {
						// console.log(data) // data is the comment
						// 
							console.log("you successfully made this comment: ", commentPost);
							$('li').append(makeCommentString(data));
							
							$('#write-comment').val('');
							$('#write-comment').focus();
					})
					.fail(function(data){
						console.log("failed to comment");
					});
			} else {
				console.log("the comment box is empty");
			}

	};
	
		
	

			
		
	//event handler for delete
	$('.posts').on('click', '.close', function(event){
		event.preventDefault();

		var postID = $(this).data().id;
		console.log(postID);
		var postToDelete = $(this).closest('li');
		console.log(postToDelete);
		console.log(postID);
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



	var makePostString = function(data){
		var $addComment = "<form action ='' class='form-group comment-form' data-id='"+data._id+ "''><div class='input-group comments well well-sm'><span class='input-group-btn'><button class='btn btn-default' type='submit' id='comment' data-id='" + data._id + "'>Comment</button></span>" + 
		"<input type='text' name='content' class='form-control' id='write-comment' placeholder='make a comment...'></div></form>";


		return "<li class='list-group-item'>" + data.content + "<button data-id='" + data._id + "' type='button' class='close'>x</button></li>" + $addComment + "<hr>";

	};

	var makeCommentString = function(data){
		return "<li class='list-group-item'>" + data.content + "</li>" + 
		"<button data-id='" + data._id + "' type='button' class='close'>x</button></div>";

	};


	// <button data-id='<%= posts.id %>' type='button' class='close'>x</button>

// 	var postCount = function(count){
//  		if (count === 1){
//  			$('h5').text("There has been <%= posts.length %>  blog post");	//fixes grammar
//  		} else {
//  		$('h5').text("There have been <%= posts.length %>  blog posts");


//  }
// };


});



















