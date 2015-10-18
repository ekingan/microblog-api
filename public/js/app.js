$(document).ready(function() {

	$('#post-form').on('submit', function (event){ //on submit of post
			event.preventDefault();
		

			//ajax call for data - DO I NEED TO SET UP POSTS PATH?
			$.ajax({
				url: '/posts',
				type: 'POST',
				data: $(this).serialize()
			}) //when post data is submitted, post to page
			.done( function(data) {
				console.log("you successfully posted: ", data);
				var blogPost = $('#write-post').val();
				console.log("this is the blog post: ", blogPost);
				console.log('submit called');
				if (blogPost !== ''){ 
					$('ul').prepend( makeHTMLString(blogPost) );
					$('#post-form')[0].reset();
					$('#write-post').focus();
					
				}
			}) //if failed notify
			.fail(function(data){
				console.log("failed to post");
			});

			
		});		
	//event handler for delete
	$('.posts').on('click', '.close', function(event){
		event.preventDefault();

		var postID = $(this).data().id;
		console.log(postID);
		var postToDelete = $(this).closest('li');
		console.log(postToDelete);

		$.ajax({
			url: '/posts/' + postID,
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



















