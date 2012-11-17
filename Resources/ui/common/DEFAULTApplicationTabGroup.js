function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup({
		backgroundColor:'white'
	});
	
	//create app tabs
	var win1 = new Window('home'),
		win2 = new Window('blog'),
		win3 = new Window('about');
	
	var tab1 = Ti.UI.createTab({
		//title: L('home'),
		icon: '/images/home.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		//title: L('blog'),
		//icon: '/images/KS_nav_views.png',
		icon:'images/blog4.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		//title: L('about'),
		icon: '/images/about2.png',
		window: win3
	});
	
	
	win3.containingTab = tab3;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	return self;
};

module.exports = ApplicationTabGroup;
