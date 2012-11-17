


function jsonCategoriesRows(controlname){
	
	
	var jresult = [];
	var size_data;
	Titanium.App.Properties.setString(controlname,null); 
	
	
	if(Titanium.App.Properties.getString(controlname) != null){
		  			
		  		var json=JSON.parse(Titanium.App.Properties.getString(controlname));
		  	
		  	
		  				size_data = json.length;
						
						for(var i = 0; i < size_data; i++) {
			
									var havechild=false;
									if(json[i].art_type=='LST' || json[i].art_type=='TXT'){
										havechild=true;
									}
									
									
									
									
									jresult.push({
										id  :json[i].cat_id,
										title:json[i].cat_name,
										type:json[i].art_type,
										content:json[i].art_content,
										artid:json[i].art_id,
										hasChild:havechild,
										color:'black',
										backgroundColor:'white',
										font:{
					    					fontSize:'24dp',
					    					fontWeight:'bold'
					    					
					    				}
									});
			
						}
		  					
		  	
		  			//child.add(GetSubChild(jresult,rootwin));
		  			return jresult;
	}else{
		
		var loader = Ti.Network.createHTTPClient({
				
			onload:function(e) {
						
						
						var request = loader.responseText;
		
						try{
						
							var json =    JSON.parse(request);  
							size_data = json.length;
							
							for(var i = 0; i < size_data; i++) {
			
									var havechild=false;
									if(json[i].art_type=='LST' || json[i].art_type=='TXT'){
										havechild=true;
									}
									
									
									
									
									jresult.push({
										id  :json[i].cat_id,
										title:json[i].cat_name,
										type:json[i].art_type,
										content:json[i].art_content,
										artid:json[i].art_id,
										hasChild:havechild,
										color:'black',
										backgroundColor:'white',
										font:{
					    					fontSize:'24dp',
					    					fontWeight:'bold'
					    					
					    				}
									
									});
			
							}
						
							Titanium.App.Properties.setString(controlname,JSON.stringify(json));
							
							 
							alert(jresult.length);
							//child.add(GetSubChild(jresult,rootwin));
							return jresult;	
							
							
							
						}catch(err)
						{
							//alert(err);
							Titanium.API.error(err);
						    Titanium.UI.createAlertDialog({
						        message : err,
						        title : "Remote Server Error"
						    });
						}
						
					},
					onerror:function(e)
				    {
				        Ti.API.info('Network error: ' + JSON.stringify(e));
				        
				        test =  JSON.stringify(e);
				        alert('on error');
				    }
			}); 
				 
			//loader.setTimeout(15000);   
			loader.open("GET","http://coalicionlazo.qipro.org/apps/webservices/ws/wscategory.php?controlname=" + controlname,false);
			loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			loader.send();

		
	}
	
	
		  	
}

module.exports = jsonCategoriesRows;