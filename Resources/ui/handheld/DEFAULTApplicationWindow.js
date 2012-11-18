var indicatorView = Titanium.UI.createActivityIndicator({
		bottom:10, 
		height:50,
		width:150,
		message:'Loading...'
});
var backgroundApplication = Ti.App.Properties.getString('appbg');
var backgroundColor = Ti.App.Properties.getString('appbgcolor');
	
function ApplicationWindow(title) {
	var other = Ti.UI.createWindow({
		//title:title,
		backgroundColor:'blue'
	});

	if(title==='Info'){
	
		self=CreateHome();
	}else if(title==='Blog'){
		
		var Categories = require('ui/handheld/Categories');
		
		
		self= Categories(title);  //other;//CreateBlog();
			
	}else{
		  self= other; //CreateContactus();
			
		
	}
	

	
	return self;
};


function CreateHome(){
	
	
	var win = Ti.UI.createWindow({
		
		title:'Home',

	});
	win.addEventListener('focus',function(){
		//indicatorView.hide();
	})
	
	
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
		//backgroundImage : Ti.App.Properties.getString('appbg'),
		//backgroundRepeat : true,
		
	});
	/*
	var scrollMenu = Ti.UI.createScrollView({
	contentWidth:'auto',
    contentHeight:'auto',
    top:0, 
    height:'1200dp',
    scrollType:'vertical',
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:false
		
	});*/
	
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
	


	
	//menuView.add(scrollMenu);
	menuView.add(GetFrontItemTable(win));
	
	view.add(menuView);
	
	
	win.add(view);
	
	
	
	return win;
	
}

function GetFrontItemTable(win){
	
	
	var data = []; 
	var tbl = Ti.UI.createTableView({
		
		height:'100%'
		
	});
	
	
	
	var title ='Quiénes Somos';
	var subtitle='Misión y Visión, Propósito,Responsabilidades, Organizaciones afiliadas';
	var image='/images/home.png';
	var destination = 'quienessomos';
	
	data.push(GetFrontRow(win,title,subtitle,image,destination));
	
	
	title='Recursos';
	subtitle = 'Presentaciones, Modelos de mejoramiento';
	image = '/images/briefcase.png';
	destination='recursos';
	
	data.push(GetFrontRow(win,title,subtitle,image,destination));
	
	
	title='Lo Más Reciente';
	subtitle = 'Redes de Aprendizaje y Acción';
	image = '/images/mostRecent.png';
	destination='lomasreciente';
	data.push(GetFrontRow(win,title,subtitle,image,destination));
	
	tbl.data =  data;
	
	
	
	return tbl;
	
	
	
}

