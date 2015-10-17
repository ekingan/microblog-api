$(document).ready(function() {

	$('form').on('submit', function (event){ //on submit of post
			event.preventDefault();
			var postData = $('#write-post').serialize(); //serialize post data
			console.log("this is the post data: " + postData);

			//ajax call for data - DO I NEED TO SET UP POSTS PATH?
			$.ajax({
				url: '/posts',
				type: 'POST',
				data: postData
			}) //when post data is submitted, post to page
			.done( function(data) {
				console.log("you successfully posted: ", data);
				var blogPost = $('#write-post').val();
				console.log('submit called');
				if (blogPost !== ''){ 
					$('ul').prepend( makeHTMLString(blogPost) );
					
				}
			}) //if failed notify
			.fail(function(data){
				console.log("failed to post");
			});

			$('#write-post').val('');
		});		
	//event handler for delete
	$('#post').on('click', '.close', function(event){
		event.preventDefault();
		console.log("deleted!");

		var postID = $(this).data().id;
		console.log(this);
		console.log(postID);
		var postToDelete = $(this).closest('li');

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