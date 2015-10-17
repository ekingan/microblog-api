$(document).ready(function() {

	$('#post-form').on('submit', function (event){ //on submit of post
			event.preventDefault();
		
			var postData = $(this).serialize(); //serialize post data
			console.log("this is the post data: ", postData);

			//ajax call for data - DO I NEED TO SET UP POSTS PATH?
			$.ajax({
				url: '/posts',
				type: 'POST',
				data: postData
			}) //when post data is submitted, post to page
			.done( function(data) {
				console.log("you successfully posted: ", data);
				var blogPost = $('#write-post').val();
				console.log("this is the blog post: ", blogPost);
				console.log('submit called');
				if (blogPost !== ''){ 
					$('ul').prepend( makeHTMLString(blogPost) );
					$('#write-post').val('');
					
				}
			}) //if failed notify
			.fail(function(data){
				console.log("failed to post");
			});

			
		});		
	//event handler for delete
	$('#post').on('click', '.close', function(event){
		event.preventDefault();
		console.log("deleted!");

		var postID = $('#post').data().id;
		console.log(this);
		console.log(postID);
		var postToDelete = $('#post').closest('li');

		$.ajax({
			type:'delete',
			url: '/posts/' + postID,
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





















})