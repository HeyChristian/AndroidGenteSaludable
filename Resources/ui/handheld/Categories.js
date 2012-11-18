var indicatorView = Titanium.UI.createActivityIndicator({
		bottom:10, 
		height:50,
		width:150,
		message:'Loading...'
});
var backgroundApplication = Ti.App.Properties.getString('appbg');
var backgroundColor = Ti.App.Properties.getString('appbgcolor');



function Categories(title){
	
	var self = Ti.UI.createWindow({
		
		//backgroundImage:backgroundApplication,
		//backgroundRepeat:true,
		backgroundColor:backgroundColor,
		tabBarHidden:false, 
		navBarHidden:true
	
		
	});
	
	
	self.add(masterView(self));
	return self;
	
	
}
module.exports = Categories;



function masterView(win){
	
	
	var view = Ti.UI.createView({
			backgroundColor:'white',
			backgroundRepeat : true,
	});
		
	var logoBar = Ti.UI.createImageView({
		 image:'/images/logo_jpg.jpg',
		 width:153,//150
		 height:174,//150
		 top:15,
		 zindex:999
		
	});
	view.add(logoBar);

	var menuView = Ti.UI.createView({
		
		top:200,
		zIndex:999,
		height:1000, 
		backgroundColor:backgroundColor,

	});
	
	var scrollMenu = Ti.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		showVerticalScrollIndicator : true,
		layout : 'vertical'
		
	});
	



	var title ='Quiénes Somos';
	var subtitle='Misión y Visión, Propósito,Responsabilidades, Organizaciones afiliadas';
	var image='/images/home.png';
	var destination = 'quienessomos';
	
	scrollMenu.add(GetFrontItem(win,title,subtitle,image,destination));
	
	
	title='Recursos';
	subtitle = 'Presentaciones, Modelos de mejoramiento';
	image = '/images/briefcase.png';
	destination='recursos';
	
	scrollMenu.add(GetFrontItem(win,title,subtitle,image,destination));
	
	title='Lo Más Reciente';
	subtitle = 'Redes de Aprendizaje y Acción';
	image = '/images/mostRecent.png';
	destination='lomasreciente';
	scrollMenu.add(GetFrontItem(win,title,subtitle,image,destination));
	


	
	 menuView.add(scrollMenu);

	view.add(menuView);
	return view;
}


function GetFrontItem(win,title,subtitle,image,destination){
	
	
	var iView = Ti.UI.createView({
		height : 130,
		width : '100%',
		left:0,
		destination:destination,
		title:title,
		subtitle:subtitle,
		image:image

	});

	
	
	
	var lblMain = Ti.UI.createLabel({
		text : title,
		height : 'auto',
		width : 'auto',
		color : Ti.App.Properties.getString('HeaderTitlesColor'),//'white',
		left : 80,
		top : 20,//25
		//color:'black',
		font : {

			fontSize : 24,
			fontWeight:'bold'
		}
	});
	//SUB LABEL
	var lblSubTitle = Ti.UI.createLabel({
		text : subtitle,
		//height : 'auto',
		width : '80%',
		color : Ti.App.Properties.getString('subHeaderTitlesColor'),//'white',
		left : 80,
		top : 50, //52
		font : {
			fontSize : 20,
			
		}
	});

	var imgBtn = Ti.UI.createImageView({
		image : image,
		width : 50,
		height : 50,
		top : 30, //40
		bottom:10,
		left : 10
	});


    var imgNavigator = Ti.UI.createImageView({
		image :'/images/nextArrow2.png',
		width : 50,
		height : 50,
		top : 28,//38
		right : 0
	});
	var separator = Ti.UI.createView({
		
		width:'100%',
		height:1,
		backgroundColor:'white',
		
		bottom:0,
		
	}); 
 
 
	iView.add(lblSubTitle);
	iView.add(imgBtn);
	iView.add(lblMain);
	iView.add(imgNavigator);
	iView.add(separator);





	iView.addEventListener('click', function(e) {
	

		
		//indicatorView.show();
		
		win.containingTab.open(GetCategories(win,e.source.title,e.source.destination),{annimated:true});
			

	});
	
	
	return iView;
	
}

