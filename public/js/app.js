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
						console.log("you successfully posted: ", blogPost);
						console.log("this is the blog post: ", blogPost);
						console.log('submit called');
					 
						$('.posts').prepend( makePostString(blogPost) );
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
	$(document).on('click', '.comments', function(event){
		event.preventDefault();
		var commentPost = $('#write-comment').val();
		var commentID = $(this).attr('data-id');

			console.log(commentPost);
			console.log(commentID);

			if (commentPost !== ''){

				$.ajax({
					url: '/api/comments',
					type: 'POST',
					data: $(this).siblings().serialize()
				})
					.done(function(data) {
							console.log("you successfully made this comment: ", commentPost);

							$('.posts').append.sibblings( makeCommentString(commentPost));
							
							$('#write-comment').val();
							$('#write-comment').focus();
					})
					.fail(function(data){
						console.log("failed to comment");
					});
			} else {
				console.log("the comment box is empty");
			}

	});
	
		
	

			
		
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



	var makePostString = function(blogPost){
		var $addComment = "<div class='input-group comments'><span class='input-group-btn'><button class='btn btn-default' type='button' id='comment'>Comment</button></span><input type='text' class='form-control' id='write-comment' placeholder='make a comment...'></div>";
		return "<li class='list-group-item'>" + blogPost + "<button data-id='<%= posts.id %>' type='button' class='close'>x</button></li>" + $addComment;

	};

	var makeCommentString = function(commentPost){
		return "<div class='input-group comments'><span class='input-group-btn'><button class='btn btn-default' type='button' id='commentBtn'>" + commentPost + "</button></span><input type='text' class='form-control' id='write-comment' placeholder='make a comment...'><button data-id='<%= posts.id %>' type='button' class='close'>x</button></div>";

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



