function GetFrontRow(win,title,subtitle,image,destination){
	
	
	var rowview = Ti.UI.createView();
	
	
	var img = Ti.UI.createImageView({
		image:image,
		top:20,
		bottom:10,
		left:10,
		width:50,
		height:50,
		
	});
	
	var rowTitle = Ti.UI.createLabel({
		text:title,
		left:80,
		top:10,
		color:'black',
		font:{
			fontSize:24,
			fontWeight:'bold'
		}
	});
	var rowSubTitle=Ti.UI.createLabel({
		text:subtitle,
		left:80,
		top:40,
		color:'black',
		font:{
			fontSize:20,
			
		}
		
	});
	
	rowview.add(img);
	rowview.add(rowTitle);
	rowview.add(rowSubTitle);

	
	
	
	
	var row = Ti.UI.createTableViewRow({
		
		hasChild:true,
		destination:destination	
	});
	
	row.add(rowview);
	
	
		row.addEventListener('click',function(e){
		indicatorView.show();
		
		
		//Ti.include('webcontent.js')
		win.containingTab.open(GetCategories(title,destination,win),{annimated:true});
		indicatorView.hide();
	});
	
	return row;
	
}

	
	function GetCategories(title,controlname,rootwin){
		
		
		try{
		
		
	
	     var child = Titanium.UI.createWindow({
			//navBarHidden:false,
			barColor: Ti.App.Properties.getString('NavigatorBarColor'),//'black',
			title:title,
			backgroundColor:backgroundColor,
			//backgroundImage : backgroundApplication,//'/images/ios-linen.jpg',
			//backgroundRepeat : true,
		
		 });
	
		 	var jresult = [];
		  	var size_data;
		  	
		  //	Titanium.App.Properties.setString(controlname,null); 
		  	
		  	if(Titanium.App.Properties.getString(controlname) != null){
		  			
		  			var json=JSON.parse(Titanium.App.Properties.getString(controlname));
		  	
		  	
		  				size_data = json.length;
						
						for(var i = 0; i < size_data; i++) {
			
									var havechild=false;
									if(json[i].art_type=='LST'){
										havechild=true;
									}
									
									
									
									
									jresult.push({
										id  :json[i].cat_id,
										title:json[i].cat_name,
										type:json[i].art_type,
										content:json[i].art_content,
										artid:json[i].art_id,
										hasChild:havechild
									});
			
							}
		  					
		  	
		  			child.add(GetSubChild(jresult,rootwin));
		  			return child;
		  	}else{
				  	
				  	
					
					var loader = Ti.Network.createHTTPClient({
				
					onload:function(e) {
						
						
						var request = loader.responseText;
		
						try{
						
							var json =    JSON.parse(request);  
							size_data = json.length;
							
						
						//alert(request);
						
						
							for(var i = 0; i < size_data; i++) {
			
									var havechild=false;
									if(json[i].art_type=='LST'){
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
					    					fontSize:'24dp'
					    				}
									
									});
			
							}
						
							Titanium.App.Properties.setString(controlname,JSON.stringify(json));
							
							 
						
							child.add(GetSubChild(jresult,rootwin));
							return child;	
							
							
							
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
				    /*,
				    onreadystatechange:function() {
				   	
				   	
				
			            if (this.readyState === 4) { // message completed, the first interesting state change
			                if (this.status === 200) { // send successful
			                    handleResponse(JSON.parse(this.responseText));
			                } else { 
			                    handleError(this.status,this.statusText, this.responseText);
			                }
			            }
			        }*/
			     });
				    
				//alert(controlname);
				    
				loader.open("GET","http://coalicionlazo.qipro.org/apps/webservices/ws/wscategory.php?controlname=" + controlname,false);
				loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				loader.send();

		   }
		    return child;
		    
		} catch(err){
			Titanium.API.error(err);
		    Titanium.UI.createAlertDialog({
		        message : err,
		        title : "Remote Server Error"
		    });
		    indicatorView.hide();
		
			
		}
		
		
		
	}

function GetFrontItem(win,title,subtitle,image,destination){
	
	
	var iView = Ti.UI.createView({
		height : 100,
		width : '100%',
		left:'10%'

	});

	
	var btn = Ti.UI.createButton({
		
		height : 95,//85
		width : '120%',//120%
		left : 40,
		right : 0,
		backgroundImage : '/images/light.png',
		top : 10 //20
	});
	var lblMain = Ti.UI.createLabel({
		text : title,
		height : 'auto',
		width : 'auto',
		color : Ti.App.Properties.getString('HeaderTitlesColor'),//'white',
		left : 84,
		top : 15,//25
		font : {

			fontSize : 22,
			fontColor : '#fff'
		}
	});
	//SUB LABEL
	var lblSubTitle = Ti.UI.createLabel({
		text : subtitle,
		height : 'auto',
		width : '200',
		color : Ti.App.Properties.getString('subHeaderTitlesColor'),//'white',
		left : 84,
		top : 42, //52
		font : {
			fontSize : 12,
			fontColor : '#fff'
		}
	});

	var imgBtn = Ti.UI.createImageView({
		image : image,
		width : 45,
		height : 45,
		top : 30, //40
		left : 25
	});


    var imgNavigator = Ti.UI.createImageView({
		image :'/images/nextArrow2.png',
		width : 50,
		height : 50,
		top : 28,//38
		right : 0
	});
	
	iView.add(btn);
	iView.add(lblSubTitle);
	iView.add(imgBtn);
	iView.add(lblMain);
	iView.add(imgNavigator);




	//win.add(indicatorView);
	btn.addEventListener('click', function() {
	
		//indicatorView.show();
	
		//win.containingTab.open(callJsonHomeCategories(title,destination,win));
		
		//indicatorView.hide();
		
	});


	
	
	
	return iView;
	
}

