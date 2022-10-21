let anim = () => {
	//to activate: ._unvisible + data-to-animate (=x, if you want to determine threshold)
	let animItems = document.querySelectorAll('[data-to-animate]');
	if (animItems) {
		animItems.forEach(animItem => animCreateObserver(animItem));
	}

	function animCreateObserver(el) {
		let itemThreshold = el.dataset.toAnimate ? parseInt(el.dataset.toAnimate) : 1/2;
		let observer = new IntersectionObserver(animate, {
			threshold: itemThreshold
		});
		observer.observe(el);
	}

	function animate (entries, observer) {
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				entry.target.classList.remove('_unvisible');
				observer.unobserve(entry.target);
			}
		})
	}
};

// let adaptiveTransfer = () => {
// 	let elements = document.querySelectorAll('[data-adtf]');
// 	elements.forEach (element => {
// 		let elPoints = element.getAttribute('data-adtf').split('; ');
// 		let elParent = element.parentElement;
// 		let elIndex = [...elParent.children].indexOf(element);
// 		let elParentID = '.' + elParent.classList.value.replace(' ', '.');
// 		// console.log(elParent.classList, '->', elParentID);
// 		elPoints = [`${elParentID}, ${elIndex}, -1`].concat(elPoints);
// 		// console.log(elPoints);
// 		for (let i = 1; i < elPoints.length; i++) {
// 			let sendTo = (point) => {
// 				let elToParent = document.querySelector(point[0]);
// 				// console.log(`found ${point[0]} in `, elToParent);
// 				let elToIndex = point[1];
// 				if (elToIndex == 'first') elToIndex = 0;
// 				if (elToIndex == 'last') elToIndex = elToParent.children.length;
// 				console.log('transfering ', element, `on ${elToIndex} position in `, elToParent);
// 				elToParent.insertBefore(element, elToParent.children[elToIndex]);
// 			}
// 			let elPoint = elPoints[i].split(', ');
// 			// console.log(elPoint);
// 			let media = window.matchMedia(`(max-width: ${elPoint[2]}px)`);
// 			media.addEventListener('change', (event) => transfer(event));
// 			if(media.matches)
// 				sendTo(elPoint);
// 			function transfer(event) {
// 				if(event.matches) {
// 					// console.log(`Now {${element.classList}} matching a ${elPoint[2]}px media`);
// 					sendTo(elPoint);
// 				} else {
// 					// console.log(`Now ${element} not matching a ${elPoint[2]}px media`);
// 					sendTo(elPoints[i-1].split(', '));
// 				}
// 			}
// 		}
// 	})
// };

// let customToggle = () => {
// 	let triggers = document.querySelectorAll('[data-toggle-trigger]');

// 	let toggling = (trigger) => {
// 		let toggleTrigger = trigger;
// 		toggleTrigger.classList.toggle('_toggleActive');
// 		let toggleArea = toggleTrigger.dataset.toggleTrigger;
// 		let elTarget = document.querySelectorAll(`[data-toggle-target='${toggleArea}']`);
// 		if (elTarget)
// 			elTarget.forEach(toggleTarget => toggleTarget.classList.toggle('_toggleActive'));
// 		if (toggleTrigger.dataset.toggleType == 'burger')
// 			document.querySelector('body').classList.toggle('lock');
// 	}

// 	triggers.forEach(toggleTrigger => {
// 		toggleTrigger.addEventListener('click', event => toggling(toggleTrigger));
// 	});

// 	document.addEventListener('click', event => {
// 		triggers.forEach(trigger => {
// 			let isInToggle = trigger.contains(event.target);
// 			if (!isInToggle) {
// 				let elTarget = document.querySelectorAll(`[data-toggle-target='${trigger.dataset.toggleTrigger}']`);
// 				if (elTarget)
// 					elTarget.forEach(target => {
// 						isInToggle = isInToggle || target.contains(event.target);
// 					})
// 			}
// 			if (!isInToggle && trigger.classList.contains('_toggleActive'))
// 				toggling(trigger);
// 		})
// 	})
// }

let all = () => {
	anim();
	// adaptiveTransfer();
	// customToggle();
}

export default all;