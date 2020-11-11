'use strict';

export class Modal {

	/**
	 * DESCRIPTION: creates a new modal
	 * PARAMETERS:
	 *   domNode         - the dom node into which the partial modal is to be loaded
	 *   partialEndpoint - url of the partial containing the modal's body
	*/
	
	constructor(domNode, partialEndpoint) {

		// set attributes
		this.domNode        = domNode;
		this.partialEndpoint = partialEndpoint;
		
	}





	/****************************************\
	 #HELPER-FUNCTIONS
	\****************************************/
	
	/**
	 * DESCRIPTION: load a modal as partial into page
	 * PARAMETERS:
	 *   domNode - the dom node into which the partial modal is to be loaded
	 *   url     - url of the partial modal to load
	 */

	async loadPartial(url, domNode) {

		const encodedUrl = encodeURI(url);
		const page = await fetch(encodedUrl);
		const html = await page.text();
		domNode.innerHTML = html;

	}

	/**
	 * DESCRIPTION: hide modal when event fires
	 * PARAMETERS:
	 *   modal - dom node of the modal
	 *   event - the fired event
	 */

	hide(event) {

		// prevent default event from firing
		if(event) event.preventDefault();

		// toggle modal visibility
		if(!this.domNode.classList.contains('opacity-0'))           this.domNode.classList.add('opacity-0');
		if(!this.domNode.classList.contains('pointer-events-none')) this.domNode.classList.add('pointer-events-none');

		// toggle state of overlay in body
		const body = document.getElementsByTagName('body')[0];
		if(body.classList.contains('modal-active')) body.classList.remove('modal-active');

	}

	/**
	 * DESCRIPTION: show modal when event fires
	 * PARAMETERS:
	 *   event - the fired event
	 */

	show(event) {

		// prevent default event from firing
		if(event) event.preventDefault();

		// toggle modal visibility
		if(this.domNode.classList.contains('opacity-0'))           this.domNode.classList.remove('opacity-0');
		if(this.domNode.classList.contains('pointer-events-none')) this.domNode.classList.remove('pointer-events-none');

		// toggle state of overlay in body
		const body = document.getElementsByTagName('body')[0];
		if(!body.classList.contains('modal-active')) body.classList.add('modal-active');

	}
	
	/**
	 * DESCRIPTION: toggle visibility of modal when event fires
	 * PARAMETERS:
	 *   event - the fired event
	 */

	toggleVisibility(event) {

		// prevent default event from firing
		if(event) event.preventDefault();

		// toggle modal visibility
		this.domNode.classList.toggle('opacity-0');
		this.domNode.classList.toggle('pointer-events-none');

		// toggle state of overlay in body
		const body = document.getElementsByTagName('body')[0];
		body.classList.toggle('modal-active');

	}
	
	/**
	 * DESCRIPTION: handle button pressed, s.t. ESC button closes modal
	 * PARAMETERS:
	 *   event - the button pressed event
	 */

	buttonPressedHandler(event) {

		const theEvent = event || window.event;

		// check if escape button was pressed
		let isEscape = false;
		if('key' in event) {
			isEscape = (event.key === 'Escape' || event.key === 'Esc');
		} else {
			isEscape = (event.keyCode === 27);
		}

		// toggle modal visibility if it was visible
		if(isEscape /*&& document.body.classList.contains('modal-active')*/) {
			this.hide(event);
		}

	}
	
	/**
	 * DESCRIPTION: hook events that close the modal
	 * PARAMETERS:
	 *  modal (optional) - the modal to which the close events are to be hooked
	 */

	hookCloseListeners(modal) {
		
		if(!modal) modal = this;

		// click overlay
		const overlays = this.domNode.getElementsByClassName('modal-overlay');
		for(let overlay of overlays) {
			overlay.addEventListener('click', this.hide.bind(modal));
		}

		// close buttons
		const closeButtons = this.domNode.getElementsByClassName('modal-close');
		for(let closeButton of closeButtons) {
			closeButton.addEventListener('click', this.hide.bind(modal));
		}

		// escape key
		document.addEventListener('keydown', this.buttonPressedHandler.bind(this));

	}
	
	/**
	 * DESCRIPTION: load a modal as partial into page and set it to visible
	 */
	
	async load() {
	
		// load partial into dom node
		await this.loadPartial(this.partialEndpoint, this.domNode);

		// hook events to close the modal
		this.hookCloseListeners();

		// make modal visible
		this.show();
	
	}
		
};