function GetSubChild(jresult,rootwin){
		
				
						    	
						    	
						var openwin=true;
					
					


						
						
						
						var tableview = Titanium.UI.createTableView({
					    	data:jresult,
					    	backgroundColor:'transparent',
					    	
					    	//style:1
						});
						
						tableview.add(indicatorView);
						// create table view event listener
						tableview.addEventListener('click', function(e)
						{
						    
						    
						    indicatorView.show();
						    
						 
						    var winTitle='';
						    
						    if(e.rowData.type == "LST"){
						    	winTitle=e.rowData.title;
						    }
						    
						    
						    
						     var win = Titanium.UI.createWindow({
						            
						            title:L(winTitle),
						         
						           // navBarHidden:false, 
						            barColor:Ti.App.Properties.getString('NavigatorBarColor'),//'black',
						            backgroundImage : backgroundApplication,//'images/ios-linen.jpg',
									backgroundRepeat : true,
						            
						    });
					
						    
						    

						    
						    if(e.rowData.type == "TXT"){
						    	
						    
						    	var scroll = Ti.UI.createScrollView({
						    		top:38,
						    		contentHeight:'auto',
						    		contentWidth:300, 
						    		showVerticalScrollIndicator:true, 
						    		layout:'vertical'
						    		
						    	});
						    	
						    	var header = Ti.UI.createLabel({
						    		
						    		text:L(e.rowData.title) ,
						    		top:0,
						    		left:3,
						    		color:'white',
						    		font:{
						    			fontSize:26, 
						    		}
						    	});
						    	
							    var label = Ti.UI.createLabel({
							    	top:35,
							    	left:3,
							    	color:'white',
							    	height:'auto',
							    	textAlign:'left',
							    	text:L(e.rowData.content),
							    	font:{
							    		fontSize:15
							    	}
							    });
							    
						
							
							 	openwin=false;
							 	showChildWindow(e.rowData.title,'',e.rowData.content,'/images/briefcase.png');
							    indicatorView.hide();
						   
						   }else if(e.rowData.type == "LST"){
						   	
						   	
						   			
						   	
						   	
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
													color:'black',
													font:{
															fontSize:24,
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
																color:'black',
																font:{
																	fontSize:24,
																	fontWeight:'bold'
																}
															}));
															
											
													}
												
												
													
													win.add(GetSubChild(jresult2,rootwin));
													
													
													indicatorView.hide();
													
												}catch(err)
												{
													//alert(err);
													Titanium.API.error(err);
												    Titanium.UI.createAlertDialog({
												        message : err,
												        title : "Remote Server Error"
												    });
												}
									}/*,
									onreadystatechange:function() {
		   	
		   	
		
								            if (this.readyState === 4) { // message completed, the first interesting state change
								                if (this.status === 200) { // send successful
								                    handleResponse(JSON.parse(this.responseText));
								                } else { 
								                    handleError(this.status,this.statusText, this.responseText);
								                }
								            }
								        }*/
									
									});
									indicatorView.show();
									loader.open("GET","http://coalicionlazo.qipro.org/apps/webservices/ws/wscategory.php?artid=" + e.rowData.artid,false);
									loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
									loader.send();
													   	
						   		}
						   	
						   }else if(e.rowData.type == "PDF"){
						   	
						   		var docurl = e.rowData.docurl;
						   		
						   		var webview = Titanium.UI.createWebView({
								    url:L(docurl),
								    top:0,
								    height:"auto", 
								    width:"auto"
								});
								//tableview.add(indicatorView);
								indicatorView.show();
						    						
						    						
						    						
						    						
						       var btnExporter = Titanium.UI.createButton({
						       		
						       		systemButton:Titanium.UI.iPhone.SystemButton.ACTION
						       		
						       	
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
						    		
						    	//webview.addEventListener('focus',function(){
						    		//		indicatorView.hide(); 	
						    	//});
			   	
						  		win.add(webview);
						  		
						  	
						   }
						   
						  //	win.setRightNavButton(btnExporter);
						  	
						  		if(openwin){
						  			rootwin.containingTab.open(win);
						  			indicatorView.hide(); 	
						   		}
						    
						});
	
	
	
	return tableview;
		
	}

