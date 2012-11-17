function ApplicationTabGroup(Window) {
	//create module instance
	//Ti.include("/tabbar_module/customTabBar.js"); 
	
	
	
	
	
	var self = Ti.UI.createTabGroup({
		//backgroundColor:Ti.App.Properties.getString('NavigatorBarColor')
	});
	
	var info = Ti.App.Properties.getString('infoTab');
	var blog = Ti.App.Properties.getString('blogTab')
	var cont = Ti.App.Properties.getString('conatactTab')
	

	var win1 = new Window(info),
		win2 = new Window(blog),
		win3 = new Window(cont);
	
		Ti.API.debug( 'title info    screen (applicationWindow.js)'+ info);
		Ti.API.debug( 'title blog    screen (applicationWindow.js)'+ blog);
		Ti.API.debug( 'title contact screen (applicationWindow.js)'+ cont);
	
	
	var tab1 = Ti.UI.createTab({
		title: Ti.App.Properties.getString('infoTab'),
		icon: '/images/house.png',
		//backgroundColor: Ti.App.Properties.getString('NavigatorBarColor'),
		window: win1,
		//custom:true
	});
	

	
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: Ti.App.Properties.getString('blogTab'),
		icon: '/images/speech_bubble.png',
		//backgroundColor: Ti.App.Properties.getString('NavigatorBarColor'),
		window: win2,
		//custom:true
	});
	win2.containingTab = tab2;
	
	
	var tab3 = Ti.UI.createTab({
		title: Ti.App.Properties.getString('contactTab'),
		icon: '/images/lightbulb.png',
		//backgroundColor: Ti.App.Properties.getString('NavigatorBarColor'),
		window: win3,
		//custom:true
	});
	win3.containingTab = tab3;
	
	
	

	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	return self;
};





module.exports = ApplicationTabGroup;