var content = Ti.UI.createView({
		
		
		top:30,
		left:20,
		right:20,
		layout:'vertical',
		//height:'auto',
		backgroundColor:'white',
		borderRadius:10,
		visible:false
		
		
});



function GetCategories(rootwin,title,destination){
	indicatorView.show();
	var cat = Ti.UI.createWindow({
		
		title:title,
		navBarHidden:true,
		layout:'vertical',
		fullscreen:false
		
	});
	
	
	var isFirstLoad=true;
	
	cat.addEventListener('focus',function(){
		if(isFirstLoad){
			indicatorView.show();
			isFirstLoad=false;
		}
	});
	
	var bg = Ti.UI.createView({
		backgroundColor:backgroundColor,
		width:'100%',
		height:'100%'
	});


	var titleBar = Ti.UI.createView({
		top:0,
		height:70,
		backgroundColor:Ti.App.Properties.getString('NavigatorBarColor')
		
	});
	
	var titleText = Ti.UI.createLabel({
		text:title,
		color:'white',
		font:{
			fontSize:28,
			fontWeight:'bold'
		}
		
	});
	
	titleBar.add(titleText);
	

	

	bg.add(content);
	jsonCategoriesRows(rootwin,destination)
	

	cat.add(titleBar);
	cat.add(bg);
	return cat;
	
};

