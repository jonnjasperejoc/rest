var App = {
	postQuestion: () => {
		var text = $("input[name=text]").val();
		$.ajax({
			type: "POST",
			url: "questions",
		    dataType : "json",
		    contentType: "application/json; charset=utf-8",
		    data : JSON.stringify({"text":text}),
		    success : function(result) {

		    },
		}).done(function(result){
			if(result._id){
				window.location.href = "questions/"+result._id;
			}
		});
	},
	postAnswer: () => {
		var text = $("textarea#answer").val();
		var qID = $("#qID").val();
		$.ajax({
		    type: "POST",
		    url: qID+"/answers",
		    dataType : "json",
		    contentType: "application/json; charset=utf-8",
		    data : JSON.stringify({"text":text}),
		    success : function(result) {

		    },
		}).done(function(result){
		      window.location.href = qID;
		});
	},
	vote: (vote, aID) => {
		var qID = $("#qID").val();
	    var url  = qID+"/answers/"+aID+"/vote-"+vote;

		$.ajax({
		    type: "POST",
		    url: url,
		    dataType : "json",
		    contentType: "application/json; charset=utf-8",
		    success : function(result) {

		    },
		}).done(function(result){
		      window.location.href = qID;
		});
	}
}	

$("#ask").click(function(){
	App.postQuestion();
});

$("#btn-sumbit").click(function(){
	App.postAnswer();
});

$("a#up").click(function(){
	var aID = $(this).parent().parent().find("#aID").val();
	App.vote("up",aID);
});

$("a#down").click(function(){
	var aID = $(this).parent().parent().find("#aID").val();
	App.vote("down",aID);
});