function	showChildWindow (_title,_subtitle,_content,_image){
		
	/************** nuevo contenido *******/
	
	//Ti.API.info("click event");
	
	
	alert('Show Child WIndow Event');
	
    var t = Titanium.UI.create2DMatrix();
    t = t.scale(0);
 
 
 
    var winH = '98%';
 	if(_content.length<=200){
 		winH='70%';
 	}
 	
 	var titFontSize=26;
 	if(_title.length > 20){
 		titFontSize=22;
 	}	
  
  	
 
    var w = Titanium.UI.createWindow({
        backgroundColor:'#000',
        borderWidth:0,
        borderColor:'#888',
        height:winH,//400
        width:'98%',//300
        borderRadius:7,
        opacity:.99, 
       // top:5,
        transform:t
    });
 
    // create first transform to go beyond normal size
    var t1 = Titanium.UI.create2DMatrix();
    t1 = t1.scale(1.1);
    var a = Titanium.UI.createAnimation();
    a.transform = t1;
    a.duration = 200;
 
    // when this animation completes, scale to normal size
    a.addEventListener('complete', function()
    {
       
        var t2 = Titanium.UI.create2DMatrix();
        t2 = t2.scale(1.0);
        w.animate({transform:t2, duration:200});
 
    });
 
    // create a button to close window
    var b = Titanium.UI.createButton({
        backgroundImage: '/images/bclose.png',
        top:0,
        right:0,
        //lect: 5,
        height:26,
        width:26,
        //zIndex:999,
        font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'}
    });
 
    w.add(b);
    
    
    
    b.addEventListener('click', function()
    {
        var t3 = Titanium.UI.create2DMatrix();
        t3 = t3.scale(0);
        w.close({transform:t3,duration:300});
    });
 
 
 
 	var img = Titanium.UI.createImageView({
 		image:_image,
 		left:8,
 		top:10,
 		width:48,
 		height:48
 	});
 	var title = Titanium.UI.createLabel({
 		text:_title,
 		left:10,
 		top:10,
 		color:'#ffffff',
 		shadowColor:'#aaa',
 		font:{
 			fontSize:titFontSize,
 			
 			fontWeight:'bold',
 			fontFamily:'Helvetica Neue'
 		}
 	});

 	
 	var content = Titanium.UI.createLabel({
 		text:_content,
 		left:15,
 		top:20,
 		
 		color:'#ffffff',
 		textAlign:'left',
 		height:'auto',
 		width:'99%',//238,
 		font:{
 			fontSize:22,
 			fontFamily:'Helvetica Neue'
 		}
 	});
 	
 	 var scroll = Ti.UI.createScrollView({
 	 			layout:'vertical',
				contentWidth: 'auto',
			    contentHeight: 'auto',
			    showVerticalScrollIndicator:true,
			    showHorizontalScrollIndicator:false,
				top:30
			  
				
	});
	var conView = Ti.UI.createView({
		
	});
	
	var txtarea = Titanium.UI.createTextArea({
		value:_content,
		top:20,
		editable:false,
		font:{
			fontSize:18
		}
		
		
		
	});
	
	var menuItems = Ti.UI.createView({
		
		
	});
	
	
	var cbtn1 = Ti.UI.createButton({
		
		title:'buton 1',
		width:200,
		height:100,
		top:txtarea.height + 10,
		left:10
		
	});
	menuItems.add(cbtn1);
	
	conView.add(txtarea);
	content.add(menuItems);
	
	
	//conView.add(content);
	scroll.add(conView);		
 	//w.add(img);
 	w.add(title);
 	//w.add(subtitle);
 	w.add(scroll);
    w.open(a);
	
		
}
	
	
	
	




module.exports = ApplicationWindow;