function jsonCategoriesRows(rootwin,controlname){
	

	var jresult = [];
	var size_data;
	//content.visible=false;
	

		var loader = Ti.Network.createHTTPClient({
		
		

			
			onload:function(e) {
						
						//alert('LEYENDO RESULT API');
						var request = loader.responseText;
						//alert(request);
						try{
						
							var json =    JSON.parse(request);  
							size_data = json.length;
							
							for(var i = 0; i < size_data; i++) {
			
									var havechild=false;
										var li = null;
									if(json[i].art_type=='LST' || json[i].art_type=='TXT'){
										havechild=true;
										li = '/images/File_font.png';
									}
									
									
									
									
									var v1 = Ti.UI.createView({
										top:2,
										left:5,
										right:5,
										bottom:2,
										height:75,
										ctitle: json[i].cat_name,
										cid  :json[i].cat_id,
										ctype:json[i].art_type,
										ccontent:json[i].art_content,
										cartid:json[i].art_id,
										//hasChild:havechild,
										backgroundColor:'white',
									});
									var lbl = Ti.UI.createLabel({
									 	
										text:json[i].cat_name,
										left:10,
										color:'black'
									});
									
									
								    var imgNavigator = Ti.UI.createImageView({
										image :'/images/nextArrow2.png',
										width : 50,
										height : 50,
										top : 10,//38
										right : 0
									});
																	
									var separator = Ti.UI.createView({
									 width:'100%',
									 height:1,
									 bottom:2,
									 backgroundColor:'#999999'
									});
									
									v1.add(lbl);
									v1.add(imgNavigator);

								  if(size_data != (i + 1)){
										
										v1.add(separator);
								  }
								  
								  var cattype = json[i].art_type;
								  var cattitle = json[i].cat_name;
								  var arttitle = json[i].art_name;
								  var artcontent = json[i].art_content;
								  
								  
								  v1.addEventListener('click',function(e){
								  	
								  		//alert(e.source.ctitle);
								  	
								  	
								  		GetSubChild(e.source.ctype,e.source.ctitle,e.source.ccontent,rootwin);
								  });
									
								  content.add(v1);
			
							}
						
							//Titanium.App.Properties.setString(controlname,JSON.stringify(json));
							
							 
				
		  					var h = (size_data * 75) + 10;
		  					//alert(h);
		  					content.height = h; //(size_data * 75) + 10;
		  					content.visible=true;
							
						indicatorView.hide();
							
						}catch(err)
						{
							alert(err);
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
				 
	
			loader.open("GET","http://coalicionlazo.qipro.org/apps/webservices/ws/wscategory.php?controlname=" + controlname,true);
			//loader.setTimeout(99000);	
			loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			loader.send();

		
	
	
	
		  	
}


function GetSubChild(rowtype,title,textcontent,rootwin){
	
	
	
						
						    	
						    	
			var openwin=true;
						
						
			 var win = Ti.UI.createWindow({
		
					title:title,
					navBarHidden:true,
					layout:'vertical',
					fullscreen:false
					
			 });
				
			win.addEventListener('focus',function(){
					//indicatorView.show();
			});
				
			var bg = Ti.UI.createView({
				backgroundColor:backgroundColor,
				width:'100%',
				height:'100%'
			});
			
			
			var titleBar = Ti.UI.createView({
					top:0,
					height:70,
					backgroundColor:Ti.App.Properties.getString('NavigatorBarColor')
					
			});
			
			var viewLeft = Ti.UI.createView({
				
				backgroundColor:'white',
				left:2,
				top:3,
				height:70,
				//width: 64,
				
			});
				
			var titleText = Ti.UI.createLabel({
					text:title,
					color:'white',
					font:{
						fontSize:28,
						fontWeight:'bold'
					}
					
			});
				
			titleBar.add(titleText);
				
			var btnBack = Ti.UI.createImageView({
				image:'/images/backbutton.png',
				left:0,
				//height:64,
				//width:64
			});
			btnBack.addEventListener('click',function(){
				rootwin.fireEvent('android:back');
			});
			viewLeft.add(btnBack);
			//titleBar.add(viewLeft);
				
	
			var childContent = Ti.UI.createView({
								
				top:0,
				left:7,
				right:7,
				layout:'vertical',
				backgroundColor:'transparent',
				borderRadius:10,
				zindex:99,
				visible:false
								
								
			});
						
		
			bg.add(childContent);
			win.add(titleBar);
			win.add(bg);
					
						    
			//alert(rowtype);			    

						    
			if(rowtype == "TXT"){
						    	
						    
				var cscroll = Ti.UI.createScrollView({
						  top:5,
						  contentHeight:'auto',
						  contentWidth:300, 
						  showVerticalScrollIndicator:true, 
						  layout:'vertical'
						    		
				});
						    	
				var cheader = Ti.UI.createLabel({
						    		
						    text:L(title) ,
						    top:0,
						    left:3,
						    color:'black',
						    font:{
						    	fontSize:26, 
						    }
				});
						    	
				var clabel = Ti.UI.createTextArea({
							 top:5,
							 left:3,
							 color:'black',
							 height:'auto',
							 textAlign:'left',
							 value:textcontent,
							 font:{
							   	fontSize:24
							 }, 
							editable:false,
							borderWidth:0,
							borderRadius:10,
				});
							    
				
				//childContent.add(cheader);
				childContent.add(clabel);
				//cscroll.add(childContent);
				win.add(childContent);
				
				childContent.visible=true;
				
			    indicatorView.hide();
				
				rootwin.containingTab.open(win);		 	
				//win.open();		 	
							 
						   
			}else if(rowtype == "LST"){
						   	
						   	
						   			
						   	
						   	
						   	 		var jresult2 = [];
		  							var size_data;
		  							
		  							
		  							var artid = e.rowData.artid.toString();
		  								
		  							var propertyName = 'art' + artid;
		  							
		  							
		  							
		  							if(Ti.App.Properties.getString(propertyName)!=null){
		  								
		  								
		  								indicatorView.show();
		  								var json = JSON.parse(Ti.App.Properties.getString(propertyName));
		  								size_data = json.length;
										for(var i = 0; i < size_data; i++) {
					
											jresult2.push(Ti.UI.createTableViewRow({
													id  :json[i].id,
													leftImage:'/images/pdficon.png',
													hasChild:true,
													title:json[i].art_name,
													type:json[i].art_type,
													content:json[i].art_content,
													docurl:json[i].art_pdf_url,
													font:{
															fontSize:13,
															fontWeight:'bold'
														  }
													}));
															
											
											}
											win.add(GetSubChild(jresult2,rootwin));
											indicatorView.hide();
		  								
		  							}
		  							else{
		  							
			
						   			var loader = Ti.Network.createHTTPClient({
		
										onload:function(e) {
												var request = loader.responseText;
											   // alert(request);
												try{
												
													var json =JSON.parse(request);  
													
												
													Ti.App.Properties.setString(propertyName,JSON.stringify(json));
													
													
													size_data = json.length;
													for(var i = 0; i < size_data; i++) {
					
															jresult2.push(Ti.UI.createTableViewRow({
																id  :json[i].id,
																leftImage:'/images/pdficon.png',
																title:json[i].art_name,
																type:json[i].art_type,
																content:json[i].art_content,
																docurl:json[i].art_pdf_url,
																font:{
																	fontSize:13,
																	fontWeight:'bold'
																}
															}));
															
											
													}
												
												
													
													win.add(GetSubChild(jresult2,rootwin));
													
													
													indicatorView.hide();
													
												}catch(err)
												{
													alert(err);
													Titanium.API.error(err);
												    Titanium.UI.createAlertDialog({
												        message : err,
												        title : "Remote Server Error"
												    });
												}
									},
									onreadystatechange:function() {
		   	
		   	
		
								            if (this.readyState === 4) { // message completed, the first interesting state change
								                if (this.status === 200) { // send successful
								                    handleResponse(JSON.parse(this.responseText));
								                } else { 
								                    handleError(this.status,this.statusText, this.responseText);
								                }
								            }
								        }
									
									});
									indicatorView.show();
									loader.open("GET","http://coalicionlazo.qipro.org/apps/webservices/ws/wscategory.php?artid=" + e.rowData.artid,false);
									loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
									loader.send();
													   	
						   		}
						   	
						   }else if(rowtype == "PDF"){
						   	
						   		var docurl = e.rowData.docurl;
						   		
						   		var webview = Titanium.UI.createWebView({
								    url:L(docurl),
								    top:0,
								    height:"auto", 
								    width:"auto"
								});
								tableview.add(indicatorView);
								indicatorView.show();
						    						
						    						
						    						
						    						
						       var btnExporter = Titanium.UI.createButton({
						       		
						       	//	systemButton:Titanium.UI.iPhone.SystemButton.ACTION
						       		
						       	
						       });
						       
						 
						    		
						        btnExporter.addEventListener('click',function(){
						       
								    var dialog = Ti.UI.createOptionDialog({
								        widht: 200,
								        height: 10,
								        options: ['Safari','Close'],
								        //androidView: view,
								        cancel: 2,
								        title: 'Open In'
								    });
								 
								    dialog.addEventListener('click', function(e) {
								        //Ti.API.info('Dialog click event!');
								        //Ti.API.info(JSON.stringify(e));
								        if(e.index==0){
								        	Ti.Platform.openURL(docurl);
								        //}// else if(e.index==1){
								        	//Titanium.Platform.openURL('itms-book:'+ docurl);
								        }else{
								        	
								        	var dc = docurl;
								        	//dialog.hide();
								        }
								        
								        
								    });
								 
								    dialog.show();

						        });
						    		
						    	webview.addEventListener('focus',function(){
						    				indicatorView.hide(); 	
						    	});
			   	
						  		win.add(webview);
						  		indicatorView.hide(); 	
						  	
						   }
						   
						  //win.setRightNavButton(btnExporter);
						  	
						
						 
						 
						 
						 
		
						    
						    
				
	

	
}


