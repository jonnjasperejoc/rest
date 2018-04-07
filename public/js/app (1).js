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
	}
}

$("#ask").click(function(){
	App.postQuestion();
});

$("#btn-sumbit").click(function(){
	App.postAnswer();
});