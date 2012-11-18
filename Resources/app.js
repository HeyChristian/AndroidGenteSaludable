/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	
		
	Ti.App.Properties.setString('infoTab','Info');
	Ti.App.Properties.setString('blogTab','Blog');
	Ti.App.Properties.setString('contactTab','Contactos');
	
	
	
	
	Ti.UI.setBackgroundImage( '/images/cloudPatterns.jpg' );
	
		Ti.App.Properties.setString('appbgcolor','#13B5EA');
	Ti.App.Properties.setString('appbg','/images/cloudPatterns.jpg');
	Ti.App.Properties.setString('HeaderTitlesColor','black');
	Ti.App.Properties.setString('subHeaderTitlesColor','black');
	Ti.App.Properties.setString('NavigatorBarColor','#F8971D');
	Ti.App.Properties.setString('applogo','/images/logo.png');
	Ti.App.Properties.setString('separatorColor','#13B5EA');
	Ti.App.Properties.setString('blogHeader','Black');
	
	// 1
	// 2. #F1CB00	yellow
	// 3. #13B5EA  sky blue
	// 4. #F26649   mayenta
	// 5. #F8971D   orange
	
	
	
	
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	//alert('hello word');
	var Window;
	Window = require('ui/handheld/DEFAULTApplicationWindow');
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup(Window).open();
	
})();

function alert(message) {
        var alertDialog = Ti.UI.createAlertDialog({
            title: 'Alert',
            message: message,
            buttonNames: ['Ok'],
            cancel: 1
        });
 
        alertDialog.show();
    }
