var indicatorView = Titanium.UI.createActivityIndicator({
		bottom:10, 
		height:50,
		width:150,
		message:'Loading...'
});
var backgroundApplication = Ti.App.Properties.getString('appbg');
var backgroundColor = Ti.App.Properties.getString('appbgcolor');

function exam(title){
	
	
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
		//backgroundImage : Ti.App.Properties.getString('appbg'),
		//backgroundRepeat : true,
		
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





	iView.addEventListener('click', function() {
	

		
		indicatorView.show();
		
		win.containingTab.open(GetCategories(title,destination),{annimated:true});
			//indicatorView.hide();

	});
	
	
	return iView;
	
}

var content = Ti.UI.createView({
		
		
		top:30,
		left:20,
		right:20,
		layout:'vertical',
		height:'auto',
		backgroundColor:'white',
		borderRadius:10,
		//visible:false
		
});


function GetCategories(title,destination){
	
	var cat = Ti.UI.createWindow({
		
		title:title,
		navBarHidden:true,
		layout:'vertical',
		fullscreen:false
		
	});
	
	var bg = Ti.UI.createView({
		backgroundColor:backgroundColor,
		//backgroundImage:backgroundApplication,
		//backgroundRepeat:true,
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
	

	

	
	var lbl =  Ti.UI.createLabel({
		text:'NUEVA PANTALLA  DE ' + title
	});

	
	MakeContent(destination)
	
	bg.add(content);
	cat.add(titleBar);
	cat.add(bg);
	return cat;
	
};

var tv  = Ti.UI.createTableView({
		//data:data,
		//height:400,
		top:10,
		left:5,
		right:5,
		bottom:10,
		backgroundColor:'white'
		
		
});

function MakeContent(destination){
	
	
	indicatorView.show();
	//content.add(tv);
	//alert('ANTES DE LLAMAR API');
	jsonCategoriesRows(destination);
	alert('LINEA LUEGO DE LLAMAR API');
	
}


function getCategoryArticles(destination){
	

	var requestData = require('ui/handheld/jsonCategories');
	
	tv.data = requestData(destination); 
	
	return tv;
	
}


function jsonCategoriesRows(controlname){
	
	indicatorView.show();
	var jresult = [];
	var size_data;
	//Titanium.App.Properties.setString(controlname,null); 
	content.visible=false;
	

		var loader = Ti.Network.createHTTPClient({
		
		

			
			onload:function(e) {
						
						alert('LEYENDO RESULT API');
						var request = loader.responseText;
						//alert(request);
						try{
						
							var json =    JSON.parse(request);  
							size_data = json.length;
							
							for(var i = 0; i < size_data; i++) {
			
			
			
			
			try{
				
				
									//TI.API.debug(json[i].cat_name);
									
									
									var havechild=false;
										var li = null;
									if(json[i].art_type=='LST' || json[i].art_type=='TXT'){
										havechild=true;
										li = '/images/File_font.png';
									}
									
									
									
									
									var v1 = Ti.UI.createView({
										height:75,
										cid  :json[i].cat_id,
										ctype:json[i].art_type,
										ccontent:json[i].art_content,
										cartid:json[i].art_id,
										//hasChild:havechild,
										backgroundColor:'white',
									});
									var lbl = Ti.UI.createLabel({
									 	
										text:json[i].cat_name
									});
									
							
									
									v1.add(lbl);
									content.add(v1);
								}catch(e00){
									alert("Error on: " + e00);
								}
									
									
									//jresult.push(row);
			
							}
						
							//Titanium.App.Properties.setString(controlname,JSON.stringify(json));
							
							 
						//	alert(jresult.length);
							//child.add(GetSubChild(jresult,rootwin));
							//return jresult;	
					
						//	tv.data = jresult;
		  				//	tv.backgroundColor = 'white';
		  					//var nh =  jresult.length * 100;
		  		//alert(nh);
		  					//tv.height =  nh;
		  					//content.height =   (jresult.length * 55);
		  					//content.visible=true;
							
						//	indicatorView.hide();
							
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
				 
			//loader.setTimeout(15000);   
	
			loader.open("GET","http://coalicionlazo.qipro.org/apps/webservices/ws/wscategory.php?controlname=" + controlname,true);
					loader.setTimeout(99000);	
			loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			loader.send();

		
	
	
	
		  	
}



module.exports = exam;