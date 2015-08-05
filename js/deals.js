$(function() {
	$('#dealsForm').validate({
        rules: {
        	companyName : {
        		required : true
        	},
            offer : {
            	required : true
            },
            offerCode : {
            	required : true,
            	maxlength : 10
            },
            validUptoDate : {
            	required : true
            }
        },
        messages : {
        	companyName : {
        		required : "Please enter Company Name"
        	},
			offer : {
				required : "Please enter Offer Name"
			},
			offerCode : {
				required : "Please enter Offer Code"
			},
			validUptoDate : {
				required : "Please enter Valid Upto Date"
			}
		},
        errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
		}
    });
    
    $("#dealssubmit").click(function() {
		if($('#companyName').valid() && $('#offer').valid() && $('#offerCode').valid() && $('#validUptoDate').valid()) {
			if(document.getElementById("logochooser").value != "") {
				var isValidFile=validateFile();
			}
			var form = new FormData(this);
			var companyName = $("#companyName").val();
			var offer = $("#offer").val();
			var offerCode = $("#offerCode").val();
			var validUptoDate = $("#validUptoDate").val();
			var offerTerms = $("#offerTerms").val();
			if(isValidFile==true){
				var logo = $('#logochooser')[0].files[0];
				form.append("logo", logo);
			} else if(isValidFile==false) {
				return false;
			}
	    		form.append("logo", logo);
	    		form.append("companyName",companyName);
	    		form.append("offer",offer);
	    		form.append("offerCode",offerCode);
	    		form.append("validUptoDate",validUptoDate);
	    		form.append("offerTerms",offerTerms);
	    		form.append("isVerify","false");
	    		form.append("method","deals");
	    		form.append("format","json");
	    		
	    		var xhr = new XMLHttpRequest;
				xhr.open('POST', 'http://localhost/ZiftAPI/api/ziftapi.php', true);
				xhr.onload = function() {
    				if (this.status == 200) {
	      				var resp = JSON.parse(this.response);
	      				if(resp.responsePHD=="ERROR"){
	      					alert("Deal not saved!");
	      				}
	      				else {
	      					alert("Deal saved successfully!");
	      				}
    				};
  				};
				xhr.send(form);
		}
	});
	
	function validateFile() {
    	var allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        var fileExtension = document.getElementById('logochooser').value.split('.').pop().toLowerCase();
        var isValidFile = false;

        for(var index in allowedExtension) {
			if(fileExtension === allowedExtension[index]) {
            	isValidFile = true; 
                	break;
                }
            }
			if(!isValidFile) {
            	alert('Allowed Extensions are : *.' + allowedExtension.join(', *.'));
            	return false;
            }
		return isValidFile;
  	}
});
